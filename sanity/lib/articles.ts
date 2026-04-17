import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

type SanityImage = {
    asset?: {
        _ref?: string
        _type?: string
    }
    alt?: string
}

type SanityCategory = {
    title: string
    slug: string
}

type SanityArticle = {
    _id: string
    title: string
    slug: string
    subtitle?: string
    description?: string
    date?: string
    cluster?: string
    searchIntent?: string
    coverImage?: SanityImage
    content?: any[]
    category?: SanityCategory
}

function mapArticle(article: SanityArticle | null) {
    if (!article) return null

    return {
        _id: article._id,
        slug: article.slug,
        frontmatter: {
            title: article.title,
            subtitle: article.subtitle ?? '',
            description: article.description ?? '',
            date: article.date ?? '',
            niche: article.category?.title ?? '',
            category: article.category ?? null,
            coverImageUrl: article.coverImage ? urlFor(article.coverImage).url() : '',
            tags: [],
            readingTime: undefined,
            updatedAt: article.date ?? '',
        },
        content: article.content ?? [],
    }
}

export async function getAllArticleSlugs(): Promise<string[]> {
    const slugs = await client.fetch<string[]>(
        `
    *[_type == "article" && defined(slug.current)][]{
      "slug": slug.current
    }[].slug
    `
    )

    return slugs ?? []
}

export async function getArticleBySlug(slug: string) {
    const article = await client.fetch<SanityArticle | null>(
        `
    *[_type == "article" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      subtitle,
      description,
      date,
      cluster,
      searchIntent,
      coverImage,
      content,
      category->{
        title,
        "slug": slug.current
      }
    }
    `,
        { slug }
    )

    return mapArticle(article)
}

export async function getAllArticles() {
    const articles = await client.fetch<SanityArticle[]>(
        `
    *[_type == "article"] | order(date desc){
      _id,
      title,
      "slug": slug.current,
      subtitle,
      description,
      date,
      coverImage,
      category->{
        title,
        "slug": slug.current
      }
    }
    `
    )

    return (articles ?? []).map((article) => mapArticle(article))
}