import { Head, usePage } from '@inertiajs/react'

function toAbsolute(path, appUrl = '') {
  if (!path) {
    return appUrl || ''
  }

  if (/^https?:\/\//i.test(path)) {
    return path
  }

  const origin = (appUrl || '').replace(/\/$/, '')
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`
}

function clip(text, max = 160) {
  const value = String(text || '')
    .replace(/\s+/g, ' ')
    .trim()

  if (value.length <= max) {
    return value
  }

  return `${value.slice(0, max - 1).trimEnd()}…`
}

export default function SeoHead({
  title,
  description,
  image,
  url,
  type = 'website',
  noindex = false,
  jsonLd = null,
}) {
  const { seo } = usePage().props
  const siteName = seo?.siteName || 'Jelajah Enggano'
  const appUrl = seo?.appUrl || ''
  const canonical = url || seo?.url || appUrl
  const desc = clip(description || seo?.defaultDescription || '')
  const ogImage = toAbsolute(image || seo?.defaultImage, appUrl)
  const fullTitle = !title
    ? siteName
    : title.includes(siteName)
      ? title
      : `${title} | ${siteName}`

  const graphs = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : jsonLd ? [jsonLd] : []

  return (
    <Head title={fullTitle}>
      <meta name="description" content={desc} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      <link rel="canonical" href={canonical} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={seo?.locale || 'id_ID'} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
      {graphs.map((graph, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(graph)}
        </script>
      ))}
    </Head>
  )
}
