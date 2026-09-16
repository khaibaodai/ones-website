/* ============================================================
   ONES — Prerender cho SEO/GEO
   Chạy:  node tools/prerender.mjs   (từ thư mục gốc website)

   Việc script làm:
   1. Sinh trang tĩnh cho TỪNG dự án -> /du-an/<id>.html
   2. Bơm danh sách dự án tĩnh (bot đọc được, không cần JavaScript)
      vào index.html (dự án nổi bật) và du-an.html (toàn bộ)
   3. Chèn JSON-LD schema (doanh nghiệp, website, danh sách dự án, sản phẩm)
   4. Sinh lại sitemap.xml

   Chạy lại bao nhiêu lần cũng an toàn (idempotent).
   ============================================================ */

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://onescorp.vn";

/* ---------- 1. Nạp data.js + components.js ---------- */
const dataSrc = fs.readFileSync(path.join(ROOT, "assets/js/data.js"), "utf8");
const compSrc = fs.readFileSync(path.join(ROOT, "assets/js/components.js"), "utf8");
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(dataSrc + "\n" + compSrc, sandbox);
const W = sandbox.window;
const { SITE, PROJECTS } = W;
const renderProjectCard = W.renderProjectCard;
const resolveImg = W.resolveImg;

/* ---------- Phiên bản script lấy từ index.html (tự đồng bộ) ---------- */
const indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const ver = (re, fb) => (indexHtml.match(re) || [, fb])[1];
const V = {
  data: ver(/data\.js\?v=(\d+)/, "1"),
  comp: ver(/components\.js\?v=(\d+)/, "1"),
  main: ver(/main\.js\?v=(\d+)/, "1"),
  css: ver(/styles\.css\?v=(\d+)/, "1"),
};

