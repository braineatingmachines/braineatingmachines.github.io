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

  // Public API
  return { init };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', BEM.init);
