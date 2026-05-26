import { defineType, defineField } from "sanity";

export const featuresSectionType = defineType({
  name: "featuresSection",
  title: "Section Features",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "hubs",
      title: "Hubs associés",
      type: "array",
      description: "Sélectionne les pages hub où ce contenu doit apparaître",
      of: [
        {
          type: "reference",
          to: [{ type: "hubPage" }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "ctaLabel",
      title: "Texte du CTA",
      type: "string",
      description: "Exemple : En savoir plus",
    }),

    defineField({
      name: "ctaHref",
      title: "Lien du CTA",
      type: "string",
      description: "Exemple : /expertises/creation-saas",
    }),

    defineField({
      name: "heroMedia",
      title: "Média du Hero",
      type: "object",
      fields: [
        defineField({
          name: "type",
          title: "Type de média",
          type: "string",
          options: {
            layout: "radio",
            list: [
              { title: "Lien YouTube", value: "youtube" },
              { title: "Vidéo fichier", value: "video" },
              { title: "Image fichier", value: "image" },
            ],
          },
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "youtubeUrl",
          title: "Lien YouTube",
          type: "url",
          hidden: ({ parent }) => parent?.type !== "youtube",
          validation: (Rule) =>
            Rule.uri({
              scheme: ["http", "https"],
            }),
        }),

        defineField({
          name: "videoFile",
          title: "Fichier vidéo",
          type: "file",
          options: {
            accept: "video/*",
          },
          hidden: ({ parent }) => parent?.type !== "video",
        }),

        defineField({
          name: "imageFile",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
          hidden: ({ parent }) => parent?.type !== "image",
          fields: [
            defineField({
              name: "alt",
              title: "Texte alternatif",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (Rule) =>
        Rule.custom((media) => {
          if (!media?.type) return "Choisis un type de média";

          if (media.type === "youtube" && !media.youtubeUrl) {
            return "Ajoute un lien YouTube";
          }

          if (media.type === "video" && !media.videoFile) {
            return "Ajoute un fichier vidéo";
          }

          if (media.type === "image" && !media.imageFile) {
            return "Ajoute une image";
          }

          return true;
        }),
    }),

    defineField({
      name: "advantages",
      title: "Avantages",
      type: "array",
      description: "Ajoute autant d’avantages que tu veux",
      of: [
        {
          type: "object",
          title: "Avantage",
          fields: [
            defineField({
              name: "title",
              title: "Titre",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),

            defineField({
              name: "linkLabel",
              title: "Texte du lien",
              type: "string",
              description: "Exemple : En savoir plus",
            }),

            defineField({
              name: "linkHref",
              title: "Lien",
              type: "string",
              description:
                "Exemple : /fonctionnalites/suivi-vehicules ou https://www.noxal.fr",
            }),

            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: "alt",
                  title: "Texte alternatif",
                  type: "string",
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              media: "image",
            },
          },
        },
      ],
    }),

    defineField({
      name: "seoContent",
      title: "Contenu SEO",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Titre SEO",
          type: "string",
        }),

        defineField({
          name: "paragraphs",
          title: "Paragraphes SEO",
          type: "array",
          of: [{ type: "text" }],
        }),

        defineField({
          name: "items",
          title: "Cartes SEO",
          type: "array",
          of: [
            {
              type: "object",
              title: "Carte SEO",
              fields: [
                defineField({
                  name: "title",
                  title: "Titre",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "title",
                },
              },
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "faq",
      title: "FAQ",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Titre de la FAQ",
          type: "string",
        }),

        defineField({
          name: "description",
          title: "Description de la FAQ",
          type: "text",
        }),

        defineField({
          name: "items",
          title: "Questions / Réponses",
          type: "array",
          of: [
            {
              type: "object",
              title: "Question",
              fields: [
                defineField({
                  name: "question",
                  title: "Question",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),

                defineField({
                  name: "answer",
                  title: "Réponse",
                  type: "text",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "question",
                  subtitle: "answer",
                },
              },
            },
          ],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});