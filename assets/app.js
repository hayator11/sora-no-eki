const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-config-link]").forEach((link) => {
  const key = link.getAttribute("data-config-link");
  if (window.SORA_CONFIG && window.SORA_CONFIG[key]) {
    link.href = window.SORA_CONFIG[key];
  }
});

if (!document.querySelector(".mobile-cta")) {
  const mobileCta = document.createElement("div");
  mobileCta.className = "mobile-cta";
  mobileCta.innerHTML = `
    <a href="/access/">アクセス</a>
    <a href="https://onokun.shop.socialimagine.com/">公式SHOP</a>
    <a href="/first-visit/">営業時間</a>
    <a href="https://www.google.com/maps/search/?api=1&query=%E5%AE%AE%E5%9F%8E%E7%9C%8C%E6%9D%B1%E6%9D%BE%E5%B3%B6%E5%B8%82%E7%89%9B%E7%B6%B2%E5%AD%97%E4%B8%8A%E6%B1%9F%E6%88%B8%E5%8E%9F4-1">Map</a>
  `;
  document.body.appendChild(mobileCta);
}

if (!document.querySelector('script[type="application/ld+json"][data-breadcrumb]')) {
  const path = location.pathname;
  const name = document.querySelector("h1")?.textContent.trim() || document.title;
  if (path !== "/") {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.breadcrumb = "true";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "TOP", item: "https://sora-no-eki.onokun.com/" },
        { "@type": "ListItem", position: 2, name, item: `https://sora-no-eki.onokun.com${path}` }
      ]
    });
    document.head.appendChild(script);
  }
}

const newsList = document.querySelector("[data-soranoeki-news-list]");
const newsStatus = document.querySelector("[data-soranoeki-news-status]");

if (newsList && newsStatus) {
  const newsApi = window.SORA_CONFIG?.soranoekiNewsApi || "https://onokun.com/wp-json/wp/v2/soranoeki_news?per_page=3&_embed";

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html || "";
    return div.textContent.trim();
  };

  const escapeHtml = (text) => String(text || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  };

  const getFeaturedImage = (post) => {
    const media = post?._embedded?.["wp:featuredmedia"]?.[0];
    return media?.media_details?.sizes?.medium_large?.source_url || media?.source_url || "";
  };

  fetch(newsApi)
    .then((response) => {
      if (!response.ok) throw new Error("News API error");
      return response.json();
    })
    .then((posts) => {
      if (!Array.isArray(posts) || posts.length === 0) {
        newsStatus.textContent = "現在、公開中のお知らせはありません。";
        return;
      }

      newsList.innerHTML = posts.map((post) => {
        const title = stripHtml(post.title?.rendered);
        const excerpt = stripHtml(post.excerpt?.rendered);
        const image = getFeaturedImage(post);
        const date = formatDate(post.date);
        const safeTitle = escapeHtml(title);
        const safeExcerpt = escapeHtml(excerpt);
        const safeDate = escapeHtml(date);
        const safeImage = escapeHtml(image);
        const safeLink = escapeHtml(post.link);
        const imageHtml = safeImage ? `<img src="${safeImage}" alt="${safeTitle}" loading="lazy">` : "";

        return `
          <article class="card">
            ${imageHtml}
            <p class="eyebrow">${safeDate}</p>
            <h3><a href="${safeLink}">${safeTitle}</a></h3>
            <p>${safeExcerpt}</p>
          </article>
        `;
      }).join("");
      newsStatus.textContent = "";
    })
    .catch(() => {
      newsStatus.textContent = "お知らせを読み込めませんでした。";
    });
}