/* ---------- Tiện ích ---------- */
const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const stripTags = (s) => String(s == null ? "" : s).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const absUrl = (u) => {
  u = String(u || "");
  if (/^(data:|https?:|\/\/)/.test(u)) return u;
  return SITE_URL + "/" + u.replace(/^\//, "");
};
const rootPath = (u) => { u = String(u || ""); return /^(data:|https?:|\/\/|\/)/.test(u) ? u : "/" + u; };
const absolutize = (html) =>
  html
    .replace(/href="(?!https?:|\/|#|tel:|mailto:)/g, 'href="/')
    .replace(/src="(?!https?:|\/|data:)/g, 'src="/');
const today = new Date().toISOString().slice(0, 10);
const ldTag = (id, obj) => `<script type="application/ld+json" id="${id}">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

function upsertLd(html, id, tag) {
  const re = new RegExp(`<script type="application/ld\\+json" id="${id}">[\\s\\S]*?</script>\\n?`);
  if (re.test(html)) return html.replace(re, tag + "\n");
  return html.replace("</head>", tag + "\n</head>");
}
function inject(html, key, anchorOpen, content) {
  const start = `<!--pr:${key}-->`, end = `<!--/pr:${key}-->`;
  const block = start + content + end;
  if (html.includes(start)) {
    const re = new RegExp(`<!--pr:${key}-->[\\s\\S]*?<!--/pr:${key}-->`);
    return html.replace(re, block);
  }
  if (!html.includes(anchorOpen)) {
    console.warn(`  ! Không tìm thấy anchor cho "${key}" — bỏ qua`);
    return html;
  }
  return html.replace(anchorOpen, anchorOpen.replace(/<\/div>$/, "") + block + "</div>");
}

const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": SITE_URL + "/#organization",
  name: "OneS Corporation",
  alternateName: "OneS",
  legalName: SITE.legalName,
  taxID: SITE.taxId,
  foundingDate: "2024",
  slogan: SITE.tagline,
  description: "Công ty công nghệ trong lĩnh vực bất động sản cao cấp tại TP.HCM — cung cấp nguồn sản phẩm từ các chủ đầu tư uy tín (Vinhomes, Masterise Homes, Đất Xanh Group, Keppel Land, Gamuda Land, Lotte…) và nền tảng hỗ trợ bán hàng cho đối tác, cộng tác viên với chính sách doanh thu chia sẻ 70–86%.",
  url: SITE_URL + "/",
  logo: SITE_URL + "/assets/img/logo.png",
  image: SITE_URL + "/assets/img/og-image.jpg",
  telephone: "+84" + SITE.hotlineRaw.replace(/^0/, ""),
  email: SITE.email,
  address: { "@type": "PostalAddress", streetAddress: "Tầng 3, số 74 - 76, Đường N3C, Khu đô thị Sài Gòn Bình An (Soho – The Global City), Khu phố 14", addressLocality: "Phường Bình Trưng", addressRegion: "TP. Hồ Chí Minh", addressCountry: "VN" },
  areaServed: ["TP. Hồ Chí Minh", "Bình Dương", "Đồng Nai", "Long An", "Khánh Hòa"],
  sameAs: [SITE.facebook, SITE.youtube, SITE.tiktok, SITE.zalo].filter(Boolean),
  priceRange: "$$$",
};
const WEBSITE_LD = { "@context": "https://schema.org", "@type": "WebSite", "@id": SITE_URL + "/#website", url: SITE_URL + "/", name: "OneS Corporation", inLanguage: "vi-VN", publisher: { "@id": SITE_URL + "/#organization" } };

/* ---------- Khung trang con ---------- */
function pageShell({ title, desc, canonical, ogImage, ldTags, bodyMain }) {
  return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="icon" href="/assets/img/icon.png">
<link rel="apple-touch-icon" href="/assets/img/icon.png">
<link rel="stylesheet" href="/assets/css/styles.css?v=${V.css}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#214E7F">
<meta property="og:type" content="website">
<meta property="og:site_name" content="OneS Corporation">
<meta property="og:locale" content="vi_VN">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${ogImage}">
${ldTags.join("\n")}
</head>
<body>
<div id="header-root"></div>
<main>
${bodyMain}
</main>
<div id="footer-root"></div>
<script src="/assets/js/data.js?v=${V.data}"></script>
<script src="/assets/js/components.js?v=${V.comp}"></script>
<script src="/assets/js/main.js?v=${V.main}"></script>
</body>
</html>
`;
}

const breadcrumbNav = (items) =>
  `<nav class="breadcrumb" aria-label="breadcrumb">` +
  items.map((it, i) => (it.href ? `<a href="${it.href}">${esc(it.label)}</a>` : `<span>${esc(it.label)}</span>`) + (i < items.length - 1 ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px;opacity:.6"><polyline points="9 18 15 12 9 6"/></svg>' : "")).join("") +
  `</nav>`;
const breadcrumbLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: stripTags(it.label), ...(it.href ? { item: SITE_URL + it.href } : {}) })),
});
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
const ctaBand = (msg) => `
<section class="section section--paper" style="padding-block:clamp(40px,6vw,72px)">
  <div class="container">
    <div class="cta-band"><div class="inner">
      <div><span class="eyebrow gold">Dành cho đối tác &amp; cộng tác viên</span><h2 class="mt-1">${msg}</h2>
      <p>OneS gửi giỏ hàng, bảng giá và chính sách bán hàng theo từng đợt mở bán của chủ đầu tư.</p></div>
      <div class="flex" style="flex-direction:column;gap:.8rem">
        <a class="btn btn--light btn--lg" href="/lien-he.html">Đăng ký nhận giỏ hàng ${ARROW}</a>
        <a class="btn btn--gold btn--lg" href="tel:${SITE.hotlineRaw}">Gọi ${SITE.hotline}</a>
      </div>
    </div></div>
  </div>
</section>`;

