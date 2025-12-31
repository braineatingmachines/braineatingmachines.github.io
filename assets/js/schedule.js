/**
 * Brain Eating Machines - Schedule Page JavaScript
 * Handles class filtering and detail modal functionality
 */

const ScheduleApp = (function() {
  'use strict';

  let classesData = [];
  let relativeUrlBase = '';

  /**
   * Initialize the schedule app
   * @param {Array} data - Array of class objects from Jekyll data
   * @param {string} baseUrl - Relative URL base for images
   */
  const init = (data, baseUrl) => {
    classesData = data;
    relativeUrlBase = baseUrl || '';
    initFilters();
    initModal();
  };

  /**
   * Initialize filter functionality
   */
  const initFilters = () => {
    const filters = [
      'location-filter',
      'program-filter',
      'format-filter',
      'status-filter'
    ];

    filters.forEach(filterId => {
      const filterEl = document.getElementById(filterId);
      if (filterEl) {
        filterEl.addEventListener('change', filterClasses);
      }
    });
  };

  /**
   * Initialize modal functionality
   */
  const initModal = () => {
    const modal = document.getElementById('detail-modal');
    if (!modal) return;

    // Close on outside click
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeDetail();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeDetail();
      }
    });
  };

  /**
   * Filter classes based on selected filters
   */
  const filterClasses = () => {
    const locationFilter = document.getElementById('location-filter').value;
    const programFilter = document.getElementById('program-filter').value;
    const formatFilter = document.getElementById('format-filter').value;
    const statusFilter = document.getElementById('status-filter').value;

    const cards = document.querySelectorAll('.class-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const location = card.getAttribute('data-location');
      const program = card.getAttribute('data-program');
      const format = card.getAttribute('data-format');
      const status = card.getAttribute('data-status');

      const locationMatch = locationFilter === 'all' || location.includes(locationFilter);
      const programMatch = programFilter === 'all' || program === programFilter;
      const formatMatch = formatFilter === 'all' || format === formatFilter;
      const statusMatch = statusFilter === 'all' || status === statusFilter;

      if (locationMatch && programMatch && formatMatch && statusMatch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const noResults = document.getElementById('no-results');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  /**
   * Helper function to parse date string as local date (not UTC)
   * @param {string} dateString - Date string in YYYY-MM-DD format
   * @returns {Date} Parsed date object
   */
  const parseLocalDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
    return new Date(year, month - 1, day); // month is 0-indexed
  };

  /**
   * Show detail modal for a specific class
   * @param {string} classId - ID of the class to show
   */
  const showDetail = (classId) => {
    const classData = classesData.find(c => c.id === classId);
    if (!classData) {
      console.error('Class not found:', classId);
      return;
    }

    // Populate modal - Image
    const detailImage = document.getElementById('detail-image');
    if (detailImage) {
      detailImage.src = relativeUrlBase + classData.image;
    }

    // Title and program
    const detailTitle = document.getElementById('detail-title');
    if (detailTitle) {
      detailTitle.textContent = classData.title;
    }

    const detailProgram = document.getElementById('detail-program');
    if (detailProgram) {
      detailProgram.textContent = classData.program + ' • ' + classData.format;
    }

    const detailDescription = document.getElementById('detail-description');
    if (detailDescription) {
      detailDescription.textContent = classData.description;
    }

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

    // Module information (show if available)
    const moduleSection = document.getElementById('detail-module-section');
    if (moduleSection) {
      if (classData.module_info) {
        moduleSection.style.display = 'block';

        const moduleInfo = document.getElementById('detail-module-info');
        if (moduleInfo) {
          moduleInfo.textContent = classData.module_info;
        }

        const additionalModules = document.getElementById('detail-additional-modules');
        if (additionalModules) {
          additionalModules.textContent = classData.additional_modules || '';
        }

        const registrationNote = document.getElementById('detail-registration-note');
        if (registrationNote) {
          registrationNote.textContent = classData.registration_note || '';
        }

        // Program link
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

    // Learning outcomes
    const learningList = document.getElementById('detail-learning');
    if (learningList && classData.what_students_learn) {
      learningList.innerHTML = '';
      classData.what_students_learn.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        learningList.appendChild(li);
      });
    }

    // Requirements
    const reqList = document.getElementById('detail-requirements');
    if (reqList && classData.requirements) {
      reqList.innerHTML = '';
      classData.requirements.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        reqList.appendChild(li);
      });
    }

    // Schedule details
    const detailLocation = document.getElementById('detail-location');
    if (detailLocation) {
      detailLocation.textContent = classData.location;
    }

    const detailAddress = document.getElementById('detail-address');
    if (detailAddress) {
      detailAddress.textContent = classData.address;
    }

    const detailScheduleDays = document.getElementById('detail-schedule-days');
    if (detailScheduleDays) {
      detailScheduleDays.textContent = classData.schedule.days;
    }

    const detailScheduleTime = document.getElementById('detail-schedule-time');
    if (detailScheduleTime) {
      detailScheduleTime.textContent = classData.schedule.time;
    }

    const detailDates = document.getElementById('detail-dates');
    if (detailDates) {
      const startDate = parseLocalDate(classData.schedule.start_date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
      const endDate = parseLocalDate(classData.schedule.end_date).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
      detailDates.textContent = startDate + ' - ' + endDate;
    }

    const detailGrades = document.getElementById('detail-grades');
    if (detailGrades) {
      detailGrades.textContent = 'Grades ' + classData.grades;
    }

    const detailClassSize = document.getElementById('detail-class-size');
    if (detailClassSize) {
      detailClassSize.textContent = classData.class_size.min + '-' + classData.class_size.max + ' students';
    }

    const detailInstructor = document.getElementById('detail-instructor');
    if (detailInstructor) {
      detailInstructor.textContent = classData.instructor;
    }

    // Pricing
    const detailPrice = document.getElementById('detail-price');
    if (detailPrice) {
      detailPrice.textContent = classData.price;
    }

    const detailPriceNote = document.getElementById('detail-price-note');
    if (detailPriceNote) {
      detailPriceNote.textContent = classData.price_note;
    }

    // Register button
    const registerBtn = document.getElementById('detail-register-btn');
    if (registerBtn && classData.register_url) {
      registerBtn.href = classData.register_url;
    }

    // Show modal
    const modal = document.getElementById('detail-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  /**
   * Close the detail modal
   */
  const closeDetail = () => {
    const modal = document.getElementById('detail-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  // Public API
  return {
    init,
    showDetail,
    closeDetail
  };
})();
