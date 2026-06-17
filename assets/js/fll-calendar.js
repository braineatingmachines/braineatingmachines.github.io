/**
 * Brain Eating Machines - FLL Season Calendar
 * Renders a 4-month mini-calendar highlighting practice Saturdays and competitions.
 */

(function () {
  'use strict';

  const EVENTS = {
    '2026-09-12': { type: 'first',    title: 'First In-Person Team Meeting' },
    '2026-09-19': { type: 'session',  title: 'Team Session (9 AM – 4 PM)' },
    '2026-09-26': { type: 'session',  title: 'Team Session (9 AM – 4 PM)' },
    '2026-10-03': { type: 'session',  title: 'Team Session (9 AM – 4 PM)' },
    '2026-10-10': { type: 'session',  title: 'Team Session (9 AM – 4 PM)' },
    '2026-10-17': { type: 'session',  title: 'Team Session (9 AM – 4 PM)' },
    '2026-10-24': { type: 'session',  title: 'Team Session (9 AM – 4 PM)' },
    '2026-10-31': { type: 'session',  title: 'Team Session (9 AM – 4 PM)' },
    '2026-11-14': { type: 'session',  title: 'Team Session (9 AM – 4 PM)' },
    '2026-11-21': { type: 'regional', title: 'North Jersey Regionals' },
    '2026-12-05': { type: 'session',  title: 'Team Session (9 AM – 4 PM)' },
    '2026-12-12': { type: 'session',  title: 'Team Session (9 AM – 4 PM)' },
    '2026-12-19': { type: 'state',    title: 'FLL State Championship' }
  };

  const MONTHS = [[2026, 8], [2026, 9], [2026, 10], [2026, 11]];
  const MONTH_NAMES = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  const DAY_LABELS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  function pad(n) { return String(n).padStart(2, '0'); }
  function eventKey(y, m, d) { return `${y}-${pad(m + 1)}-${pad(d)}`; }

  function buildMonth(year, month) {
    const wrap = document.createElement('div');
    wrap.className = 'fll-month';

    const hdr = document.createElement('div');
    hdr.className = 'fll-month-hdr';
    hdr.textContent = `${MONTH_NAMES[month]} ${year}`;
    wrap.appendChild(hdr);

    const dow = document.createElement('div');
    dow.className = 'fll-week-labels';
    DAY_LABELS.forEach(d => {
      const s = document.createElement('span');
      s.textContent = d;
      dow.appendChild(s);
    });
    wrap.appendChild(dow);

    const grid = document.createElement('div');
    grid.className = 'fll-grid';

    const firstDow = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDow; i++) {
      grid.appendChild(document.createElement('span'));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement('span');
      const ev = EVENTS[eventKey(year, month, day)];
      if (ev) {
        cell.className = `fll-day fll-${ev.type}`;
        cell.title = ev.title;
      } else {
        cell.className = 'fll-day';
      }
      cell.textContent = day;
      grid.appendChild(cell);
    }

    wrap.appendChild(grid);
    return wrap;
  }

  function buildLegend() {
    const leg = document.createElement('div');
    leg.className = 'fll-legend';
    [
      { cls: 'fll-first',    label: 'First Meeting' },
      { cls: 'fll-session',  label: 'Team Session' },
      { cls: 'fll-regional', label: 'NJ Regionals' },
      { cls: 'fll-state',    label: 'State Championship' }
    ].forEach(({ cls, label }) => {
      const item = document.createElement('span');
      item.className = 'fll-legend-item';
      const dot = document.createElement('span');
      dot.className = `fll-day ${cls}`;
      dot.textContent = '·';
      const lbl = document.createElement('span');
      lbl.textContent = label;
      item.appendChild(dot);
      item.appendChild(lbl);
      leg.appendChild(item);
    });
    return leg;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('fll-session-calendar');
    if (!container) return;

    const monthsWrap = document.createElement('div');
    monthsWrap.className = 'fll-months';
    MONTHS.forEach(([y, m]) => monthsWrap.appendChild(buildMonth(y, m)));

    container.appendChild(monthsWrap);
    container.appendChild(buildLegend());
  });
})();