/* ---------- 2. Trang tĩnh từng DỰ ÁN ---------- */
fs.mkdirSync(path.join(ROOT, "du-an"), { recursive: true });
let projectPages = 0;
for (const p of PROJECTS) {
  const url = `/du-an/${p.id}.html`;
  const canonical = SITE_URL + url;
  const cover = absUrl(resolveImg(p.cover, 1400));
  const crumbs = [{ label: "Trang chủ", href: "/index.html" }, { label: "Dự án", href: "/du-an.html" }, { label: p.name }];
  let related = PROJECTS.filter((x) => x.id !== p.id && x.area === p.area);
  if (related.length < 3) related = PROJECTS.filter((x) => x.id !== p.id);
  related.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  related = related.slice(0, 3);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: stripTags(p.short),
    image: (p.gallery || [p.cover]).map((g) => absUrl(resolveImg(g, 1200))),
    brand: { "@type": "Organization", name: p.developer },
    category: `${p.type} ${p.segment} · ${p.location}`,
    url: canonical,
    ...(p.priceValue
      ? { offers: { "@type": "AggregateOffer", priceCurrency: "VND", lowPrice: Math.round(p.priceValue * 1e9), availability: "https://schema.org/InStock", seller: { "@id": SITE_URL + "/#organization" } } }
      : {}),
  };

  const cells = [["Mức giá", p.priceText], ["Loại hình", p.type], ["Chủ đầu tư", p.developer]];
  if (p.scale) cells.push(["Quy mô", p.scale]);
  if (p.size && p.size !== p.scale) cells.push(["Diện tích", p.size]);
  if (p.beds) cells.push(["Sản phẩm", p.beds]);
  if (p.units) cells.push(["Số lượng", p.units]);
  cells.push(["Bàn giao", p.handover || "Đang cập nhật"]);
  const specs = cells.slice(0, 8);
  const gallery = (p.gallery || []).slice(1, 5);
  const statusHtml = W.statusPill ? W.statusPill(p) : `<span class="pill">${esc(p.status)}</span>`;

  const bodyMain = `
<article class="section section--ivory" style="padding-top:calc(var(--header-h) + clamp(24px,4vw,48px))">
  <div class="container">
    ${breadcrumbNav(crumbs)}
    <div class="flex wrap" style="gap:.5rem;margin-bottom:1rem">${statusHtml}${p.badge ? ` <span class="pill pill--gold">${esc(p.badge)}</span>` : ""}</div>
    <h1 style="font-size:clamp(2rem,4.5vw,3.2rem);line-height:1.1">${esc(p.name)}</h1>
    <div class="pcard__loc" style="margin-top:.8rem;font-size:.95rem"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span>${esc(p.location)}</span></div>
    <p class="lead mt-2" style="max-width:64ch">${esc(p.short)}</p>
    <figure class="mt-3" style="border-radius:14px;overflow:hidden;box-shadow:var(--shadow)"><img src="${esc(rootPath(resolveImg(p.cover, 1600)))}" alt="${esc(p.name)}" style="width:100%"></figure>

    <div class="grid mt-4" style="grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-radius:10px;overflow:hidden">
      ${specs.map(([l, v]) => `<div style="background:var(--paper);padding:1rem 1.15rem"><div style="font-size:.72rem;color:var(--muted)">${esc(l)}</div><div style="font-family:var(--head);font-weight:700;margin-top:2px">${esc(v)}</div></div>`).join("")}
    </div>

    <div class="mt-3 flex wrap" style="gap:.7rem;align-items:center">
      ${p.card ? `<a class="doc-btn" href="${esc(rootPath(p.card))}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Tải thẻ sản phẩm OneS</a>` : ""}
      <a class="btn" href="/lien-he.html">Nhận giỏ hàng &amp; chính sách ${ARROW}</a>
    </div>

    <div class="mt-4" style="max-width:78ch;font-size:1.02rem;line-height:1.85">
      ${(p.description || []).map((d) => `<p style="margin-bottom:1rem">${esc(d)}</p>`).join("")}
    </div>

    ${(p.amenities || []).length ? `<h2 class="mt-4" style="font-size:1.3rem">Tiện ích nổi bật</h2>
    <ul class="mt-2" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.6rem 1.4rem;list-style:none">
      ${p.amenities.map((a) => `<li style="display:flex;gap:.55rem;align-items:center"><span class="gem gem--sm"></span>${esc(a)}</li>`).join("")}
    </ul>` : ""}

    ${(p.zones || []).length ? `<h2 class="mt-4" style="font-size:1.3rem">Các phân khu ${esc(p.name)}</h2>
    <div class="mt-2" style="display:grid;gap:.7rem">
      ${p.zones.map((z) => `<div style="border:1px solid var(--line-soft);border-radius:10px;padding:.85rem 1rem;background:var(--white)">
        <div><strong style="font-family:var(--head)">${esc(z.name)}</strong>${z.status ? ` <span class="pill" style="margin-left:.4rem">${esc(z.status)}</span>` : ""}</div>
        ${z.type || z.note ? `<div style="margin-top:.3rem;color:var(--ink-soft);font-size:.92rem">${esc(z.type || "")}${z.note ? `${z.type ? " — " : ""}${esc(z.note)}` : ""}</div>` : ""}
      </div>`).join("")}
    </div>` : ""}

    ${gallery.length ? `<div class="grid cols-3 mt-4">${gallery.map((g) => `<img src="${esc(rootPath(resolveImg(g, 900)))}" alt="${esc(p.name)}" loading="lazy" style="border-radius:10px;aspect-ratio:4/3;object-fit:cover;width:100%">`).join("")}</div>` : ""}
  </div>
