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
