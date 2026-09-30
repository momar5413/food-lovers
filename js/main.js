document.documentElement.classList.remove('no-js');

const navbar = document.getElementById('navbar');
const nav = document.getElementById('main-nav');
const toggle = document.querySelector('.nav-toggle');
const backToTop = document.querySelector('.back-to-top');

// Navbar background + back-to-top button on scroll
function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    backToTop.classList.toggle('show', y > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
function setMenu(open) {
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
});

// Reveal elements as they scroll into view
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const revealer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => revealer.observe(el));
} else {
    revealEls.forEach((el) => el.classList.add('visible'));
}

// Highlight the nav link of the section in view
const links = nav.querySelectorAll('a[href^="#"]:not(.btn)');
const sections = [...links].map((l) => document.querySelector(l.getAttribute('href')));
const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
    });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach((s) => s && spy.observe(s));

// Contact form (no backend yet): validate and show a thank-you message
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.elements.name.value.trim();
    form.querySelector('.form-status').textContent =
        `Thank you${name ? ', ' + name : ''}! We will get back to you shortly.`;
    form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
