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
    BEMUtils.initFilters(filterRows);
  };

  const filterRows = () => {
    const filters = BEMUtils.getFilterValues();
    let totalVisible = 0;

    document.querySelectorAll('.location-group').forEach(group => {
      const rows = group.querySelectorAll('.module-row');
      let groupVisible = 0;

      rows.forEach(row => {
        if (BEMUtils.rowMatchesFilters(row, filters)) {
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

    BEMUtils.toggleNoResults(totalVisible);
  };

  return { init, toggleLocation };
})();
