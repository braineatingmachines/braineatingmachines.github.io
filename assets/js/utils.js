/**
 * Brain Eating Machines - Shared Utilities
 * Common functions used across page-specific scripts
 */

const BEMUtils = (function() {
  'use strict';

  /**
   * Initialize filter change listeners on standard filter elements.
   * Expects elements with IDs 'grades-filter' and 'status-filter'.
   * @param {Function} filterCallback - Function to call when any filter changes
   */
  const initFilters = (filterCallback) => {
    ['grades-filter', 'status-filter'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', filterCallback);
    });
  };

  /**
   * Get current filter values from standard filter elements.
   * @returns {{ grades: string, status: string }}
   */
  const getFilterValues = () => {
    const gradesEl = document.getElementById('grades-filter');
    const statusEl = document.getElementById('status-filter');
    return {
      grades: gradesEl ? gradesEl.value : 'all',
      status: statusEl ? statusEl.value : 'all'
    };
  };

  /**
   * Check if a row matches grade and status filters.
   * @param {HTMLElement} row - Element with data-grades and data-status attributes
   * @param {{ grades: string, status: string }} filters - Filter values
   * @returns {boolean}
   */
  const rowMatchesFilters = (row, filters) => {
    const gMatch = filters.grades === 'all' || ('grades-' + row.dataset.grades) === filters.grades;
    const sMatch = filters.status === 'all' || row.dataset.status === filters.status;
    return gMatch && sMatch;
  };

  /**
   * Toggle the no-results message based on visible count.
   * @param {number} visibleCount
   */
  const toggleNoResults = (visibleCount) => {
    const el = document.getElementById('no-results');
    if (el) el.style.display = visibleCount === 0 ? 'block' : 'none';
  };

  /**
   * Setup standard modal behavior: close on backdrop click and ESC key.
   * @param {string} modalId - ID of the modal element
   * @param {Function} closeFn - Function to call to close the modal
   * @param {string} [activeClass='active'] - Class that indicates modal is open
   */
  const initModalClose = (modalId, closeFn, activeClass) => {
    activeClass = activeClass || 'active';
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.addEventListener('click', function(e) {
      if (e.target === this) closeFn();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains(activeClass)) closeFn();
    });
  };

  return { initFilters, getFilterValues, rowMatchesFilters, toggleNoResults, initModalClose };
})();
