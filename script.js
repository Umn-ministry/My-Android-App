// Pure standalone script.js for your GitHub Pages project
document.addEventListener('DOMContentLoaded', () => {
  // --- Initialize Loader ---
  const loader = document.getElementById('google-loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 1200);
  }

  // --- Ripple Effect ---
  const createRipple = (e) => {
    const btn = e.currentTarget;
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    btn.appendChild(ripple);
    setTimeout(() => { ripple.remove(); }, 600);
  };

  const rippleButtons = document.querySelectorAll('.ripple');
  rippleButtons.forEach(btn => btn.addEventListener('click', createRipple));

  // --- Dark Mode Toggle ---
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const lightIcon = document.getElementById('light-icon');
  const darkIcon = document.getElementById('dark-icon');

  const updateDarkModeUI = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      if (lightIcon) lightIcon.classList.add('hidden');
      if (darkIcon) darkIcon.classList.remove('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      if (lightIcon) lightIcon.classList.remove('hidden');
      if (darkIcon) darkIcon.classList.add('hidden');
    }
  };

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  updateDarkModeUI(savedTheme === 'dark' || (!savedTheme && prefersDark));

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      const isDarkNow = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', !isDarkNow ? 'dark' : 'light');
      updateDarkModeUI(!isDarkNow);
    });
  }

  // --- FAQ Accordion ---
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const chevron = header.querySelector('.faq-chevron');
      const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

      faqHeaders.forEach(otherHeader => {
        const otherContent = otherHeader.nextElementSibling;
        const otherChevron = otherHeader.querySelector('.faq-chevron');
        otherContent.style.maxHeight = '0px';
        otherContent.style.paddingTop = '0px';
        otherContent.style.paddingBottom = '0px';
        if (otherChevron) otherChevron.style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.paddingTop = '12px';
        content.style.paddingBottom = '16px';
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
    });
  });

  // --- Screenshot Slider Controls ---
  const slider = document.getElementById('screenshot-slider');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');

  if (slider) {
    if (prevBtn) prevBtn.addEventListener('click', () => { slider.scrollBy({ left: -280, behavior: 'smooth' }); });
    if (nextBtn) nextBtn.addEventListener('click', () => { slider.scrollBy({ left: 280, behavior: 'smooth' }); });
  }

  // --- Sticky Download Bar & Back to Top ---
  const stickyBar = document.getElementById('sticky-download-bar');
  const backToTopBtn = document.getElementById('back-to-top');
  const mainDownloadBtn = document.getElementById('main-download-btn');

  window.addEventListener('scroll', () => {
    if (backToTopBtn) {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('scale-0', 'opacity-0');
        backToTopBtn.classList.add('scale-100', 'opacity-100');
      } else {
        backToTopBtn.classList.remove('scale-100', 'opacity-100');
        backToTopBtn.classList.add('scale-0', 'opacity-0');
      }
    }

    if (stickyBar && mainDownloadBtn) {
      const isMainBtnHidden = mainDownloadBtn.getBoundingClientRect().bottom < 0;
      if (isMainBtnHidden && window.innerWidth < 768) {
        stickyBar.classList.remove('translate-y-full');
        stickyBar.classList.add('translate-y-0');
      } else {
        stickyBar.classList.add('translate-y-full');
        stickyBar.classList.remove('translate-y-0');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }
});
