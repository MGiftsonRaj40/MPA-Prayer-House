const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");

function setupMenu() {
  if (!menuToggle || !navLinks) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navLinks.classList.toggle("is-open", !isExpanded);
  });

  navAnchors.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("is-open");
    });
  });
}

function setupReveal() {
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 80, 280)}ms`;
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
}

function setupScrollModel() {
  const model = document.getElementById("scroll-bible-model");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!model || reduceMotion.matches) {
    return;
  }

  let ticking = false;

  const rotateModel = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    const rotation = 35 + scrollProgress * 720;

    model.setAttribute("camera-orbit", `${rotation}deg 72deg 9m`);
    ticking = false;
  };

  const requestRotation = () => {
    if (!ticking) {
      window.requestAnimationFrame(rotateModel);
      ticking = true;
    }
  };

  rotateModel();
  window.addEventListener("scroll", requestRotation, { passive: true });
  window.addEventListener("resize", requestRotation);
}

function createSection(id, eyebrow, title, bodyClass, innerMarkup) {
  const section = document.createElement("section");
  section.className = "section reveal";
  section.id = id;
  section.innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">${eyebrow}</p>
      <h2>${title}</h2>
    </div>
    <div class="${bodyClass}">
      ${innerMarkup}
    </div>
  `;
  return section;
}

