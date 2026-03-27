import { defineType, defineField } from 'sanity'

export const articleType = defineType({
    name: 'article',
    title: 'Article',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),

        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),

        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
        }),

        defineField({
            name: 'cluster',
            title: 'Cluster',
            type: 'string',
        }),

        defineField({
            name: 'searchIntent',
            title: 'Search intent',
            type: 'string',
        }),

        defineField({
            name: 'coverImage',
            title: 'Cover image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt text',
                    type: 'string',
                }),
            ],
        }),

        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    marks: {
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Lien',
                                fields: [
                                    defineField({
                                        name: 'href',
                                        type: 'string',
                                        title: 'URL',
                                    }),
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Alt text',
                            type: 'string',
                        }),
                        defineField({
                            name: 'caption',
                            title: 'Caption',
                            type: 'string',
                        }),
                    ],
                },
            ],
        }),
    ],
})