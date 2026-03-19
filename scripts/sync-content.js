/**
 * Syncs all markdown content to JSON.
 * Edit .md files; run npm run sync (or build) to update JSON.
 *
 * - home.md → home.json
 * - membership.md → membership.json
 * - contact.md → contact.json
 * - calendar.md → calendar.json
 * - news/*.md → news/index.json (frontmatter per file)
 */
import { readFile, writeFile, readdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const contentDir = path.join(repoRoot, 'public', 'content')

async function syncMarkdownToJson(mdName, jsonName) {
  const mdPath = path.join(contentDir, mdName)
  const jsonPath = path.join(contentDir, jsonName)
  if (!existsSync(mdPath)) return
  const text = await readFile(mdPath, 'utf8')
  const { data } = matter(text)
  if (!data || typeof data !== 'object') {
    throw new Error(`No valid frontmatter in ${mdName}`)
  }
  await writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf8')
  console.log(`  ${mdName} → ${jsonName}`)
}

async function syncCalendar() {
  const mdPath = path.join(contentDir, 'calendar.md')
  const jsonPath = path.join(contentDir, 'calendar.json')
  if (!existsSync(mdPath)) return
  const text = await readFile(mdPath, 'utf8')
  const { data } = matter(text)
  if (!data || typeof data !== 'object') {
    throw new Error('No valid frontmatter in calendar.md')
  }
  await writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf8')
  console.log(`  calendar.md → calendar.json (${data.events?.length ?? 0} events)`)
}

async function syncNews() {
  const newsDir = path.join(contentDir, 'news')
  const jsonPath = path.join(newsDir, 'index.json')
  if (!existsSync(newsDir)) return
  const files = await readdir(newsDir)
  const mdFiles = files.filter(f => f.endsWith('.md'))
  const items = []
  for (const file of mdFiles.sort()) {
    const slug = file.replace(/\.md$/, '')
    const mdPath = path.join(newsDir, file)
    const text = await readFile(mdPath, 'utf8')
    const { data } = matter(text)
    if (data && typeof data === 'object' && data.title) {
      items.push({
        slug,
        title: data.title,
        date: data.date || '',
        author: data.author || 'Buurtvereniging',
        image: data.image,
        excerpt: data.excerpt,
      })
    }
  }
  await writeFile(jsonPath, JSON.stringify(items, null, 2), 'utf8')
  console.log(`  news/*.md → news/index.json (${items.length} items)`)
}

async function main() {
  try {
    console.log('Syncing content...')
    await syncMarkdownToJson('home.md', 'home.json')
    await syncMarkdownToJson('membership.md', 'membership.json')
    await syncMarkdownToJson('contact.md', 'contact.json')
    await syncCalendar()
    await syncNews()
    console.log('Done.')
  } catch (err) {
    console.error('Sync failed:', err)
    process.exit(1)
  }
}

main()