function renderSite() {
  if (!window.ChurchContent) {
    return;
  }

  const content = window.ChurchContent.loadContent();
  const brandMark = document.querySelector(".brand-mark");
  const brandName = document.querySelector(".brand-text strong");
  const brandTagline = document.querySelector(".brand-text small");
  const heroEyebrow = document.querySelector(".hero-copy .eyebrow");
  const heroTitle = document.querySelector(".hero-copy h1");
  const heroText = document.querySelector(".hero-text");
  const heroButtons = document.querySelectorAll(".hero-actions a");
  const heroStats = document.querySelector(".hero-stats");
  const featurePanel = document.querySelector(".panel-highlight");
  const sidePanels = document.querySelector(".panel-stack");
  const aboutHeading = document.querySelector("#about h2");
  const storyCardText = document.querySelector(".story-card p");
  const valueCards = document.querySelectorAll(".value-card");
  const gatherCards = document.querySelectorAll(".gather-card");
  const featuredMinistry = document.querySelector(".feature-ministry");
  const ministryCards = document.querySelectorAll(".ministry-list article");
  const mediaCards = document.querySelectorAll(".media-card");
  const eventsTimeline = document.querySelector(".events-timeline");
  const visitEyebrow = document.querySelector(".visit-card .eyebrow");
  const visitTitle = document.querySelector(".visit-card h2");
  const visitText = document.querySelector(".visit-card p:last-of-type");
  const visitButtons = document.querySelectorAll(".visit-actions a");
  const footerEyebrow = document.querySelector(".footer .eyebrow");
  const footerTitle = document.querySelector(".footer-grid h2");
  const footerCards = document.querySelectorAll(".contact-card");
  const footerCopyright = document.querySelector(".footer-bottom p");

  if (brandMark) brandMark.textContent = content.brand.mark;
  if (brandName) brandName.textContent = content.brand.name;
  if (brandTagline) brandTagline.textContent = content.brand.tagline;
  if (heroEyebrow) heroEyebrow.textContent = content.hero.eyebrow;
  if (heroTitle) heroTitle.textContent = content.hero.title;
  if (heroText) heroText.textContent = content.hero.text;

  if (heroButtons[0]) {
    heroButtons[0].textContent = content.hero.primaryButton.label;
    heroButtons[0].href = content.hero.primaryButton.href;
  }
  if (heroButtons[1]) {
    heroButtons[1].textContent = content.hero.secondaryButton.label;
    heroButtons[1].href = content.hero.secondaryButton.href;
  }

  if (heroStats) {
    heroStats.innerHTML = content.hero.stats
      .map(
        (item) => `
          <article>
            <strong>${item.label}</strong>
            <span>${item.value}</span>
          </article>
        `
      )
      .join("");
  }

  if (featurePanel) {
    featurePanel.innerHTML = `
      <p class="panel-label">${content.featuredPanel.label}</p>
      <h2>${content.featuredPanel.title}</h2>
      <p>${content.featuredPanel.text}</p>
      <div class="panel-meta">
        <span>${content.featuredPanel.metaOne}</span>
        <span>${content.featuredPanel.metaTwo}</span>
      </div>
    `;
  }

  if (sidePanels) {
    sidePanels.innerHTML = content.sidePanels
      .map(
        (item) => `
          <div class="panel-card">
            <p class="panel-label">${item.label}</p>
            <h3>${item.text}</h3>
          </div>
        `
      )
      .join("");
  }

  if (aboutHeading) aboutHeading.textContent = content.about.heading;
  if (storyCardText) storyCardText.textContent = content.about.story;
  valueCards.forEach((card, index) => {
    const item = content.about.values[index];
    if (!item) {
      return;
    }
    const title = card.querySelector("h3");
    const text = card.querySelector("p");
    const badge = card.querySelector("span");
    if (badge) badge.textContent = String(index + 1).padStart(2, "0");
    if (title) title.textContent = item.title;
    if (text) text.textContent = item.text;
  });

  gatherCards.forEach((card, index) => {
    const item = content.services[index];
    if (!item) {
      return;
    }
    card.querySelector(".panel-label").textContent = item.label;
    card.querySelector("h3").textContent = item.title;
    card.querySelector("p:last-of-type").textContent = item.text;
  });

  if (featuredMinistry) {
    featuredMinistry.innerHTML = `
      <p class="panel-label">${content.featuredMinistry.label}</p>
      <h3>${content.featuredMinistry.title}</h3>
      <p>${content.featuredMinistry.text}</p>
      <a href="${content.featuredMinistry.href}">${content.featuredMinistry.linkLabel}</a>
    `;
  }

  ministryCards.forEach((card, index) => {
    const item = content.ministries[index];
    if (!item) {
      return;
    }
    card.querySelector("h3").textContent = item.title;
    card.querySelector("p").textContent = item.text;
  });

  mediaCards.forEach((card, index) => {
    const item = content.media[index];
    if (!item) {
      return;
    }
    card.querySelector(".panel-label").textContent = item.label;
    card.querySelector("h3").textContent = item.title;
    card.querySelector("p:last-of-type").textContent = item.text;
    const link = card.querySelector("a");
    if (link) {
      link.href = item.href;
      link.textContent = item.linkLabel;
    }
  });

  if (eventsTimeline) {
    eventsTimeline.innerHTML = content.events
      .map(
        (item) => `
          <article class="event-card">
            <div class="event-date">
              <strong>${item.day}</strong>
              <span>${item.month}</span>
            </div>
            <div>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </div>
          </article>
        `
      )
      .join("");
  }

  if (visitEyebrow) visitEyebrow.textContent = content.visit.eyebrow;
  if (visitTitle) visitTitle.textContent = content.visit.title;
  if (visitText) visitText.textContent = content.visit.text;
  if (visitButtons[0]) {
    visitButtons[0].textContent = content.visit.primaryButton.label;
    visitButtons[0].href = content.visit.primaryButton.href;
  }
  if (visitButtons[1]) {
    visitButtons[1].textContent = content.visit.secondaryButton.label;
    visitButtons[1].href = content.visit.secondaryButton.href;
  }

  if (footerEyebrow) footerEyebrow.textContent = content.footer.eyebrow;
  if (footerTitle) footerTitle.textContent = content.footer.title;
  if (footerCards[0]) {
    footerCards[0].innerHTML = `
      <h3>Contact</h3>
      <p>Email: ${content.footer.contact.email}</p>
      <p>Phone: ${content.footer.contact.phone}</p>
      <p>Address: ${content.footer.contact.address}</p>
    `;
  }
  if (footerCards[1]) {
    footerCards[1].innerHTML = `
      <h3>Office Hours</h3>
      <p>${content.footer.office.lineOne}</p>
      <p>${content.footer.office.lineTwo}</p>
      <p>${content.footer.office.lineThree}</p>
    `;
  }
  if (footerCopyright) footerCopyright.textContent = content.footer.copyright;

  const main = document.querySelector("main");
  const aboutSection = document.getElementById("about");
  const eventsSection = document.getElementById("events");
  let newsSection = document.getElementById("news");
  let gallerySection = document.getElementById("gallery");

  const newsMarkup = `
    <div>
      <div class="updates-title">
        <p class="panel-label">Latest News</p>
        <h3>Stories, celebrations, and community highlights.</h3>
      </div>
      <div class="news-grid">
        ${content.news
          .map(
            (item) => `
              <article class="news-card">
                <p class="panel-label">${item.category}</p>
                <h3>${item.title}</h3>
                <p>${item.text}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
    <aside class="notice-board">
      <div class="updates-title">
        <p class="panel-label">Notice Board</p>
        <h3>Quick reminders for the week ahead.</h3>
      </div>
      <div class="notice-list">
        ${content.notices
          .map(
            (item) => `
              <article class="notice-item">
                <h3>${item.title}</h3>
                <p>${item.text}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </aside>
  `;

  const galleryMarkup = content.gallery
    .map(
      (item) => `
        <article class="gallery-card">
          <img src="${item.image}" alt="${item.alt}">
          <div class="gallery-caption">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </div>
        </article>
      `
    )
    .join("");

  if (!newsSection && main && aboutSection) {
    newsSection = createSection(
      "news",
      "Church updates",
      "Fresh news, important notices, and moments worth remembering.",
      "updates-layout",
      newsMarkup
    );
    main.insertBefore(newsSection, aboutSection.nextElementSibling);
  } else if (newsSection) {
    newsSection.querySelector(".updates-layout").innerHTML = newsMarkup;
  }

  if (!gallerySection && main && eventsSection) {
    gallerySection = createSection(
      "gallery",
      "Church gallery",
      "Images that capture worship, fellowship, and joyful service.",
      "gallery-grid",
      galleryMarkup
    );
    main.insertBefore(gallerySection, eventsSection.nextElementSibling);
  } else if (gallerySection) {
    gallerySection.querySelector(".gallery-grid").innerHTML = galleryMarkup;
  }

  setupReveal();
}

const loader = document.getElementById("loader");
const model = document.getElementById("scroll-bible-model");

model.addEventListener("load", () => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
        loader.remove();
    }, 800);
});

setupMenu();
setupScrollModel();
renderSite();
