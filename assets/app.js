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
    <a href="https://www.google.com/maps/search/?api=1&query=%E9%99%B8%E5%89%8D%E5%B0%8F%E9%87%8E%E9%A7%85%20%E7%A9%BA%E3%81%AE%E9%A7%85%20%E3%81%8A%E3%81%AE%E3%81%8F%E3%82%93">Map</a>
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
