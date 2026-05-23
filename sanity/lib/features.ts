import { client } from "./client";

const featuresSectionFields = `
    _id,
    title,
    "slug": slug.current,
    description,

    ctaLabel,
    ctaHref,

    heroMedia {
        type,
        youtubeUrl,
        videoFile {
            asset-> {
                url,
                mimeType,
                originalFilename
            }
        },
        imageFile {
            asset-> {
                url
            },
            alt
        }
    },

    advantages[] {
        title,
        description,
        linkLabel,
        linkHref,
        image {
            asset-> {
                url
            },
            alt
        }
    },

    seoContent {
        title,
        paragraphs,
        items[] {
            title
        }
    },

    faq {
        title,
        description,
        items[] {
            question,
            answer
        }
    }
`;

export async function getFeaturesSection(slug?: string) {
    if (slug) {
        return client.fetch(
            `
            *[_type == "featuresSection" && slug.current == $slug][0] {
                ${featuresSectionFields}
            }
            `,
            { slug }
        );
    }

    return client.fetch(`
        *[_type == "featuresSection"][0] {
            ${featuresSectionFields}
        }
    `);
}

export async function getAllFeaturesSlugs() {
    return client.fetch(`
        *[_type == "featuresSection" && defined(slug.current)] {
            "slug": slug.current
        }
    `);
}

export async function getAllFeaturesSections() {
    return client.fetch(`
        *[_type == "featuresSection" && defined(slug.current)] | order(_createdAt asc) {
            _id,
            title,
            "slug": slug.current,
            description,

            heroMedia {
                type,
                imageFile {
                    asset-> {
                        url
                    },
                    alt
                },
                videoFile {
                    asset-> {
                        url
                    }
                }
            }
        }
    `);
}