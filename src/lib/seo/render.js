export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Static <head> tags for crawlers that do not run JavaScript. */
export function renderHeadTags(model) {
  const alternateLocales = model.alternateLocales
    .map((locale) => `    <meta property="og:locale:alternate" content="${escapeHtml(locale)}" />`)
    .join('\n');
  const alternates = model.alternates
    .map(
      (alt) =>
        `    <link rel="alternate" hreflang="${escapeHtml(alt.hreflang)}" href="${escapeHtml(alt.href)}" />`
    )
    .join('\n');
  const json = JSON.stringify(model.jsonLd).replace(/</g, '\\u003c');

  return `    <title>${escapeHtml(model.title)}</title>
    <meta name="description" content="${escapeHtml(model.description)}" />
    <meta name="keywords" content="${escapeHtml(model.keywords)}" />
    <meta name="author" content="iBuildo" />
    <meta name="application-name" content="iBuildo" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <link rel="canonical" href="${escapeHtml(model.canonical)}" />
${alternates}
    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="iBuildo" />
    <meta property="og:title" content="${escapeHtml(model.title)}" />
    <meta property="og:description" content="${escapeHtml(model.description)}" />
    <meta property="og:url" content="${escapeHtml(model.canonical)}" />
    <meta property="og:locale" content="${escapeHtml(model.locale)}" />
${alternateLocales}
    <meta property="og:image" content="${escapeHtml(model.image)}" />
    <meta property="og:image:alt" content="${escapeHtml(model.imageAlt)}" />
    <meta property="og:image:type" content="${escapeHtml(model.imageType)}" />
    <meta property="og:image:width" content="${model.imageWidth}" />
    <meta property="og:image:height" content="${model.imageHeight}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(model.title)}" />
    <meta name="twitter:description" content="${escapeHtml(model.description)}" />
    <meta name="twitter:image" content="${escapeHtml(model.image)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(model.imageAlt)}" />
    <script id="seo-jsonld" type="application/ld+json">${json}</script>`;
}

/** Real copy for browsers and crawlers that do not execute the app. */
export function renderNoscript(model) {
  const { noscript: copy } = model;
  const services = copy.services
    .map(
      (service) =>
        `        <li><h3>${escapeHtml(service.title)}</h3><p>${escapeHtml(service.description)}</p></li>`
    )
    .join('\n');
  const members = copy.members
    .map(
      (member) =>
        `        <li><h3>${escapeHtml(member.name)}</h3><p>${escapeHtml(member.role)}</p><p>${escapeHtml(member.description)}</p></li>`
    )
    .join('\n');
  const steps = copy.steps
    .map(
      (step) =>
        `        <li><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.description)}</p></li>`
    )
    .join('\n');

  return `    <noscript>
      <main lang="${escapeHtml(model.htmlLang)}" dir="${escapeHtml(model.dir)}">
        <h1>${escapeHtml(copy.heroTitle)}</h1>
        <p>${escapeHtml(copy.heroSubtitle)}</p>
        <section id="about">
          <h2>${escapeHtml(copy.aboutTitle)}</h2>
          <p>${escapeHtml(copy.aboutText)}</p>
        </section>
        <section id="services">
          <h2>${escapeHtml(copy.servicesTitle)}</h2>
          <p>${escapeHtml(copy.servicesLead)}</p>
          <ul>
${services}
          </ul>
        </section>
        <section id="team">
          <h2>${escapeHtml(copy.teamTitle)}</h2>
          <p>${escapeHtml(copy.teamLead)}</p>
          <ul>
${members}
          </ul>
        </section>
        <section id="process">
          <h2>${escapeHtml(copy.processTitle)}</h2>
          <p>${escapeHtml(copy.processLead)}</p>
          <ol>
${steps}
          </ol>
        </section>
        <section id="contact">
          <h2>${escapeHtml(copy.contactTitle)}</h2>
          <p>${escapeHtml(copy.contactLead)}</p>
          <p>${escapeHtml(copy.response)}</p>
          <p>${escapeHtml(copy.addressLabel)}: ${escapeHtml(copy.address)}</p>
          <p><a href="${escapeHtml(copy.phoneHref)}">${escapeHtml(copy.phoneLabel)}: ${escapeHtml(copy.phone)}</a></p>
          <p><a href="${escapeHtml(copy.whatsappHref)}">${escapeHtml(copy.whatsappLabel)}</a></p>
        </section>
      </main>
    </noscript>`;
}
