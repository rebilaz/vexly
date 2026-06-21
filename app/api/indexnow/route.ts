import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vexly.fr"
).replace(/\/$/, "");

const INDEXNOW_ENDPOINT =
  "https://api.indexnow.org/indexnow";

const INDEXNOW_MAX_URLS = 10_000;

function decodeXml(value: string): string {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function extractLocations(xml: string): string[] {
  return Array.from(
    xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi),
    (match) => decodeXml(match[1].trim()),
  );
}

async function readSitemap(
  sitemapUrl: string,
  visited = new Set<string>(),
  depth = 0,
): Promise<string[]> {
  if (depth > 10) {
    throw new Error(
      "Profondeur maximale des sitemaps dépassée.",
    );
  }

  if (visited.has(sitemapUrl)) {
    return [];
  }

  visited.add(sitemapUrl);

  const response = await fetch(sitemapUrl, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Impossible de lire ${sitemapUrl} : HTTP ${response.status}`,
    );
  }

  const xml = await response.text();
  const locations = extractLocations(xml);

  // Le sitemap principal référence plusieurs autres sitemaps.
  if (/<sitemapindex[\s>]/i.test(xml)) {
    const nestedSitemaps = await Promise.all(
      locations.map((location) =>
        readSitemap(
          new URL(location, sitemapUrl).toString(),
          visited,
          depth + 1,
        ),
      ),
    );

    return nestedSitemaps.flat();
  }

  return locations.map((location) =>
    new URL(location, sitemapUrl).toString(),
  );
}

function createChunks<T>(
  values: T[],
  chunkSize: number,
): T[][] {
  const chunks: T[][] = [];

  for (
    let index = 0;
    index < values.length;
    index += chunkSize
  ) {
    chunks.push(values.slice(index, index + chunkSize));
  }

  return chunks;
}

export async function POST(request: Request) {
  const expectedSecret =
    process.env.INDEXNOW_WEBHOOK_SECRET;

  const indexNowKey =
    process.env.INDEXNOW_KEY;

  if (!expectedSecret || !indexNowKey) {
    return NextResponse.json(
      {
        success: false,
        error:
          "INDEXNOW_WEBHOOK_SECRET ou INDEXNOW_KEY est manquante.",
      },
      { status: 500 },
    );
  }

  const authorization =
    request.headers.get("authorization");

  if (authorization !== `Bearer ${expectedSecret}`) {
    return NextResponse.json(
      {
        success: false,
        error: "Non autorisé.",
      },
      { status: 401 },
    );
  }

  try {
    const site = new URL(SITE_URL);
    const sitemapUrl = `${SITE_URL}/sitemap.xml`;

    const sitemapUrls =
      await readSitemap(sitemapUrl);

    const urls = [
      ...new Set(
        sitemapUrls.filter((url) => {
          try {
            return new URL(url).host === site.host;
          } catch {
            return false;
          }
        }),
      ),
    ];

    if (urls.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Aucune URL valide trouvée dans le sitemap.",
        },
        { status: 422 },
      );
    }

    const batches = createChunks(
      urls,
      INDEXNOW_MAX_URLS,
    );

    const results: Array<{
      batch: number;
      count: number;
      status: number;
    }> = [];

    for (
      let index = 0;
      index < batches.length;
      index += 1
    ) {
      const batch = batches[index];

      const response = await fetch(
        INDEXNOW_ENDPOINT,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            host: site.host,
            key: indexNowKey,
            keyLocation:
              `${SITE_URL}/${indexNowKey}.txt`,
            urlList: batch,
          }),
          cache: "no-store",
        },
      );

      const responseText =
        await response.text();

      if (
        response.status !== 200 &&
        response.status !== 202
      ) {
        throw new Error(
          `IndexNow a répondu HTTP ${response.status}: ${
            responseText || "réponse vide"
          }`,
        );
      }

      results.push({
        batch: index + 1,
        count: batch.length,
        status: response.status,
      });
    }

    return NextResponse.json({
      success: true,
      sitemap: sitemapUrl,
      count: urls.length,
      batches: results,
      submittedUrls: urls,
    });
  } catch (error) {
    console.error(
      "[IndexNow submit sitemap]",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erreur inconnue.",
      },
      { status: 502 },
    );
  }
}