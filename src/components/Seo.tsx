import React from "react"

const BASE_URL = "https://bvdesteenstraat.nl"

function toAbsoluteUrl(path?: string | null): string {
  if (!path) return `${BASE_URL}/logo.jpg`
  if (path.startsWith("http")) return path
  return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`
}

type SeoProps = {
  title: string
  description?: string
  url?: string
  image?: string
  /** For news articles: { headline, datePublished, author } */
  article?: { headline: string; datePublished: string; author?: string }
}

export function Seo({ title, description, url, image, article }: SeoProps) {
  React.useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const setMeta = (name: string, content?: string | null) => {
      if (!content) return
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement("meta")
        el.setAttribute("name", name)
        document.head.appendChild(el)
      }
      el.setAttribute("content", content)
    }

    const setOg = (prop: string, content?: string | null) => {
      if (!content) return
      let el = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement("meta")
        el.setAttribute("property", prop)
        document.head.appendChild(el)
      }
      el.setAttribute("content", content)
    }

    setMeta("description", description ?? "Buurtvereniging de Steenstraat - Samen bouwen we aan een sterke, gezellige buurt waar iedereen zich thuis voelt.")
    setOg("og:title", title)
    setOg("og:description", description ?? "Buurtvereniging de Steenstraat - Samen bouwen we aan een sterke, gezellige buurt waar iedereen zich thuis voelt.")
    setOg("og:type", "website")
    if (url) setOg("og:url", url)
    const ogImage = toAbsoluteUrl(image)
    setOg("og:image", ogImage)
    setOg("og:image:alt", title)
    setOg("og:locale", "nl_NL")

    // Twitter card
    setMeta("twitter:card", "summary_large_image")
    setMeta("twitter:title", title)
    if (description) setMeta("twitter:description", description)
    setMeta("twitter:image", ogImage)

    // Site-wide meta
    setMeta("keywords", "Buurtvereniging de Steenstraat, Buurtvereniging, De Steenstraat, Eersel, buurtvereniging de steenstraat")
    setOg("og:site_name", "Buurtvereniging De Steenstraat")

    // Canonical link
    let canonicalEl: HTMLLinkElement | null = null
    try {
      const href = url ?? window.location.href
      canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
      if (!canonicalEl) {
        canonicalEl = document.createElement("link")
        canonicalEl.setAttribute("rel", "canonical")
        document.head.appendChild(canonicalEl)
      }
      canonicalEl.setAttribute("href", href)
    } catch (e) {
      // ignore in non-browser environments
    }

    const siteUrl = url ?? (typeof window !== "undefined" ? window.location.origin : BASE_URL)
    const graph: object[] = [
      {
        "@type": "Organization",
        "name": "Buurtvereniging De Steenstraat",
        "url": BASE_URL,
        "logo": `${BASE_URL}/logo.jpg`,
        "contactPoint": [{
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "buurtverenigingdesteenstraat@outlook.com",
          "availableLanguage": ["Dutch"]
        }],
        "sameAs": ["https://www.facebook.com/groups/396194063895407"]
      },
      {
        "@type": "WebSite",
        "url": BASE_URL,
        "name": "Buurtvereniging De Steenstraat",
        "publisher": { "@type": "Organization", "name": "Buurtvereniging De Steenstraat" }
      }
    ]
    if (article) {
      graph.push({
        "@type": "NewsArticle",
        "headline": article.headline,
        "datePublished": article.datePublished,
        "author": { "@type": "Organization", "name": article.author ?? "Buurtvereniging De Steenstraat" },
        "publisher": { "@type": "Organization", "name": "Buurtvereniging De Steenstraat", "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.jpg` } },
        "mainEntityOfPage": { "@type": "WebPage", "@id": siteUrl },
        "image": ogImage
      })
    }
    const ld = { "@context": "https://schema.org", "@graph": graph }

    const scriptId = "seo-jsonld"
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null
    if (!scriptEl) {
      scriptEl = document.createElement("script")
      scriptEl.type = "application/ld+json"
      scriptEl.id = scriptId
      document.head.appendChild(scriptEl)
    }
    scriptEl.text = JSON.stringify(ld)

    return () => {
      document.title = prevTitle
      // cleanup: remove created canonical and script if we added them
      if (canonicalEl && canonicalEl.parentNode) canonicalEl.parentNode.removeChild(canonicalEl)
      const existing = document.getElementById("seo-jsonld")
      if (existing && existing.parentNode) existing.parentNode.removeChild(existing)
    }
  }, [title, description, url, image, article])

  return null
}
