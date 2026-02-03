/**
 * Brain Eating Machines - Schedule Page JavaScript (Table View)
 * Handles filtering, column sorting, row click detail modal
 */

const ScheduleApp = (function() {
  'use strict';

  let classesData = [];
  let relativeUrlBase = '';
  let currentSort = { column: 'date', direction: 'asc' };

  const init = (data, baseUrl) => {
    classesData = data;
    relativeUrlBase = baseUrl || '';
    initFilters();
    initSort();
    initRowClicks();
    initModal();
    // Apply default sort: status priority, then date ascending
    applyDefaultSort();
  };

  // --- Filters ---

  const initFilters = () => {
    ['location-filter', 'program-filter', 'format-filter', 'grades-filter', 'status-filter'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', filterRows);
    });
  };

  const filterRows = () => {
    const location = document.getElementById('location-filter').value;
    const program = document.getElementById('program-filter').value;
    const format = document.getElementById('format-filter').value;
    const grades = document.getElementById('grades-filter').value;
    const status = document.getElementById('status-filter').value;

    const rows = document.querySelectorAll('.schedule-row');
    let visible = 0;

    rows.forEach(row => {
      const lMatch = location === 'all' || row.dataset.location.includes(location);
      const pMatch = program === 'all' || row.dataset.program === program;
      const fMatch = format === 'all' || row.dataset.format === format;
      const gMatch = grades === 'all' || ('grades-' + row.dataset.grades) === grades;
      const sMatch = status === 'all' || row.dataset.status === status;

      if (lMatch && pMatch && fMatch && gMatch && sMatch) {
        row.style.display = '';
        visible++;
      } else {
        row.style.display = 'none';
      }
    });

    const noResults = document.getElementById('no-results');
    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
  };

  // --- Sorting ---

  const initSort = () => {
    document.querySelectorAll('.schedule-table th.sortable').forEach(th => {
      th.addEventListener('click', () => {
        const col = th.dataset.sort;
        if (currentSort.column === col) {
          currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
          currentSort.column = col;
          currentSort.direction = 'asc';
        }
        updateSortIndicators();
        sortTable();
      });
    });
  };

  const updateSortIndicators = () => {
    document.querySelectorAll('.schedule-table th.sortable').forEach(th => {
      th.classList.remove('sort-active', 'sort-asc', 'sort-desc');
      if (th.dataset.sort === currentSort.column) {
        th.classList.add('sort-active', 'sort-' + currentSort.direction);
      }
    });
  };

  const applyDefaultSort = () => {
    currentSort = { column: 'date', direction: 'asc' };
    updateSortIndicators();
    sortTable(true);
  };

  const sortTable = (useStatusPriority) => {
    const tbody = document.querySelector('.schedule-table tbody');
    if (!tbody) return;

    const rows = Array.from(tbody.querySelectorAll('.schedule-row'));
    const dir = currentSort.direction === 'asc' ? 1 : -1;

    rows.sort((a, b) => {
      // On default sort, apply status priority first
      if (useStatusPriority) {
        const aPri = parseInt(a.dataset.statusPriority, 10);
        const bPri = parseInt(b.dataset.statusPriority, 10);
        if (aPri !== bPri) return aPri - bPri;
      }

      let aVal, bVal;

      switch (currentSort.column) {
        case 'date':
          aVal = a.dataset.startDate || '';
          bVal = b.dataset.startDate || '';
          return dir * aVal.localeCompare(bVal);

        case 'time':
          aVal = a.dataset.time || '';
          bVal = b.dataset.time || '';
          return dir * aVal.localeCompare(bVal);

        case 'program':
          aVal = (a.querySelector('.row-program') || {}).textContent || '';
          bVal = (b.querySelector('.row-program') || {}).textContent || '';
          return dir * aVal.trim().localeCompare(bVal.trim());

        case 'location':
          aVal = (a.querySelector('.row-location') || {}).textContent || '';
          bVal = (b.querySelector('.row-location') || {}).textContent || '';
          return dir * aVal.trim().localeCompare(bVal.trim());

        case 'grades':
          aVal = parseGrade(a.dataset.grades);
          bVal = parseGrade(b.dataset.grades);
          return dir * (aVal - bVal);

        case 'spots':
          aVal = parseInt(a.dataset.spots, 10) || 0;
          bVal = parseInt(b.dataset.spots, 10) || 0;
          return dir * (aVal - bVal);

        case 'status':
          aVal = parseInt(a.dataset.statusPriority, 10);
          bVal = parseInt(b.dataset.statusPriority, 10);
          return dir * (aVal - bVal);

        default:
          return 0;
      }
    });

    rows.forEach(row => tbody.appendChild(row));
  };

  const parseGrade = (grades) => {
    if (!grades) return 0;
    const match = grades.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // --- Row Clicks (open detail) ---

  const initRowClicks = () => {
    document.querySelectorAll('.schedule-row').forEach(row => {
      row.addEventListener('click', (e) => {
        // Don't open detail when clicking action buttons
        if (e.target.closest('.action-cell a, .action-cell span')) return;
        const id = row.dataset.id;
        if (id) showDetail(id);
      });
    });
  };

  // --- Modal ---

  const initModal = () => {
    const modal = document.getElementById('detail-modal');
    if (!modal) return;

    modal.addEventListener('click', function(e) {
      if (e.target === this) closeDetail();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeDetail();
    });
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

    const startDate = parseLocalDate(classData.schedule.start_date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
    const endDate = parseLocalDate(classData.schedule.end_date).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
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
      } else if (classData.status === 'coming-soon') {
        registerBtn.href = relativeUrlBase + 'waitlist/';
        registerBtn.textContent = 'Notify me';
        registerBtn.className = 'btn btn-notify';
        registerBtn.removeAttribute('target');
        registerBtn.removeAttribute('rel');
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

  return { init, showDetail, closeDetail };
})();
