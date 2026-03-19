
import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Config
const repoRoot = path.resolve(__dirname, '..')
const newsFile = path.join(repoRoot, 'public', 'content', 'news', 'index.json')
const outDir = path.join(repoRoot, 'public')
const outFile = path.join(outDir, 'sitemap.xml')
const baseUrl = process.env.SITE_URL || 'https://bvdesteenstraat.nl'

function parseNews(text) {
  try {
    const data = JSON.parse(text)
    return Array.isArray(data) ? data.map(item => ({ slug: item.slug })) : []
  } catch {
    return []
  }
}

function buildSitemap(newsItems) {
  const urls = [
    { path: '/', priority: '1.0' },
    { path: '/word-lid', priority: '0.9' },
    { path: '/news', priority: '0.8' },
    { path: '/calendar', priority: '0.8' },
    { path: '/gallery', priority: '0.7' },
    { path: '/contact', priority: '0.8' }
  ]

  const now = new Date().toISOString()

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  urls.forEach(({ path, priority }) => {
    xml += '  <url>\n'
    xml += `    <loc>${baseUrl}${path}</loc>\n`
    xml += `    <lastmod>${now}</lastmod>\n`
    xml += `    <changefreq>monthly</changefreq>\n`
    xml += `    <priority>${priority}</priority>\n`
    xml += '  </url>\n'
  })

  // Add news items
  newsItems.forEach(item => {
    xml += '  <url>\n'
    xml += `    <loc>${baseUrl}/news/${item.slug}</loc>\n`
    xml += `    <lastmod>${now}</lastmod>\n`
    xml += '    <changefreq>weekly</changefreq>\n'
    xml += '    <priority>0.7</priority>\n'
    xml += '  </url>\n'
  })

  xml += '</urlset>\n'
  return xml
}

async function main() {
  try {
    if (!existsSync(outDir)) await mkdir(outDir, { recursive: true })
    let news = []
    if (existsSync(newsFile)) {
      const txt = await readFile(newsFile, 'utf8')
      news = parseNews(txt)
    }
    const sitemap = buildSitemap(news)
    await writeFile(outFile, sitemap, 'utf8')
    console.log(`Wrote sitemap with ${news.length} news entries to ${outFile}`)
  } catch (err) {
    console.error('Failed to generate sitemap:', err)
    process.exitCode = 1
  }
}

main()
