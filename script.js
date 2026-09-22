const nav = document.querySelector('#floating-nav');
const progress = document.querySelector('.progress-line span');
const reveals = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.main-nav a');
const sections = document.querySelectorAll('main section[id]');
const menuOverlay = document.querySelector('#menu-overlay');
const menuTriggers = document.querySelectorAll('.menu-trigger');
const modal = document.querySelector('#project-modal');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const modalKicker = document.querySelector('#modal-kicker');
const modalTags = document.querySelector('#modal-tags');
const modalImage = document.querySelector('#modal-image');

const projectDetails = {
  'project-one': {
    image: 'img/projects/1.jpg',
    kicker: 'Case study · Web application',
    title: 'Sistem Informasi Persuratan',
    description: 'Sebuah dashboard untuk membantu proses permintaan, pemeriksaan, dan penerbitan nomor surat secara lebih teratur. Fokus utama karya ini adalah membuat informasi penting mudah dipindai: status permintaan terlihat jelas, data terbaru tersusun rapi, dan pengguna bisa berpindah dari dashboard ke detail tanpa kehilangan konteks. Saya menggabungkan struktur navigasi yang ringkas dengan kartu status, tabel permintaan, dan hierarki visual yang terasa familiar untuk pekerjaan administratif sehari-hari.',
    tags: ['Dashboard', 'UI/UX', 'Information system']
  },
  'project-two': {
    image: 'img/projects/2.jpg',
    kicker: 'Case study · Web interface',
    title: 'Login Persuratan Digital',
    description: 'Halaman login menjadi pintu pertama sebelum pengguna masuk ke ruang kerja digital. Saya merancangnya agar terasa resmi tetapi tidak kaku: elemen form tetap sederhana, identitas layanan langsung terbaca, dan ilustrasi pena memberi konteks bahwa aplikasi ini berkaitan dengan dokumen serta administrasi. Perhatian kecil seperti state password, kontras tombol, dan jarak antar elemen membantu pengguna menyelesaikan proses masuk dengan lebih percaya diri.',
    tags: ['Front-end', 'Authentication', 'Interface design']
  },
  'project-three': {
    image: 'img/projects/3.jpg',
    kicker: 'Photo story · Nature study',
    title: 'Hening di Hutan',
    description: 'Foto ini diambil di jalur yang lembap, ketika tanah masih menyimpan bekas hujan dan cahaya masuk tipis di antara pepohonan. Lumut yang menempel di batang, pakis yang tumbuh rendah, dan tekstur lumpur di bagian depan membuat lanskap ini terasa dekat dan jujur. Saya tidak ingin menjadikan hutan sekadar latar yang indah; saya ingin menyimpan suasana perjalanan—pelan, basah, sedikit liar, tetapi menenangkan.',
    tags: ['Landscape', 'Visual story', 'Exploration']
  }
};

function updateScrollState() {
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (nav) nav.classList.toggle('is-scrolled', scrollTop > 30);
  if (progress) progress.style.width = `${documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0}%`;
}

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach((section) => sectionObserver.observe(section));

function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  menuOverlay.classList.toggle('is-open', open);
  menuOverlay.setAttribute('aria-hidden', String(!open));
  document.querySelectorAll('.menu-trigger').forEach((trigger) => {
    if (trigger.matches('button')) trigger.setAttribute('aria-expanded', String(open));
  });
}
menuTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    if (trigger.matches('a')) {
      setMenu(false);
      return;
    }
    if (event.currentTarget.classList.contains('menu-overlay-backdrop') || trigger.classList.contains('menu-close')) {
      setMenu(false);
      return;
    }
    setMenu(!document.body.classList.contains('menu-open'));
  });
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

