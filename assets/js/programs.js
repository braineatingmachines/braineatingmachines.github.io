/**
 * Brain Eating Machines - Programs Cascade Page JavaScript
 * Handles expand/collapse, filtering, and detail modal
 */

const ProgramsApp = (function() {
  'use strict';

  let classesData = [];
  let relativeUrlBase = '';

  const init = (data, baseUrl) => {
    classesData = data;
    relativeUrlBase = baseUrl || '';
    sortSessionsWithinLocations();
    initFilters();
    initRowClicks();
    initToggleAll();
    initModal();
  };

  // --- Expand / Collapse ---

  const toggleLocation = (locationRow) => {
    const isExpanded = locationRow.classList.contains('expanded');
    if (isExpanded) {
      locationRow.classList.remove('expanded');
      locationRow.classList.add('collapsed');
    } else {
      locationRow.classList.remove('collapsed');
      locationRow.classList.add('expanded');
    }
    updateToggleAllBtn();
  };

  const initToggleAll = () => {
    const btn = document.getElementById('toggle-all-btn');
    if (btn) btn.addEventListener('click', toggleAll);
  };

  const toggleAll = () => {
    const rows = document.querySelectorAll('.location-row');
    const allCollapsed = Array.from(rows).every(r => r.classList.contains('collapsed'));

    rows.forEach(row => {
      if (allCollapsed) {
        row.classList.remove('collapsed');
        row.classList.add('expanded');
      } else {
        row.classList.remove('expanded');
        row.classList.add('collapsed');
      }
    });
    updateToggleAllBtn();
  };

  const updateToggleAllBtn = () => {
    const btn = document.getElementById('toggle-all-btn');
    if (!btn) return;
    const rows = document.querySelectorAll('.location-row');
    const allCollapsed = Array.from(rows).every(r => r.classList.contains('collapsed'));
    btn.textContent = allCollapsed ? 'Expand All' : 'Collapse All';
  };

  // --- Sorting sessions within each location ---

  const sortSessionsWithinLocations = () => {
    const statusOrder = { open: 0, waitlist: 1, 'coming-soon': 2, full: 3, closed: 4 };

    document.querySelectorAll('.location-group').forEach(tbody => {
      const sessions = Array.from(tbody.querySelectorAll('.session-row'));
      if (sessions.length === 0) return;

      sessions.sort((a, b) => {
        // Sort by status priority first
        const aStat = statusOrder[a.dataset.status] || 9;
        const bStat = statusOrder[b.dataset.status] || 9;
        if (aStat !== bStat) return aStat - bStat;

        // Then by module name (from cell text)
        const aModule = (a.querySelector('.session-module') || {}).textContent || '';
        const bModule = (b.querySelector('.session-module') || {}).textContent || '';
        const modCmp = aModule.trim().localeCompare(bModule.trim());
        if (modCmp !== 0) return modCmp;

        // Then by start date
        const aDate = a.dataset.startDate || '';
        const bDate = b.dataset.startDate || '';
        return aDate.localeCompare(bDate);
      });

      // Re-append in sorted order (after the location row)
      sessions.forEach(row => tbody.appendChild(row));
    });
  };

  // --- Filters ---

  const initFilters = () => {
    BEMUtils.initFilters(filterRows);
  };

  const filterRows = () => {
    const filters = BEMUtils.getFilterValues();
    let totalVisible = 0;

    document.querySelectorAll('.location-group').forEach(tbody => {
      const sessions = tbody.querySelectorAll('.session-row');
      let groupVisible = 0;

      sessions.forEach(row => {
        if (BEMUtils.rowMatchesFilters(row, filters)) {
          row.style.display = '';
          groupVisible++;
        } else {
          row.style.display = 'none';
        }
      });

      // Hide entire location group if no sessions match
      const locationRow = tbody.querySelector('.location-row');
      if (locationRow) {
        tbody.style.display = groupVisible === 0 ? 'none' : '';
      }

      totalVisible += groupVisible;
    });

    BEMUtils.toggleNoResults(totalVisible);
  };

  // --- Row Clicks (open detail) ---

  const initRowClicks = () => {
    document.querySelectorAll('.session-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.closest('.action-cell a, .action-cell span')) return;
        const id = row.dataset.id;
        if (id) showDetail(id);
      });
    });
  };

  // --- Modal ---

  const initModal = () => {
    BEMUtils.initModalClose('detail-modal', closeDetail);
  };

  const parseLocalDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(n => parseInt(n, 10));
    return new Date(year, month - 1, day);
  };

  const showDetail = (classId) => {
    const classData = classesData.find(c => c.id === classId);
    if (!classData) return;

    const set = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    const detailImage = document.getElementById('detail-image');
    if (detailImage) detailImage.src = relativeUrlBase + classData.image;

    set('detail-title', classData.title);
    set('detail-program', classData.program + ' \u2022 ' + classData.format);
    set('detail-description', classData.description);

    // Badge
    const badge = document.getElementById('detail-badge');
    if (badge) {
      badge.className = 'class-badge badge-' + classData.status;
      if (classData.status === 'open') {
        badge.textContent = 'Open - ' + classData.class_size.spots_available + ' spots available';
      } else if (classData.status === 'waitlist') {
        badge.textContent = 'Waitlist Available';
      } else if (classData.status === 'full') {
        badge.textContent = 'Full';
      } else if (classData.status === 'closed') {
        badge.textContent = 'Closed';
      } else {
        badge.textContent = 'Coming Soon';
      }
    }

    // Module info
    const moduleSection = document.getElementById('detail-module-section');
    if (moduleSection) {
      if (classData.module_info) {
        moduleSection.style.display = 'block';
        set('detail-module-info', classData.module_info);
        set('detail-additional-modules', classData.additional_modules || '');
        set('detail-registration-note', classData.registration_note || '');

        const programLink = document.getElementById('detail-program-link');
        if (programLink) {
          if (classData.program_link) {
            programLink.href = classData.program_link;
            programLink.style.display = 'inline-block';
          } else {
            programLink.style.display = 'none';
          }
        }
      } else {
        moduleSection.style.display = 'none';
      }
    }

    // Lists
    const populateList = (id, items) => {
      const list = document.getElementById(id);
      if (list && items) {
        list.innerHTML = '';
        items.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          list.appendChild(li);
        });
      }
    };

    populateList('detail-learning', classData.what_students_learn);
    populateList('detail-requirements', classData.requirements);

    // Sidebar
    set('detail-location', classData.location);
    set('detail-address', classData.address);
    set('detail-schedule-days', classData.schedule.days);
    set('detail-schedule-time', classData.schedule.time);

    const startDate = parseLocalDate(classData.schedule.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endDate = parseLocalDate(classData.schedule.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    set('detail-dates', startDate + ' - ' + endDate);

    set('detail-grades', 'Grades ' + classData.grades);
    set('detail-class-size', classData.class_size.min + '-' + classData.class_size.max + ' students');
    set('detail-instructor', classData.instructor);
    set('detail-price', classData.price);
    set('detail-price-note', classData.price_note);

    // Register button
    const registerBtn = document.getElementById('detail-register-btn');
    if (registerBtn) {
      if (classData.status === 'open' && classData.register_url) {
        registerBtn.href = classData.register_url;
        registerBtn.textContent = 'Register Now';
        registerBtn.className = 'btn btn-primary';
        registerBtn.target = '_blank';
        registerBtn.rel = 'noopener noreferrer';
      } else {
        registerBtn.href = relativeUrlBase + 'waitlist/';
        registerBtn.textContent = 'Join Waitlist';
        registerBtn.className = 'btn btn-waitlist';
        registerBtn.removeAttribute('target');
        registerBtn.removeAttribute('rel');
      }
    }

    // Show modal
    const modal = document.getElementById('detail-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDetail = () => {
    const modal = document.getElementById('detail-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  return { init, toggleLocation, showDetail, closeDetail };
})();
