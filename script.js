const page = document.body.dataset.page || "";

const typingElement = document.getElementById("typing-text");
const words = ["Node.js", "Java", "MySQL", "GCP", "REST APIs", "Cloud Functions"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function runTyping() {
  if (!typingElement) return;

  const current = words[wordIndex];
  typingElement.textContent = current.slice(0, charIndex);

  if (!isDeleting && charIndex < current.length) {
    charIndex += 1;
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
  } else if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(runTyping, 900);
    return;
  } else {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  const speed = isDeleting ? 60 : 95;
  setTimeout(runTyping, speed);
}
runTyping();

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("nav-links");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const currentNav = document.querySelector(`.nav-links a[data-nav="${page}"]`);
if (currentNav) currentNav.classList.add("active");

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);
revealItems.forEach((item) => revealObserver.observe(item));

const counters = document.querySelectorAll(".counter");
const animateCounter = (counter) => {
  const target = Number(counter.dataset.target || "0");
  const duration = 1350;
  let start = 0;

  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    counter.textContent = Math.floor(progress * target).toString();
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.42 }
);
counters.forEach((counter) => counterObserver.observe(counter));

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
if (filterButtons.length > 0 && projectCards.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.filter || "all";

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        const tags = card.dataset.tags || "";
        const matched = value === "all" || tags.includes(value);
        card.classList.toggle("hidden", !matched);
      });
    });
  });
}

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeBtn = document.querySelector(".lightbox-close");
const shots = document.querySelectorAll(".shot");

if (lightbox && lightboxImage && shots.length > 0) {
  shots.forEach((img) => {
    img.setAttribute("tabindex", "0");
    img.addEventListener("click", () => {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });

    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter") img.click();
    });
  });
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

const tiltCards = document.querySelectorAll("[data-tilt-card]");
const canTilt = window.matchMedia("(pointer: fine)").matches;
if (canTilt) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const box = card.getBoundingClientRect();
      const x = event.clientX - box.left;
      const y = event.clientY - box.top;
      const rotateX = ((y / box.height) - 0.5) * -6;
      const rotateY = ((x / box.width) - 0.5) * 6;
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

const orbs = document.querySelectorAll(".orb");
if (orbs.length > 0 && canTilt) {
  window.addEventListener("mousemove", (event) => {
    const xRatio = event.clientX / window.innerWidth - 0.5;
    const yRatio = event.clientY / window.innerHeight - 0.5;

    orbs.forEach((orb, index) => {
      const factor = (index + 1) * 12;
      orb.style.transform = `translate(${xRatio * factor}px, ${yRatio * factor}px)`;
    });
  });
}

const contactForm = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");
if (contactForm && feedback) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.textContent = "Thanks for reaching out. I will get back to you soon.";
    contactForm.reset();
  });
}

const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = String(new Date().getFullYear());
