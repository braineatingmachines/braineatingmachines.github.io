/**
 * Brain Eating Machines - Schedule Page JavaScript (Cascade View)
 * Handles expand/collapse of location groups and filtering
 */

const ScheduleApp = (function() {
  'use strict';

  const init = () => {
    initFilters();
    initExpandButtons();
  };

  // --- Expand / Collapse ---

  const toggleLocation = (group) => {
    group.classList.toggle('is-expanded');
    const icon = group.querySelector('.toggle-icon');
    if (icon) {
      icon.innerHTML = group.classList.contains('is-expanded') ? '&#9662;' : '&#9656;';
    }
  };

  const expandAll = () => {
    document.querySelectorAll('.location-group').forEach(g => {
      if (g.style.display !== 'none' && !g.classList.contains('is-hidden')) {
        g.classList.add('is-expanded');
        const icon = g.querySelector('.toggle-icon');
        if (icon) icon.innerHTML = '&#9662;';
      }
    });
  };

  const collapseAll = () => {
    document.querySelectorAll('.location-group').forEach(g => {
      g.classList.remove('is-expanded');
      const icon = g.querySelector('.toggle-icon');
      if (icon) icon.innerHTML = '&#9656;';
    });
  };

  const initExpandButtons = () => {
    const expandBtn = document.getElementById('expand-all-btn');
    const collapseBtn = document.getElementById('collapse-all-btn');
    if (expandBtn) expandBtn.addEventListener('click', expandAll);
    if (collapseBtn) collapseBtn.addEventListener('click', collapseAll);
  };

  // --- Filters ---

  const initFilters = () => {
    ['grades-filter', 'status-filter'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', filterRows);
    });
  };

  const filterRows = () => {
    const grades = document.getElementById('grades-filter').value;
    const status = document.getElementById('status-filter').value;

    const groups = document.querySelectorAll('.location-group');
    let totalVisible = 0;

    groups.forEach(group => {
      const rows = group.querySelectorAll('.module-row');
      let groupVisible = 0;

      rows.forEach(row => {
        const gMatch = grades === 'all' || ('grades-' + row.dataset.grades) === grades;
        const sMatch = status === 'all' || row.dataset.status === status;

        if (gMatch && sMatch) {
          row.classList.remove('is-hidden');
          groupVisible++;
        } else {
          row.classList.add('is-hidden');
        }
      });

      if (groupVisible === 0) {
        group.classList.add('is-hidden');
      } else {
        group.classList.remove('is-hidden');
        totalVisible += groupVisible;
      }
    });

    const noResults = document.getElementById('no-results');
    if (noResults) noResults.style.display = totalVisible === 0 ? 'block' : 'none';
  };

  return { init, toggleLocation };
})();