function openModal(projectId) {
  const project = projectDetails[projectId];
  if (!project) return;
  modalKicker.textContent = project.kicker;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalTags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join('');
  modalImage.src = project.image;
  modalImage.alt = project.title;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-project]').forEach((card) => {
  card.addEventListener('click', () => openModal(card.dataset.project));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal(card.dataset.project);
    }
  });
});
document.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(contactForm);
  const subject = encodeURIComponent(`Halo DWI — ${form.get('name')}`);
  const body = encodeURIComponent(`Nama: ${form.get('name')}\nEmail: ${form.get('email')}\n\nPesan:\n${form.get('message')}`);
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=ghalibramadhan27@gmail.com&su=${subject}&body=${body}`, '_blank', 'noopener,noreferrer');
});

const cursorGlow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  if (cursorGlow && window.innerWidth > 900) {
    cursorGlow.style.transform = `translate(${event.clientX - 100}px, ${event.clientY - 100}px)`;
  }
});

const heroVisual = document.querySelector('.hero-visual');
heroVisual?.addEventListener('pointermove', (event) => {
  if (window.innerWidth <= 800) return;
  const bounds = heroVisual.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  heroVisual.style.setProperty('--profile-x', `${x * 7}px`);
  heroVisual.style.setProperty('--profile-y', `${y * 7}px`);
  heroVisual.style.setProperty('--profile-rotate', `${x * 2.8}deg`);
  heroVisual.style.setProperty('--particle-x', `${x * -18}px`);
  heroVisual.style.setProperty('--particle-y', `${y * -18}px`);
});
heroVisual?.addEventListener('pointerleave', () => {
  heroVisual.style.setProperty('--profile-x', '0px');
  heroVisual.style.setProperty('--profile-y', '0px');
  heroVisual.style.setProperty('--profile-rotate', '0deg');
  heroVisual.style.setProperty('--particle-x', '0px');
  heroVisual.style.setProperty('--particle-y', '0px');
});

const skillTabs = document.querySelectorAll('.skill-tab');
const skillPanels = document.querySelectorAll('[data-skill-panel]');
skillTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const selectedSkill = tab.dataset.skill;
    skillTabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
    });
    skillPanels.forEach((panel) => {
      panel.classList.toggle('d-none', panel.dataset.skillPanel !== selectedSkill);
    });
  });
});

const horizontalSection = document.querySelector('.horizontal-work-section');
const horizontalStage = document.querySelector('.horizontal-stage');
const horizontalViewport = document.querySelector('.horizontal-viewport');
const projectTrack = document.querySelector('#project-track');
const projectPanels = document.querySelectorAll('.project-panel');
const galleryCounter = document.querySelector('#gallery-counter');
const prevButton = document.querySelector('.gallery-prev');
const nextButton = document.querySelector('.gallery-next');
let horizontalMax = 0;
let activeProject = 0;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function setupHorizontalGallery() {
  if (!horizontalSection || !horizontalViewport || !projectTrack) return;
  if (window.innerWidth <= 800) {
    horizontalSection.style.height = 'auto';
    horizontalSection.classList.add('is-mobile-gallery');
    projectTrack.style.transform = 'none';
    return;
  }
  horizontalSection.classList.remove('is-mobile-gallery');
  horizontalMax = Math.max(0, projectTrack.scrollWidth - horizontalViewport.clientWidth);
  horizontalSection.style.height = `${window.innerHeight + horizontalMax}px`;
  updateHorizontalGallery();
}

function updateHorizontalGallery() {
  if (!horizontalSection || horizontalSection.classList.contains('is-mobile-gallery')) return;
  const sectionTop = horizontalSection.offsetTop;
  const distance = Math.max(1, horizontalSection.offsetHeight - window.innerHeight);
  const progressValue = clamp((window.scrollY - sectionTop) / distance, 0, 1);
  const translateX = horizontalMax * progressValue;
  projectTrack.style.transform = `translate3d(${-translateX}px, 0, 0)`;
  const nextIndex = horizontalMax > 0 ? Math.round(progressValue * (projectPanels.length - 1)) : 0;
  if (nextIndex !== activeProject) {
    activeProject = nextIndex;
    if (galleryCounter) galleryCounter.textContent = String(activeProject + 1).padStart(2, '0');
  }
}

function goToProject(index) {
  const safeIndex = clamp(index, 0, projectPanels.length - 1);
  if (window.innerWidth <= 800) {
    projectPanels[safeIndex]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    return;
  }
  const sectionTop = horizontalSection.offsetTop;
  const distance = Math.max(1, horizontalSection.offsetHeight - window.innerHeight);
  const target = sectionTop + distance * (safeIndex / (projectPanels.length - 1));
  window.scrollTo({ top: target, behavior: 'smooth' });
}

prevButton?.addEventListener('click', () => goToProject(activeProject - 1));
nextButton?.addEventListener('click', () => goToProject(activeProject + 1));
window.addEventListener('resize', setupHorizontalGallery);
window.addEventListener('load', setupHorizontalGallery);
window.addEventListener('scroll', updateHorizontalGallery, { passive: true });
setupHorizontalGallery();