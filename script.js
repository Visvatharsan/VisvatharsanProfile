const typingElement = document.getElementById('typing-text');
const words = ['Java', 'C++', 'Node.js', 'MySQL', 'GCP'];
let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typingElement) return;

  const currentWord = words[wordIndex];
  const speed = deleting ? 70 : 110;

  typingElement.textContent = currentWord.slice(0, letterIndex);

  if (!deleting && letterIndex < currentWord.length) {
    letterIndex += 1;
  } else if (deleting && letterIndex > 0) {
    letterIndex -= 1;
  } else if (!deleting && letterIndex === currentWord.length) {
    deleting = true;
    setTimeout(typeEffect, 1100);
    return;
  } else {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach((el) => observer.observe(el));

const navLinks = document.querySelectorAll('.nav-links a');
const navMenu = document.getElementById('nav-links');
const menuToggle = document.querySelector('.menu-toggle');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

const counters = document.querySelectorAll('.counter');
const animateCounter = (counter) => {
  const target = Number(counter.dataset.target || '0');
  const duration = 1400;
  let start = null;

  function update(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    counter.textContent = Math.floor(progress * target).toString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = target.toString();
    }
  }

  requestAnimationFrame(update);
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
  { threshold: 0.45 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear().toString();
}
