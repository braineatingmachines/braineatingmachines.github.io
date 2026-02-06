/**
 * Brain Eating Machines - Main JavaScript
 * Handles smooth scrolling, animations, and navigation
 */

const BEM = (function() {
  'use strict';

  /**
   * Initialize all features
   */
  const init = () => {
    initSmoothScroll();
    initFadeInAnimations();
    initMobileMenu();
    initDesktopDropdowns();
    initMobileDropdowns();
    initStickyWaitlistButton();
    initMailerLiteOverlay();
  };

  /**
   * Smooth scroll for anchor links
   */
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only handle if it's still an anchor link (starts with #)
        if (href && href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  };

  /**
   * Fade-in animations on scroll using IntersectionObserver
   */
  const initFadeInAnimations = () => {
    const faders = document.querySelectorAll('.fade-in-section');

    if (faders.length === 0) return;

    const appearOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        appearOnScroll.unobserve(entry.target);
      });
    }, appearOptions);

    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });
  };

  /**
   * Mobile menu toggle
   */
  const initMobileMenu = () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  };

  /**
   * Desktop dropdown menus (hover only)
   */
  const initDesktopDropdowns = () => {
    const dropdownContainers = document.querySelectorAll('.dropdown-container');

    dropdownContainers.forEach(container => {
      const menu = container.querySelector('.dropdown-menu');
      const chevron = container.querySelector('.dropdown-chevron');

      if (menu && chevron) {
        // Open dropdown on hover
        container.addEventListener('mouseenter', () => {
          menu.classList.remove('opacity-0', 'invisible');
          menu.classList.add('opacity-100', 'visible');
          chevron.classList.add('rotate-180');
        });

        // Close dropdown when mouse leaves
        container.addEventListener('mouseleave', () => {
          menu.classList.remove('opacity-100', 'visible');
          menu.classList.add('opacity-0', 'invisible');
          chevron.classList.remove('rotate-180');
        });
      }
    });
  };

  /**
   * Mobile dropdown menus
   */
  const initMobileDropdowns = () => {
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    mobileDropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const container = toggle.closest('.mobile-dropdown-container');
        const menu = container.querySelector('.mobile-dropdown-menu');
        const chevron = toggle.querySelector('svg');

        if (menu && chevron) {
          menu.classList.toggle('hidden');
          chevron.classList.toggle('rotate-180');
        }
      });
    });
  };

  /**
   * Sticky waitlist button - shows after scrolling past hero
   */
  const initStickyWaitlistButton = () => {
    const stickyButton = document.getElementById('sticky-waitlist-btn');

    if (!stickyButton) return;

    let isButtonVisible = false;

    const heroSection = document.querySelector('.hero-gradient, .hero-section, #hero');
    const heroHeight = heroSection ? heroSection.offsetHeight : 600;

    const toggleButton = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > heroHeight && !isButtonVisible) {
        stickyButton.classList.remove('translate-y-32', 'opacity-0');
        stickyButton.classList.add('translate-y-0', 'opacity-100');
        isButtonVisible = true;
      } else if (scrollTop <= heroHeight && isButtonVisible) {
        stickyButton.classList.remove('translate-y-0', 'opacity-100');
        stickyButton.classList.add('translate-y-32', 'opacity-0');
        isButtonVisible = false;
      }

    };

    window.addEventListener('scroll', toggleButton);
    toggleButton(); // Check initial state
  };

  /**
   * MailerLite embedded form overlay
   */
  const initMailerLiteOverlay = () => {
    const overlay = document.getElementById('ml-form-overlay');
    const closeBtn = document.getElementById('close-ml-overlay');
    const triggers = document.querySelectorAll('.waitlist-trigger');

    if (!overlay || !closeBtn) return;

    const openOverlay = () => {
      overlay.classList.remove('hidden');
      overlay.classList.add('flex');
      document.body.style.overflow = 'hidden';
    };

    const closeOverlay = () => {
      overlay.classList.add('hidden');
      overlay.classList.remove('flex');
      document.body.style.overflow = '';
    };

    // Open overlay when clicking any waitlist trigger
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openOverlay();
      });
    });

    // Close overlay when clicking the close button
    closeBtn.addEventListener('click', closeOverlay);

    // Close overlay when clicking outside the form
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeOverlay();
    });

    // Close overlay on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !overlay.classList.contains('hidden')) closeOverlay();
    });
  };

  // Public API
  return { init };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', BEM.init);