</article>
${ctaBand(`Quan tâm ${esc(p.name)}? Nhận giỏ hàng &amp; chính sách hôm nay`)}
<section class="section section--tight section--paper">
  <div class="container">
    <div class="facet-rule" style="margin-bottom:clamp(20px,3vw,32px)">Dự án liên quan trong giỏ hàng OneS</div>
    <div class="card-grid">${absolutize(related.map(renderProjectCard).join(""))}</div>
  </div>
</section>`;

  const html = pageShell({
    title: `${p.name} — ${p.location} | ${p.priceText} | OneS`,
    desc: stripTags(p.short) + ` ${p.type}${p.segment ? " " + p.segment.toLowerCase() : ""}${p.scale ? ", quy mô " + p.scale : ""}${p.units ? ", " + p.units : ""}. Chủ đầu tư ${p.developer}. Giỏ hàng & chính sách cho đối tác: OneS 0903 983 737.`,
    canonical,
    ogImage: cover,
    ldTags: [ldTag("pl-ld-org", ORG_LD), ldTag("pl-ld-product", productLd), ldTag("pl-ld-breadcrumb", breadcrumbLd(crumbs))],
    bodyMain,
  });
  fs.writeFileSync(path.join(ROOT, "du-an", `${p.id}.html`), html);
  projectPages++;
}

/* ---------- 3. Bơm nội dung tĩnh vào các trang danh sách ---------- */
function patchFile(rel, fn) {
  const f = path.join(ROOT, rel);
  if (!fs.existsSync(f)) { console.warn(`  ! Không có ${rel}`); return; }
  let html = fs.readFileSync(f, "utf8");
  html = fn(html);
  fs.writeFileSync(f, html);
  console.log(`  ✓ ${rel}`);
}

console.log("Bơm nội dung tĩnh:");
patchFile("index.html", (h) => {
  let feat = PROJECTS.filter((p) => p.featured).slice(0, 6);
  if (feat.length < 3) feat = PROJECTS.slice(0, 6);
  h = upsertLd(h, "pl-ld-org", ldTag("pl-ld-org", ORG_LD));
  h = upsertLd(h, "pl-ld-website", ldTag("pl-ld-website", WEBSITE_LD));
  h = inject(h, "featured", '<div class="card-grid" id="featuredProjects"></div>', absolutize(feat.map(renderProjectCard).join("")));
  return h;
});
patchFile("du-an.html", (h) => {
  h = upsertLd(h, "pl-ld-org", ldTag("pl-ld-org", ORG_LD));
  const listLd = { "@context": "https://schema.org", "@type": "ItemList", name: "Dự án bất động sản OneS đang phân phối", itemListElement: PROJECTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${SITE_URL}/du-an/${p.id}.html` })) };
  h = upsertLd(h, "pl-ld-projects", ldTag("pl-ld-projects", listLd));
  h = inject(h, "projects", '<div class="card-grid" id="projectGrid"></div>', absolutize(PROJECTS.map(renderProjectCard).join("")));
  return h;
});
for (const page of ["gioi-thieu.html", "doi-tac.html", "lien-he.html", "du-an-chi-tiet.html"]) {
  patchFile(page, (h) => upsertLd(h, "pl-ld-org", ldTag("pl-ld-org", ORG_LD)));
}

/* ---------- 4. sitemap.xml ---------- */
const urls = [
  { loc: "/", pri: "1.0" },
  { loc: "/du-an.html", pri: "0.9" },
  { loc: "/doi-tac.html", pri: "0.9" },
  { loc: "/gioi-thieu.html", pri: "0.8" },
  { loc: "/lien-he.html", pri: "0.8" },
  ...PROJECTS.map((p) => ({ loc: `/du-an/${p.id}.html`, pri: "0.8" })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}${u.loc}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${u.pri}</priority></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap);

console.log(`\nHoàn tất:
  • ${projectPages} trang dự án -> /du-an/
  • index.html + du-an.html đã có nội dung tĩnh + schema
  • sitemap.xml: ${urls.length} URL`);
