const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vexly.fr"
).replace(/\/$/, "");

export type IndexNowResult = {
  status: number;
  urls: string[];
};

export async function submitToIndexNow(
  values: string[],
): Promise<IndexNowResult> {
  const key = process.env.INDEXNOW_KEY;

  if (!key) {
    throw new Error("La variable INDEXNOW_KEY est manquante.");
  }

  const site = new URL(SITE_URL);

  const urls = [
    ...new Set(
      values
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim())
        .filter(Boolean)
        .map((value) => new URL(value, site.origin).toString()),
    ),
  ];

  if (urls.length === 0) {
    throw new Error("Aucune URL à soumettre.");
  }

  if (urls.length > 10_000) {
    throw new Error(
      "IndexNow accepte au maximum 10 000 URL par requête.",
    );
  }

  for (const url of urls) {
    const parsedUrl = new URL(url);

    if (parsedUrl.host !== site.host) {
      throw new Error(
        `L'URL ${url} n'appartient pas au domaine ${site.host}.`,
      );
    }
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host: site.host,
      key,
      urlList: urls,
    }),
    cache: "no-store",
  });

  const responseBody = await response.text();

  if (response.status !== 200 && response.status !== 202) {
    throw new Error(
      `Erreur IndexNow ${response.status}: ${responseBody || "réponse vide"}`,
    );
  }

  return {
    status: response.status,
    urls,
  };
}