import 'dotenv/config'
import fs from 'node:fs'
import fg from 'fast-glob'
import matter from 'gray-matter'
import { createClient } from '@sanity/client'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import { toString } from 'mdast-util-to-string'

type PortableTextSpan = {
    _type: 'span'
    _key: string
    text: string
    marks: string[]
}

type PortableTextBlock = {
    _type: 'block'
    _key: string
    style: string
    children: PortableTextSpan[]
    markDefs: Array<{
        _key: string
        _type: 'link'
        href: string
    }>
    listItem?: 'bullet' | 'number'
    level?: number
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2025-01-01',
    token: process.env.SANITY_API_WRITE_TOKEN!,
    useCdn: false,
})

function key(prefix = 'k') {
    return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

function extractSpans(
    node: any,
    activeMarks: string[] = [],
    markDefs: PortableTextBlock['markDefs'] = []
): PortableTextSpan[] {
    if (!node) return []

    if (node.type === 'text') {
        return [
            {
                _type: 'span',
                _key: key('span'),
                text: node.value || '',
                marks: activeMarks,
            },
        ]
    }

    if (node.type === 'strong') {
        return (node.children || []).flatMap((child: any) =>
            extractSpans(child, [...activeMarks, 'strong'], markDefs)
        )
    }

    if (node.type === 'emphasis') {
        return (node.children || []).flatMap((child: any) =>
            extractSpans(child, [...activeMarks, 'em'], markDefs)
        )
    }

    if (node.type === 'delete') {
        return (node.children || []).flatMap((child: any) =>
            extractSpans(child, [...activeMarks, 'strike-through'], markDefs)
        )
    }

    if (node.type === 'inlineCode') {
        return [
            {
                _type: 'span',
                _key: key('span'),
                text: node.value || '',
                marks: [...activeMarks, 'code'],
            },
        ]
    }

    if (node.type === 'break') {
        return [
            {
                _type: 'span',
                _key: key('span'),
                text: '\n',
                marks: activeMarks,
            },
        ]
    }

    if (node.type === 'link') {
        const markKey = key('link')
        markDefs.push({
            _key: markKey,
            _type: 'link',
            href: node.url,
        })

        return (node.children || []).flatMap((child: any) =>
            extractSpans(child, [...activeMarks, markKey], markDefs)
        )
    }

    if (node.type === 'image') {
        return []
    }

    return (node.children || []).flatMap((child: any) =>
        extractSpans(child, activeMarks, markDefs)
    )
}

function createBlock(
    style: string,
    childrenNodes: any[],
    extra?: Partial<PortableTextBlock>
): PortableTextBlock | null {
    const markDefs: PortableTextBlock['markDefs'] = []
    const spans = childrenNodes.flatMap((node) => extractSpans(node, [], markDefs))

    const cleaned = spans.filter((span) => span.text.length > 0)
    if (!cleaned.length) return null

    return {
        _type: 'block',
        _key: key('block'),
        style,
        children: cleaned,
        markDefs,
        ...extra,
    }
}

function markdownToPortableText(markdown: string): PortableTextBlock[] {
    const tree: any = unified().use(remarkParse).use(remarkGfm).parse(markdown)
    const blocks: PortableTextBlock[] = []

    for (const node of tree.children || []) {
        if (node.type === 'heading') {
            const style = `h${Math.min(node.depth || 1, 6)}`
            const block = createBlock(style, node.children || [])
            if (block) blocks.push(block)
            continue
        }

        if (node.type === 'paragraph') {
            const block = createBlock('normal', node.children || [])
            if (block) blocks.push(block)
            continue
        }

        if (node.type === 'blockquote') {
            for (const child of node.children || []) {
                if (child.type === 'paragraph') {
                    const block = createBlock('blockquote', child.children || [])
                    if (block) blocks.push(block)
                }
            }
            continue
        }

        if (node.type === 'list') {
            const listItem = node.ordered ? 'number' : 'bullet'

            for (const item of node.children || []) {
                const firstParagraph =
                    (item.children || []).find((child: any) => child.type === 'paragraph') || null

                if (!firstParagraph) continue

                const block = createBlock('normal', firstParagraph.children || [], {
                    listItem,
                    level: 1,
                })

                if (block) blocks.push(block)
            }

            continue
        }

        if (node.type === 'thematicBreak') {
            continue
        }

        if (node.type === 'code') {
            const block: PortableTextBlock = {
                _type: 'block',
                _key: key('block'),
                style: 'normal',
                markDefs: [],
                children: [
                    {
                        _type: 'span',
                        _key: key('span'),
                        text: node.value || '',
                        marks: ['code'],
                    },
                ],
            }
            blocks.push(block)
            continue
        }

        if (node.type === 'image') {
            continue
        }

        if (node.type === 'html') {
            continue
        }

        const fallbackText = toString(node).trim()
        if (fallbackText) {
            blocks.push({
                _type: 'block',
                _key: key('block'),
                style: 'normal',
                markDefs: [],
                children: [
                    {
                        _type: 'span',
                        _key: key('span'),
                        text: fallbackText,
                        marks: [],
                    },
                ],
            })
        }
    }

    return blocks
}

function toOptionalString(value: unknown) {
    if (value == null) return ''
    return String(value)
}

async function run() {
    const files = await fg(['content/articles/**/*.md', 'content/articles/**/*.mdx'])

    if (!files.length) {
        console.log('Aucun fichier trouvé dans content/articles')
        return
    }

    for (const file of files) {
        const raw = fs.readFileSync(file, 'utf8')
        const { data, content } = matter(raw)

        if (!data.title || !data.slug) {
            console.warn(`Ignoré: ${file} (title ou slug manquant)`)
            continue
        }

        const portableText = markdownToPortableText(content)

        const doc = {
            _id: `article-${data.slug}`,
            _type: 'article',
            title: toOptionalString(data.title),
            slug: {
                _type: 'slug',
                current: toOptionalString(data.slug),
            },
            subtitle: toOptionalString(data.subtitle),
            description: toOptionalString(data.description),
            date: data.date || undefined,
            cluster: toOptionalString(data.cluster),
            niche: toOptionalString(data.niche),
            pillar: typeof data.pillar === 'boolean' ? data.pillar : false,
            mainKeyword: toOptionalString(data.main_keyword ?? data.mainKeyword),
            searchIntent: toOptionalString(data.search_intent ?? data.searchIntent),
            priority:
                typeof data.priority === 'number'
                    ? data.priority
                    : Number(data.priority || 0),
            readingTime: toOptionalString(data.readingTime),
            canonicalUrl: toOptionalString(data.canonical_url ?? data.canonicalUrl),
            tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
            content: portableText,
        }

        await client.createOrReplace(doc)
        console.log(`Importé: ${doc.title}`)
    }

    console.log('Import terminé.')
}

run().catch((error) => {
    console.error('Erreur import Sanity:', error)
    process.exit(1)
})