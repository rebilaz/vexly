import { defineField, defineType } from "sanity";

const slugify = (input: string) =>
  input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);

export const realisationType = defineType({
  name: "realisation",
  title: "Realisation",
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
        slugify,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isPublished",
      title: "Publie",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Mettre en avant",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Ordre",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
    }),
    defineField({
      name: "eyebrow",
      title: "Petit titre",
      type: "string",
    }),
    defineField({
      name: "summary",
      title: "Resume court",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description longue",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "client",
      title: "Client / contexte",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Annee",
      type: "number",
      validation: (Rule) => Rule.min(2020).max(2100),
    }),
    defineField({
      name: "duration",
      title: "Duree",
      type: "string",
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "visual",
      title: "Visuel generatif",
      type: "string",
      initialValue: "membership",
      options: {
        layout: "dropdown",
        list: [
          { title: "Abonnement", value: "membership" },
          { title: "Analytics", value: "analytics" },
          { title: "IA", value: "ai" },
          { title: "Communaute", value: "community" },
          { title: "Checkout", value: "checkout" },
          { title: "Automatisation", value: "automation" },
        ],
      },
    }),
    defineField({
      name: "theme",
      title: "Theme de carte",
      type: "string",
      initialValue: "indigo",
      options: {
        layout: "dropdown",
        list: [
          { title: "Indigo", value: "indigo" },
          { title: "Ambre", value: "amber" },
          { title: "Violet", value: "violet" },
          { title: "Cyan", value: "cyan" },
          { title: "Lime", value: "lime" },
          { title: "Rose", value: "rose" },
        ],
      },
    }),
    defineField({
      name: "coverImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "metrics",
      title: "Resultats chiffres",
      type: "array",
      of: [
        {
          type: "object",
          title: "Resultat",
          fields: [
            defineField({
              name: "value",
              title: "Valeur",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Libelle",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "value",
              subtitle: "label",
            },
          },
        },
      ],
    }),
    defineField({
      name: "challenge",
      title: "Challenge",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "results",
      title: "Resultats",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "content",
      title: "Contenu detaille",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Lien",
                fields: [
                  defineField({
                    name: "href",
                    type: "string",
                    title: "URL",
                  }),
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texte alternatif",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Legende",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texte alternatif",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Legende",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "ctaLabel",
      title: "Texte CTA",
      type: "string",
      initialValue: "Creer un projet similaire",
    }),
    defineField({
      name: "projectUrl",
      title: "Lien externe du projet",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Meta title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Meta description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "canonical",
          title: "URL canonique",
          type: "url",
        }),
        defineField({
          name: "ogImage",
          title: "Image Open Graph",
          type: "image",
        }),
        defineField({
          name: "noIndex",
          title: "No index",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
