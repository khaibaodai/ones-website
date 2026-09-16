/* ============================================================
   ONES — Tương tác (interactions & page modules)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Reveal on scroll ---------- */
  var revealObserver = null;
  function initReveal() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
      return;
    }
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    scanReveal();
  }
  function scanReveal() {
    if (!revealObserver) return;
    document.querySelectorAll(".reveal:not([data-seen])").forEach(function (el) {
      el.setAttribute("data-seen", "1"); revealObserver.observe(el);
    });
  }
  if (typeof window !== "undefined") window.__plScanReveal = scanReveal;

  /* ---------- Header scroll + auto-hide ---------- */
  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    if (!header) return;
    var last = window.scrollY;
    var onScroll = function () {
      var y = window.scrollY;
      header.classList.toggle("scrolled", y > 24);
      header.classList.toggle("header--hidden", y > 120 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Image fade on load ---------- */
  function initImageFade() {
    var sel = ".hero-visual img, .pcard__media img, .icard__media img, .ifeature__media img, .gallery img, .article img, .media-shot img";
    document.querySelectorAll(sel).forEach(function (img) {
      img.classList.add("img-fade");
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add("loaded");
      } else {
        img.addEventListener("load", function () { img.classList.add("loaded"); });
      }
    });
  }

  /* ---------- Hero parallax ---------- */
  function initParallax() {
    if (window.innerWidth < 920) return;
    var img = document.querySelector(".hero-visual .frame img");
    if (!img) return;
    img.style.height = "110%";
    img.style.marginTop = "-5%";
    img.classList.add("parallax-img");
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var pct = Math.min(window.scrollY / window.innerHeight, 1);
          img.style.transform = "translateY(" + (pct * 8) + "%)";
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    var burger = document.getElementById("burger");
    var nav = document.getElementById("mobileNav");
    if (!burger || !nav) return;
    var toggle = function (open) {
      burger.classList.toggle("open", open);
      nav.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("no-scroll", open);
    };
    burger.addEventListener("click", function () { toggle(!nav.classList.contains("open")); });
    nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { toggle(false); }); });
  }

  /* ---------- Favorites ---------- */
  function getFavs() { try { return JSON.parse(localStorage.getItem("pl_favs") || "[]"); } catch (e) { return []; } }
  function initFavorites() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-fav]");
      if (!btn) return;
      e.preventDefault();
      btn.classList.toggle("on");
    });
  }

  /* ---------- Count up ---------- */
  function initCounters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseFloat(el.getAttribute("data-count")), dec = (target % 1 !== 0) ? 1 : 0;
        var start = null, dur = 1400;
        function step(ts) {
          if (!start) start = ts;
          var pr = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - pr, 3);
          el.textContent = (target * eased).toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          if (pr < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ================================================================
     TRACKING & LEAD PIPELINE
     - UTM first-touch lưu localStorage (biết lead đến từ quảng cáo nào)
     - GA4 / Google Ads / Meta Pixel nạp khi có ID trong SITE.tracking
     - Lead gửi tới SITE.leadEndpoint (Google Apps Script -> Sheet + email)
       và/hoặc SITE.formEndpoint (Formspree); có honeypot + chặn gửi quá nhanh
     ================================================================ */

  var PAGE_LOADED_AT = Date.now();

  function captureUtm() {
    try {
      var qs = new URLSearchParams(location.search);
      var keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];
      var found = {};
      var has = false;
      keys.forEach(function (k) { var v = qs.get(k); if (v) { found[k] = v; has = true; } });
      if (has && !localStorage.getItem("pl_utm")) {
        found.landing = location.pathname;
        found.ts = new Date().toISOString();
        localStorage.setItem("pl_utm", JSON.stringify(found));
      }
    } catch (e) {}
  }
  function getUtm() {
    try { return JSON.parse(localStorage.getItem("pl_utm") || "null") || {}; } catch (e) { return {}; }
  }

  var TR = (SITE.tracking || {});
  function initTracking() {
    /* Google Analytics 4 + Google Ads (chung gtag.js) */
    var gid = TR.ga4 || TR.adsId;
    if (gid) {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(gid);
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { dataLayer.push(arguments); };
      gtag("js", new Date());
      if (TR.ga4) gtag("config", TR.ga4);
      if (TR.adsId) gtag("config", TR.adsId);
    }
    /* Meta Pixel */
    if (TR.metaPixel) {
      !(function (f, b, e, v, n, t) {
        if (f.fbq) return;
        n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!f._fbq) f._fbq = n;
        n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
        t = b.createElement(e); t.async = true; t.src = v;
        b.getElementsByTagName(e)[0].parentNode.insertBefore(t, b.getElementsByTagName(e)[0]);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      fbq("init", TR.metaPixel);
      fbq("track", "PageView");
    }
  }

  function track(evt, params) {
    try { if (window.gtag) gtag("event", evt, params || {}); } catch (e) {}
    try { if (window.fbq) fbq("trackCustom", evt, params || {}); } catch (e) {}
  }

  function trackLead(params) {
    try {
      if (window.gtag) {
        gtag("event", "generate_lead", params || {});
        if (TR.adsId && TR.adsLabel) gtag("event", "conversion", { send_to: TR.adsId + "/" + TR.adsLabel });
      }
    } catch (e) {}
    try { if (window.fbq) fbq("track", "Lead", params || {}); } catch (e) {}
  }

  function initClickTracking() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a[href]") : null;
      if (!a) return;
      var href = a.getAttribute("href") || "";
      if (href.indexOf("tel:") === 0) track("tel_click", { page: location.pathname });
      else if (href.indexOf("zalo.me") !== -1) track("zalo_click", { page: location.pathname });
    }, true);
  }

  /* Gửi lead về mọi kênh đã cấu hình. Trả Promise<boolean>. */
  function submitLead(payload) {
    payload = payload || {};
    payload.page = payload.page || location.pathname;
    payload.utm = getUtm();
    payload.sentAt = new Date().toISOString();
    var jobs = [];
    var lep = SITE.leadEndpoint || "";
    if (lep && /^https:\/\//.test(lep)) {
      jobs.push(fetch(lep, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, /* tránh preflight với Apps Script */
        body: JSON.stringify(payload)
      }).then(function (r) { return r.ok; }).catch(function () { return false; }));
    }
    var fep = SITE.formEndpoint || "";
    if (fep && fep.indexOf("your-form-id") === -1) {
      var fd = new FormData();
      Object.keys(payload).forEach(function (k) {
        fd.append(k, typeof payload[k] === "object" ? JSON.stringify(payload[k]) : payload[k]);
      });
      jobs.push(fetch(fep, { method: "POST", body: fd, headers: { Accept: "application/json" } })
        .then(function (r) { return r.ok; }).catch(function () { return false; }));
    }
    trackLead({ source: payload.source || "form" });
    if (!jobs.length) {
      /* Chưa cấu hình Formspree / Apps Script: mở email soạn sẵn gửi về hộp thư OneS */
      try {
        var lines = [];
        Object.keys(payload).forEach(function (k) {
          if (["utm", "sentAt", "source", "page", "ua"].indexOf(k) !== -1) return;
          var v = payload[k]; if (v == null || v === "") return;
          lines.push(k + ": " + (typeof v === "object" ? JSON.stringify(v) : v));
        });
        lines.push("Trang: " + location.href);
        var subject = "[onescorp.vn] " + (payload.loai || payload.interest || "Yêu cầu từ website") + (payload.name ? " — " + payload.name : "");
        window.location.href = "mailto:" + SITE.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
      } catch (e) {}
      return Promise.resolve("mailto");
    }
    return Promise.all(jobs).then(function (rs) {
      return rs.some(function (x) { return x; });
    });
  }
  if (typeof window !== "undefined") window.__plSubmitLead = submitLead;

  function initForms() {
    document.querySelectorAll("form[data-pace-form]").forEach(function (form) {
      /* Honeypot chống bot: field ẩn, bot điền -> loại */
      if (!form.querySelector("[name=website]")) {
        var hp = document.createElement("input");
        hp.type = "text"; hp.name = "website"; hp.tabIndex = -1; hp.autocomplete = "off";
        hp.setAttribute("aria-hidden", "true");
        hp.style.cssText = "position:absolute;left:-5000px;opacity:0;height:0;width:0;pointer-events:none";
        form.appendChild(hp);
      }
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var hpv = form.querySelector("[name=website]");
        if ((hpv && hpv.value) || Date.now() - PAGE_LOADED_AT < 3000) return; /* bot */
        var btn = form.querySelector("[type=submit]");
        var ok = form.querySelector(".form-success");
        var done = function (res) {
          if (ok) {
            /* Chưa nối kênh nhận lead: nói thật là đã mở email soạn sẵn, kèm số hotline */
            if (res === "mailto") {
              ok.innerHTML = 'Website đã mở sẵn email gửi tới <strong>' + SITE.email + '</strong> — bạn bấm Gửi trong ứng dụng email giúp OneS nhé. ' +
                'Nếu máy không mở được email, vui lòng gọi <strong>' + SITE.hotline + '</strong> hoặc nhắn <a href="' + SITE.zalo + '" target="_blank" rel="noopener">Zalo OA OneS</a>.';
            }
            ok.classList.add("show"); ok.scrollIntoView({ behavior: "smooth", block: "center" });
          }
          if (res !== "mailto") form.reset();
          if (btn) { btn.disabled = false; btn.innerHTML = btn.getAttribute("data-label") || "Gửi"; }
        };
        if (btn) { btn.setAttribute("data-label", btn.innerHTML); btn.disabled = true; btn.textContent = "Đang gửi…"; }
        var payload = { source: "form" };
        new FormData(form).forEach(function (v, k) { if (k !== "website" && v) payload[k] = v; });
        submitLead(payload).then(done);
      });
    });
  }

  /* ---------- Lightbox ---------- */
  var lb = { items: [], idx: 0, el: null };
  function initLightbox() {
    var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
    if (!triggers.length) return;
    lb.items = triggers.map(function (t) { return t.getAttribute("href") || t.getAttribute("data-src"); });
    var el = document.createElement("div");
    el.className = "lightbox";
    el.innerHTML =
      '<button class="lb-close" aria-label="Đóng">' + ICONS.x + "</button>" +
      '<button class="lb-nav lb-prev" aria-label="Trước">' + ICONS.chevronLeft + "</button>" +
      '<img src="data:," alt="">' +
      '<button class="lb-nav lb-next" aria-label="Sau">' + ICONS.chevronRight + "</button>";
    document.body.appendChild(el);
    lb.el = el;
    var img = el.querySelector("img");
    var show = function (i) { lb.idx = (i + lb.items.length) % lb.items.length; img.src = lb.items[lb.idx]; };
    triggers.forEach(function (t, i) {
      t.addEventListener("click", function (e) { e.preventDefault(); show(i); el.classList.add("open"); document.body.classList.add("no-scroll"); });
    });
    var close = function () { el.classList.remove("open"); document.body.classList.remove("no-scroll"); };
    el.querySelector(".lb-close").addEventListener("click", close);
    el.querySelector(".lb-prev").addEventListener("click", function () { show(lb.idx - 1); });
    el.querySelector(".lb-next").addEventListener("click", function () { show(lb.idx + 1); });
    el.addEventListener("click", function (e) { if (e.target === el) close(); });
    document.addEventListener("keydown", function (e) {
      if (!el.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(lb.idx + 1);
      if (e.key === "ArrowLeft") show(lb.idx - 1);
    });
  }

  /* ---------- Helpers ---------- */
  function qs(name) { return new URLSearchParams(location.search).get(name); }
  function fill(id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; }

  /* ---------- HOME: featured projects + latest posts + search ---------- */
  function renderFeatured() {
    var grid = document.getElementById("featuredProjects");
    if (!grid) return;
    var feat = PROJECTS.filter(function (p) { return p.featured; }).slice(0, 6);
    if (feat.length < 3) feat = PROJECTS.slice(0, 6);
    grid.innerHTML = feat.map(renderProjectCard).join("");
  }
  function initHomeSearch() {
    var form = document.getElementById("homeSearch");
    if (!form) return;
    populateSelect(form.querySelector("[name=area]"), FILTERS.area);
    populateSelect(form.querySelector("[name=type]"), FILTERS.type);
    populateSelect(form.querySelector("[name=price]"), FILTERS.price);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var p = new URLSearchParams();
      ["area", "type", "price"].forEach(function (k) {
        var v = form.querySelector("[name=" + k + "]").value;
        if (v && v.indexOf("Tất cả") === -1 && v.indexOf("Mọi") === -1) p.set(k, v);
      });
      location.href = "du-an.html" + (p.toString() ? "?" + p.toString() : "");
    });
  }
  function populateSelect(sel, arr, val) {
    if (!sel) return;
    sel.innerHTML = arr.map(function (o) { return '<option' + (o === val ? " selected" : "") + ">" + o + "</option>"; }).join("");
  }

  /* ---------- PROJECT LISTING ---------- */
  function priceBucket(v) {
    if (!v) return "Liên hệ báo giá";
    if (v < 5) return "Dưới 5 tỉ";
    if (v < 10) return "5 – 10 tỉ";
    return "Trên 10 tỉ";
  }
  function initProjectListing() {
    var root = document.getElementById("projectListing");
    if (!root) return;
    var grid = document.getElementById("projectGrid");
    var fArea = root.querySelector("[name=area]"), fSeg = root.querySelector("[name=segment]"),
        fType = root.querySelector("[name=type]"), fPrice = root.querySelector("[name=price]"),
        fSearch = root.querySelector("[name=q]"), countEl = document.getElementById("resultCount"),
        resetBtn = document.getElementById("resetFilters");
    populateSelect(fArea, FILTERS.area, qs("area") || undefined);
    populateSelect(fSeg, FILTERS.segment, qs("segment") || undefined);
    populateSelect(fType, FILTERS.type, qs("type") || undefined);
    populateSelect(fPrice, FILTERS.price, qs("price") || undefined);
    if (qs("q") && fSearch) fSearch.value = qs("q");

    function apply() {
      var a = fArea.value, s = fSeg.value, t = fType.value, pr = fPrice.value,
          q = (fSearch.value || "").trim().toLowerCase();
      var list = PROJECTS.filter(function (p) {
        if (a.indexOf("Tất cả") === -1 && p.area !== a) return false;
        if (s.indexOf("Mọi") === -1 && p.segment !== s) return false;
        if (t.indexOf("Mọi") === -1 && p.type !== t) return false;
        if (pr.indexOf("Mọi") === -1 && priceBucket(p.priceValue) !== pr) return false;
        if (q && (p.name + " " + p.location + " " + p.developer).toLowerCase().indexOf(q) === -1) return false;
        return true;
      });
      grid.innerHTML = list.length ? list.map(renderProjectCard).join("")
        : '<div class="empty"><div class="gem"></div><h3>Không tìm thấy dự án phù hợp</h3><p>Hãy thử nới lỏng bộ lọc hoặc liên hệ OneS để nhận giỏ hàng đầy đủ.</p></div>';
      if (countEl) countEl.innerHTML = "<em>" + list.length + "</em> dự án phù hợp";
      scanReveal();
    }
    [fArea, fSeg, fType, fPrice].forEach(function (el) { el && el.addEventListener("change", apply); });
    if (fSearch) fSearch.addEventListener("input", apply);
    if (resetBtn) resetBtn.addEventListener("click", function () {
      [fArea, fSeg, fType, fPrice].forEach(function (el) { if (el) el.selectedIndex = 0; });
      if (fSearch) fSearch.value = ""; apply();
    });
    apply();
  }

  /* ---------- PROJECT DETAIL ---------- */
  function initProjectDetail() {
    var root = document.getElementById("projectDetail");
    if (!root) return;
    var p = PROJECTS.filter(function (x) { return x.id === qs("id"); })[0] || PROJECTS[0];
    document.title = p.name + " — OneS";

    var g = p.gallery && p.gallery.length ? p.gallery : [p.cover];
    var R = window.resolveImg || ph;
    var galleryHtml =
      '<a class="main" href="' + R(g[0], 1600) + '" data-lightbox>' + unsplashImg(g[0], 1200, p.name) + "</a>" +
      '<a href="' + R(g[1] || g[0], 1600) + '" data-lightbox>' + unsplashImg(g[1] || g[0], 700, p.name) + "</a>" +
      '<a href="' + R(g[2] || g[0], 1600) + '" data-lightbox>' + unsplashImg(g[2] || g[0], 700, p.name) +
        (g.length > 3 ? '<span class="more">+' + (g.length - 2) + " ảnh</span>" : "") + "</a>";
    for (var i = 3; i < g.length; i++) {
      galleryHtml += '<a href="' + R(g[i], 1600) + '" data-lightbox hidden></a>';
    }
    fill("pdGallery", galleryHtml);

    fill("pdBreadcrumb", p.name);
    fill("pdTitle", p.name);
    fill("pdLoc", ICONS.pin + " " + p.location);
    fill("pdTags", statusPillEl(p) + (p.badge ? '<span class="pill pill--gold">' + p.badge + "</span>" : ""));
    fill("pdShort", p.short);
    fill("pdDesc", (p.description || []).map(function (t) { return "<p>" + t + "</p>"; }).join(""));
    var cells = [["Mức giá", p.priceText], ["Loại hình", p.type], ["Chủ đầu tư", p.developer]];
    if (p.scale) cells.push(["Quy mô", p.scale]);
    if (p.size && p.size !== p.scale) cells.push(["Diện tích", p.size]);
    if (p.beds) cells.push(["Sản phẩm", p.beds]);
    if (p.units) cells.push(["Số lượng", p.units]);
    cells.push(["Bàn giao", p.handover || "Đang cập nhật"]);
    fill("pdSpecs", cells.slice(0, 8).map(function (c) { return specCell(c[0], c[1]); }).join(""));
    var amWrap = document.getElementById("pdAmenitiesWrap");
    if (amWrap) amWrap.hidden = !(p.amenities && p.amenities.length);
    fill("pdAmenities", (p.amenities || []).map(function (a) { return "<li>" + ICONS.check + "<span>" + a + "</span></li>"; }).join(""));
    var cardBtn = document.getElementById("pdCardBtn");
    if (cardBtn) { if (p.card) { cardBtn.href = "/" + p.card.replace(/^\//, ""); cardBtn.hidden = false; } else cardBtn.hidden = true; }
    var zw = document.getElementById("pdZonesWrap");
    if (zw && p.zones && p.zones.length) {
      zw.hidden = false;
      fill("pdZones", p.zones.map(function (z) {
        var head = '<strong style="font-family:var(--head)">' + z.name + "</strong>" +
          (z.status ? ' <span class="pill" style="margin-left:.4rem">' + z.status + "</span>" : "");
        var body = (z.type ? z.type : "") + (z.note ? (z.type ? " — " : "") + z.note : "");
        var link = z.link ? ' <a href="' + z.link + '"' + (z.link.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : "") + ' style="color:var(--red);font-weight:600;white-space:nowrap">Xem chi tiết →</a>' : "";
        return '<div style="border:1px solid var(--line-soft);border-radius:10px;padding:.85rem 1rem;background:var(--white)">' +
          "<div>" + head + "</div>" +
          (body || link ? '<div style="margin-top:.3rem;color:var(--ink-soft);font-size:.92rem">' + body + link + "</div>" : "") +
          "</div>";
      }).join(""));
    }
    fill("pdPrice", p.priceText + "<small>" + p.size + " · " + p.beds + "</small>");
    var pf = document.getElementById("pdProjectField"); if (pf) pf.value = p.name;

    var related = PROJECTS.filter(function (x) { return x.id !== p.id && x.area === p.area; });
    if (related.length < 3) related = PROJECTS.filter(function (x) { return x.id !== p.id; });
    related.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
    fill("pdRelated", related.slice(0, 3).map(renderProjectCard).join(""));
    scanReveal();
  }
  function specCell(k, v) { return '<div class="c"><div class="k">' + k + '</div><div class="val">' + v + "</div></div>"; }
  function statusPillEl(p) { return (window.statusPill ? window.statusPill(p) : '<span class="pill">' + p.status + "</span>"); }

  /* ---------- Float back-to-top ---------- */
  function initFloatTop() {
    var btn = document.getElementById("fcTop");
    if (!btn) return;
    var onScroll = function () { btn.classList.toggle("show", window.scrollY > 600); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* ---------- Apply editable page content (from CMS "Trang" tab) ---------- */
  function applyPageContent() {
    if (typeof PAGES === "undefined") return;
    var map = { "index.html": "home", "gioi-thieu.html": "about", "doi-tac.html": "partner", "lien-he.html": "contact" };
    var file = location.pathname.split("/").pop() || "index.html";
    var pg = map[file]; if (!pg || !PAGES[pg]) return;
    var vals = {}; PAGES[pg].fields.forEach(function (f) { vals[f.k] = f.value; });
    document.querySelectorAll("[data-edit]").forEach(function (el) {
      var k = el.getAttribute("data-edit");
      if (vals[k] != null) el.textContent = vals[k];
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    if (typeof mountChrome === "function") mountChrome();
    captureUtm();
    initTracking();
    initClickTracking();
    applyPageContent();
    initHeaderScroll();
    initMobileMenu();
    initReveal();
    initImageFade();
    initParallax();
    initFavorites();
    initForms();
    initCounters();
    renderFeatured();
    initHomeSearch();
    initProjectListing();
    initProjectDetail();
    initFloatTop();
    initLightbox();
    scanReveal();
  });
})();
