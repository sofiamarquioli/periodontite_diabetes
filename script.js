const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const periodontalImage = document.querySelector("[data-periodontal-image]");
const periodontalCaption = document.querySelector("[data-periodontal-caption]");
const periodontalTriggers = [...document.querySelectorAll("[data-periodontal-trigger]")];

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("nav-open", isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0,
  }
);

sections.forEach((section) => observer.observe(section));

periodontalTriggers.forEach((trigger) => {
  const preload = new Image();
  preload.src = trigger.dataset.image;

  trigger.addEventListener("click", () => {
    if (!periodontalImage) return;

    const nextImage = trigger.dataset.image;
    const nextAlt = trigger.dataset.alt || "";
    const nextCaption = trigger.dataset.caption || "";

    periodontalTriggers.forEach((item) => {
      const isActive = item === trigger;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    if (periodontalCaption) {
      periodontalCaption.textContent = nextCaption;
    }

    if (periodontalImage.getAttribute("src") === nextImage) return;

    periodontalImage.classList.add("is-changing");
    periodontalImage.addEventListener(
      "load",
      () => {
        periodontalImage.classList.remove("is-changing");
      },
      { once: true }
    );
    periodontalImage.src = nextImage;
    periodontalImage.alt = nextAlt;
  });
});
