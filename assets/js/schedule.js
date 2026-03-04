/**
 * Brain Eating Machines - Schedule Page JavaScript (Cascade + Calendar Views)
 */

const ScheduleApp = (function() {
  'use strict';

  let currentView = 'list';

  const init = () => {
    initViewToggle();
    initFilters();
    initExpandButtons();
    CalendarView.init();
  };

  // --- View Toggle ---

  const initViewToggle = () => {
    const listBtn = document.getElementById('list-view-btn');
    const calBtn = document.getElementById('cal-view-btn');
    if (!listBtn || !calBtn) return;
    listBtn.addEventListener('click', () => switchView('list'));
    calBtn.addEventListener('click', () => switchView('calendar'));
  };

  const switchView = (view) => {
    currentView = view;
    const listView = document.getElementById('list-view');
    const calView = document.getElementById('calendar-view');
    const listBtn = document.getElementById('list-view-btn');
    const calBtn = document.getElementById('cal-view-btn');
    const expandArea = document.getElementById('expand-collapse-area');

    if (view === 'list') {
      if (listView) listView.hidden = false;
      if (calView) calView.hidden = true;
      if (listBtn) { listBtn.classList.add('is-active'); listBtn.setAttribute('aria-pressed', 'true'); }
      if (calBtn) { calBtn.classList.remove('is-active'); calBtn.setAttribute('aria-pressed', 'false'); }
      if (expandArea) expandArea.hidden = false;
    } else {
      if (listView) listView.hidden = true;
      if (calView) calView.hidden = false;
      if (listBtn) { listBtn.classList.remove('is-active'); listBtn.setAttribute('aria-pressed', 'false'); }
      if (calBtn) { calBtn.classList.add('is-active'); calBtn.setAttribute('aria-pressed', 'true'); }
      if (expandArea) expandArea.hidden = true;
      CalendarView.render();
    }
  };

  // --- Expand / Collapse ---

  const toggleLocation = (group) => {
    group.classList.toggle('is-expanded');
    const icon = group.querySelector('.toggle-icon');
    if (icon) icon.innerHTML = group.classList.contains('is-expanded') ? '&#9662;' : '&#9656;';
  };

  const expandAll = () => {
    document.querySelectorAll('.location-group').forEach(g => {
      if (!g.classList.contains('is-hidden')) {
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
    BEMUtils.initFilters(() => {
      filterRows();
      if (currentView === 'calendar') CalendarView.render();
    });
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

// ─── Calendar View ────────────────────────────────────────────────────────────

const CalendarView = (function() {
  'use strict';

  const MONTHS = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  let year, month, allEvents = [];

  const init = () => {
    const dataEl = document.getElementById('schedule-data');
    if (!dataEl) return;
    try { allEvents = JSON.parse(dataEl.textContent); } catch(e) { return; }

    const now = new Date();
    year = now.getFullYear();
    month = now.getMonth();

    const prevBtn = document.getElementById('cal-prev');
    const nextBtn = document.getElementById('cal-next');
    const closeBtn = document.getElementById('cal-popup-close');
    if (prevBtn) prevBtn.addEventListener('click', () => navigate(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigate(1));
    if (closeBtn) closeBtn.addEventListener('click', hidePopup);

    document.addEventListener('click', e => {
      if (!e.target.closest('.cal-event') && !e.target.closest('#cal-popup')) hidePopup();
    });
  };

  const navigate = (dir) => {
    month += dir;
    if (month > 11) { month = 0; year++; }
    if (month < 0) { month = 11; year--; }
    render();
  };

  const render = () => {
    const titleEl = document.getElementById('cal-title');
    if (titleEl) titleEl.textContent = MONTHS[month] + ' ' + year;

    const grid = document.getElementById('cal-grid');
    if (!grid) return;
    grid.innerHTML = '';

    DAYS.forEach(d => {
      const el = document.createElement('div');
      el.className = 'cal-day-header';
      el.textContent = d;
      grid.appendChild(el);
    });

    const firstDow = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayStr = new Date().toDateString();
    const events = getMonthEvents();

    let day = 1 - firstDow;
    while (day <= daysInMonth) {
      const weekEl = document.createElement('div');
      weekEl.className = 'cal-week';

      const daysRow = document.createElement('div');
      daysRow.className = 'cal-days-row';
      for (let d = 0; d < 7; d++) {
        const actual = day + d;
        const cell = document.createElement('div');
        if (actual < 1 || actual > daysInMonth) {
          cell.className = 'cal-day cal-day-empty';
        } else {
          cell.className = 'cal-day';
          if (new Date(year, month, actual).toDateString() === todayStr) cell.classList.add('cal-day-today');
          const num = document.createElement('span');
          num.className = 'cal-day-num';
          num.textContent = actual;
          cell.appendChild(num);
        }
        daysRow.appendChild(cell);
      }
      weekEl.appendChild(daysRow);

      const weekStart = day, weekEnd = day + 6;
      const weekEvs = events.filter(ev => ev.startDay >= weekStart && ev.startDay <= weekEnd);

      if (weekEvs.length) {
        const evRow = document.createElement('div');
        evRow.className = 'cal-events-row';
        const colW = 100 / 7;

        weekEvs.forEach(ev => {
          const bar = document.createElement('div');
          bar.className = 'cal-event cal-event-' + ev.status;
          const sdow = ev.startDate.getDay();
          const edow = ev.endDate.getDay();
          bar.style.cssText = 'margin-left:' + (sdow * colW).toFixed(2) + '%;width:' + ((edow - sdow + 1) * colW).toFixed(2) + '%';
          const text = document.createElement('span');
          text.className = 'cal-event-text';
          text.textContent = ev.locShort;
          bar.appendChild(text);
          bar.addEventListener('click', e => { e.stopPropagation(); showPopup(ev, bar); });
          evRow.appendChild(bar);
        });

        weekEl.appendChild(evRow);
      }

      grid.appendChild(weekEl);
      day += 7;
    }
  };

  const getMonthEvents = () => {
    const f = BEMUtils.getFilterValues();
    return allEvents
      .filter(ev => {
        const d = new Date(ev.start + 'T00:00:00');
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .filter(ev => {
        if (f.grades !== 'all' && ('grades-' + ev.grades) !== f.grades) return false;
        if (f.status !== 'all' && ev.status !== f.status) return false;
        return true;
      })
      .map(ev => {
        const startDate = new Date(ev.start + 'T00:00:00');
        const endDate = new Date(ev.end + 'T00:00:00');
        return Object.assign({}, ev, {
          startDate, endDate,
          startDay: startDate.getDate(),
          endDay: endDate.getDate(),
          locShort: ev.location.replace(/Foundation of Robotics - /i, '').replace(/\s*\(.*\)\s*$/, '').trim()
        });
      });
  };

  const showPopup = (ev, anchor) => {
    const popup = document.getElementById('cal-popup');
    if (!popup) return;

    const labels = { open: 'Open', 'coming-soon': 'Coming Soon', waitlist: 'Waitlist', closed: 'Closed' };
    const action = ev.status === 'open'
      ? '<a href="' + ev.register_url + '" target="_blank" rel="noopener noreferrer" class="btn-action btn-register">Register Now</a>'
      : ev.status === 'coming-soon'
      ? '<a href="/waitlist" class="btn-action btn-notify">Notify Me</a>'
      : ev.status === 'waitlist'
      ? '<a href="/waitlist" class="btn-action btn-waitlist">Join Waitlist</a>'
      : '<span class="btn-action btn-closed">Closed</span>';

    const fmt = { month: 'short', day: 'numeric' };
    const start = ev.startDate.toLocaleDateString('en-US', fmt);
    const end = ev.endDate.toLocaleDateString('en-US', Object.assign({ year: 'numeric' }, fmt));

    document.getElementById('cal-popup-content').innerHTML =
      '<div class="cal-popup-header"><span class="class-badge badge-' + ev.status + '">' + labels[ev.status] + '</span></div>' +
      '<h4 class="cal-popup-title">' + ev.title + '</h4>' +
      '<p class="cal-popup-subtitle">' + ev.subtitle + '</p>' +
      '<div class="cal-popup-meta">' +
        '<div><strong>Location:</strong> ' + ev.locShort + '</div>' +
        '<div><strong>Dates:</strong> ' + start + ' &ndash; ' + end + '</div>' +
        '<div><strong>Time:</strong> ' + ev.time + '</div>' +
        '<div><strong>Grades:</strong> ' + ev.grades + '</div>' +
        '<div><strong>Spots:</strong> ' + ev.spots + ' / ' + ev.max + ' available</div>' +
      '</div>' +
      '<div class="cal-popup-action">' + action + '</div>';

    popup.hidden = false;
    const rect = anchor.getBoundingClientRect();
    const pw = popup.offsetWidth || 280;
    const ph = popup.offsetHeight || 220;
    let top = rect.bottom + 8;
    let left = rect.left;
    if (left + pw > window.innerWidth - 16) left = window.innerWidth - pw - 16;
    if (left < 16) left = 16;
    if (top + ph > window.innerHeight - 16) top = rect.top - ph - 8;
    popup.style.top = top + 'px';
    popup.style.left = left + 'px';
  };

  const hidePopup = () => {
    const p = document.getElementById('cal-popup');
    if (p) p.hidden = true;
  };

  return { init, render };
})();
