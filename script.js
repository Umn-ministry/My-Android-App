
<script>


document.addEventListener('DOMContentLoaded', () => {
  // --- Initialize Loader ---
  const loader = document.getElementById('google-loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 1200); // Allow nice loading feel
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
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
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

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDarkInitial = savedTheme === 'dark' || (!savedTheme && prefersDark);
  updateDarkModeUI(isDarkInitial);

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      const isDarkNow = document.documentElement.classList.contains('dark');
      const nextDark = !isDarkNow;
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
      updateDarkModeUI(nextDark);
      showToast(nextDark ? 'Dark mode enabled 🌙' : 'Light mode enabled ☀️');
    });
  }

  // --- Toast Notification ---
  const toastContainer = document.getElementById('toast-container');
  const showToast = (message, duration = 3000) => {
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = 'flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-xl text-sm font-medium border border-slate-800 dark:border-slate-200 pointer-events-auto transform translate-y-4 opacity-0 transition-all duration-300';
    
    toast.innerHTML = `
      <svg class="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger transition
    setTimeout(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    }, 10);
    
    // Dismiss
    setTimeout(() => {
      toast.classList.add('translate-y-4', 'opacity-0');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  };

  // Handle direct download clicks
  const downloadBtns = document.querySelectorAll('.download-btn');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Downloading WebView App APK... 🚀');
      
      // Simulate verification check
      setTimeout(() => {
        showToast('✓ Play Protect: Checked & verified safe', 4000);
      }, 1500);
    });
  });

  // --- About Section "Read More" Toggle ---
  const readMoreBtn = document.getElementById('read-more-btn');
  const aboutTextExpanded = document.getElementById('about-text-expanded');
  const readMoreIcon = document.getElementById('read-more-icon');

  if (readMoreBtn && aboutTextExpanded) {
    readMoreBtn.addEventListener('click', () => {
      const isHidden = aboutTextExpanded.classList.contains('hidden');
      if (isHidden) {
        aboutTextExpanded.classList.remove('hidden');
        aboutTextExpanded.classList.add('block');
        readMoreBtn.firstChild.textContent = 'Read Less ';
        if (readMoreIcon) readMoreIcon.style.transform = 'rotate(180deg)';
      } else {
        aboutTextExpanded.classList.add('hidden');
        aboutTextExpanded.classList.remove('block');
        readMoreBtn.firstChild.textContent = 'Read More ';
        if (readMoreIcon) readMoreIcon.style.transform = 'rotate(0deg)';
      }
    });
  }

  // --- Animated FAQ Accordion ---
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const chevron = header.querySelector('.faq-chevron');
      const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

      // Close all other accordions
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
      } else {
        content.style.maxHeight = '0px';
        content.style.paddingTop = '0px';
        content.style.paddingBottom = '0px';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      }
    });
  });

  // --- Screenshot Slider Controls ---
  const slider = document.getElementById('screenshot-slider');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');

  if (slider) {
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -280, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 280, behavior: 'smooth' });
      });
    }

    // Toggle scroll button visibility
    const toggleSliderButtons = () => {
      const isScrollable = slider.scrollWidth > slider.clientWidth;
      if (!isScrollable) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
      }
      if (prevBtn) prevBtn.style.display = slider.scrollLeft > 10 ? 'flex' : 'none';
      if (nextBtn) nextBtn.style.display = slider.scrollLeft < (slider.scrollWidth - slider.clientWidth - 10) ? 'flex' : 'none';
    };

    slider.addEventListener('scroll', toggleSliderButtons);
    window.addEventListener('resize', toggleSliderButtons);
    // Initial check after content is rendered
    setTimeout(toggleSliderButtons, 100);
  }

  // --- Sticky Bottom Download Bar & Scroll to Top button ---
  const stickyBar = document.getElementById('sticky-download-bar');
  const backToTopBtn = document.getElementById('back-to-top');
  const mainDownloadBtn = document.getElementById('main-download-btn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    
    // Show back to top button
    if (backToTopBtn) {
      if (scrollPos > 300) {
        backToTopBtn.classList.remove('scale-0', 'opacity-0');
        backToTopBtn.classList.add('scale-100', 'opacity-100');
      } else {
        backToTopBtn.classList.remove('scale-100', 'opacity-100');
        backToTopBtn.classList.add('scale-0', 'opacity-0');
      }
    }

    // Sticky download bar (mobile only, visible when main download button is out of view)
    if (stickyBar && mainDownloadBtn) {
      const rect = mainDownloadBtn.getBoundingClientRect();
      const isMainBtnHidden = rect.bottom < 0;
      
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
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Animated Stats Counter ---
  const statsCounters = document.querySelectorAll('.counter-val');
  const countTo = (element) => {
    const target = parseFloat(element.getAttribute('data-target'));
    const isFloat = element.getAttribute('data-float') === 'true';
    const duration = 1500; // ms
    const stepTime = 15; // ms
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = isFloat ? target.toFixed(1) : Math.floor(target).toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString();
      }
    }, stepTime);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countTo(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statsCounters.forEach(counter => counterObserver.observe(counter));

  // --- View Code Modal & Standalone Tabs ---
  const viewCodeBtn = document.getElementById('view-code-btn');
  const codeModal = document.getElementById('code-modal');
  const closeCodeModal = document.getElementById('close-code-modal');
  const tabButtons = document.querySelectorAll('.code-tab-btn');
  const codePanes = document.querySelectorAll('.code-pane');
  const copyCodeBtn = document.getElementById('copy-code-btn');

  if (viewCodeBtn && codeModal && closeCodeModal) {
    viewCodeBtn.addEventListener('click', () => {
      codeModal.classList.remove('hidden');
      codeModal.classList.add('flex');
      document.body.style.overflow = 'hidden'; // Stop page scroll
    });

    closeCodeModal.addEventListener('click', () => {
      codeModal.classList.add('hidden');
      codeModal.classList.remove('flex');
      document.body.style.overflow = '';
    });

    // Handle tab switching
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('border-emerald-500', 'text-emerald-500', 'border-b-2', 'font-semibold'));
        tabButtons.forEach(b => b.classList.add('text-slate-500', 'dark:text-slate-400'));
        
        btn.classList.add('border-emerald-500', 'text-emerald-500', 'border-b-2', 'font-semibold');
        btn.classList.remove('text-slate-500', 'dark:text-slate-400');
        
        const targetTab = btn.getAttribute('data-tab');
        codePanes.forEach(pane => {
          if (pane.id === `${targetTab}-code-pane`) {
            pane.classList.remove('hidden');
          } else {
            pane.classList.add('hidden');
          }
        });
      });
    });

    // Copy to clipboard functionality
    if (copyCodeBtn) {
      copyCodeBtn.addEventListener('click', () => {
        const activePane = document.querySelector('.code-pane:not(.hidden)');
        if (!activePane) return;
        
        const codeElement = activePane.querySelector('code');
        if (!codeElement) return;
        
        navigator.clipboard.writeText(codeElement.innerText)
          .then(() => {
            const originalText = copyCodeBtn.innerHTML;
            copyCodeBtn.innerHTML = `
              <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
              </svg>
              Copied!
            `;
            showToast('Code copied to clipboard! 📋');
            setTimeout(() => {
              copyCodeBtn.innerHTML = originalText;
            }, 2000);
          })
          .catch(err => {
            console.error('Failed to copy text: ', err);
            showToast('Failed to copy code ❌');
          });
      });
    }
  }

  // --- Dynamic local clock inside status bars ---
  const updateStatusBarTime = () => {
    const statusTimes = document.querySelectorAll('.status-time');
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    statusTimes.forEach(el => el.textContent = timeString);
  };
  setInterval(updateStatusBarTime, 30000);
  updateStatusBarTime(); // run initially
});
</script>


  
