/**
 * Feedback Form - Multi-step form handler
 */

(function() {
  'use strict';

  // Configuration
  const CLOUDFLARE_WORKER_URL = 'https://feedback-form-handler.spikeprimegit.workers.dev';

  // State
  let currentStep = 1;
  const totalSteps = 3;

  // DOM Elements
  const form = document.getElementById('feedback-form');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const progressPercentage = document.getElementById('progress-percentage');
  const errorMessage = document.getElementById('error-message');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const submitLoading = document.getElementById('submit-loading');

  // Initialize
  function init() {
    setupNavigationButtons();
    setupConditionalFields();
    updateProgress();
  }

  // Setup navigation buttons
  function setupNavigationButtons() {
    // Next buttons
    document.querySelectorAll('.next-step').forEach(button => {
      button.addEventListener('click', () => {
        if (validateCurrentStep()) {
          goToStep(currentStep + 1);
        }
      });
    });

    // Previous buttons
    document.querySelectorAll('.prev-step').forEach(button => {
      button.addEventListener('click', () => {
        goToStep(currentStep - 1);
      });
    });

    // Form submission
    form.addEventListener('submit', handleSubmit);
  }

  // Setup conditional "other" text fields
  function setupConditionalFields() {
    // "How did you hear" - other
    const hearAboutOther = document.getElementById('hear-about-other');
    const hearAboutOtherText = document.getElementById('hear-about-other-text');
    if (hearAboutOther && hearAboutOtherText) {
      hearAboutOther.addEventListener('change', function() {
        if (this.checked) {
          hearAboutOtherText.classList.remove('hidden');
          hearAboutOtherText.focus();
        } else {
          hearAboutOtherText.classList.add('hidden');
          hearAboutOtherText.value = '';
        }
      });
    }

    // Additional programs - other
    const programsOther = document.getElementById('programs-other');
    const programsOtherText = document.getElementById('programs-other-text');
    if (programsOther && programsOtherText) {
      programsOther.addEventListener('change', function() {
        if (this.checked) {
          programsOtherText.classList.remove('hidden');
          programsOtherText.focus();
        } else {
          programsOtherText.classList.add('hidden');
          programsOtherText.value = '';
        }
      });
    }
  }

  // Navigate to specific step
  function goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > totalSteps) return;

    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
      step.classList.remove('active');
    });

    // Show target step
    const targetStep = document.querySelector(`[data-step="${stepNumber}"]`);
    if (targetStep) {
      targetStep.classList.add('active');
      currentStep = stepNumber;
      updateProgress();

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Update progress bar
  function updateProgress() {
    const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `Step ${currentStep} of ${totalSteps}`;
    progressPercentage.textContent = `${Math.round(percentage)}%`;
  }

  // Validate current step
  function validateCurrentStep() {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    if (!currentStepElement) return false;

    // Get all required fields in current step
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      // For radio buttons, check if any in the group is selected
      if (field.type === 'radio') {
        const radioGroup = currentStepElement.querySelectorAll(`[name="${field.name}"]`);
        const isChecked = Array.from(radioGroup).some(radio => radio.checked);
        if (!isChecked) {
          isValid = false;
          // Highlight the question
          const question = field.closest('.form-question');
          if (question) {
            question.style.border = '2px solid #EF4444';
            question.style.borderRadius = '0.5rem';
            question.style.padding = '1rem';
            setTimeout(() => {
              question.style.border = '';
              question.style.padding = '';
            }, 2000);
          }
        }
      }
      // For other input types
      else if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#EF4444';
        setTimeout(() => {
          field.style.borderColor = '';
        }, 2000);
      }
    });

    if (!isValid) {
      alert('Please answer all required questions before continuing.');
    }

    return isValid;
  }

  // Collect form data
  function collectFormData() {
    const formData = new FormData(form);
    const data = {};

    // Handle regular fields
    for (const [key, value] of formData.entries()) {
      // Handle array fields (checkboxes)
      if (key.endsWith('[]')) {
        const cleanKey = key.replace('[]', '');
        if (!data[cleanKey]) {
          data[cleanKey] = [];
        }
        data[cleanKey].push(value);
      } else {
        data[key] = value;
      }
    }

    // Handle checkboxes that might not be checked
    const checkboxFields = [
      'parent_additional_programs'
    ];

    checkboxFields.forEach(field => {
      if (!data[field]) {
        data[field] = [];
      }
    });

    return data;
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    // Validate final step
    if (!validateCurrentStep()) {
      return;
    }

    // Disable submit button
    submitBtn.disabled = true;
    submitText.classList.add('hidden');
    submitLoading.classList.remove('hidden');
    errorMessage.classList.add('hidden');

    try {
      const formData = collectFormData();

      // Submit to Cloudflare Worker
      const response = await fetch(CLOUDFLARE_WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      // Redirect to thank you page
      window.location.href = '/program-feedback-thank-you/';

    } catch (error) {
      console.error('Form submission error:', error);

      // Show error message
      errorMessage.classList.remove('hidden');

      // Re-enable submit button
      submitBtn.disabled = false;
      submitText.classList.remove('hidden');
      submitLoading.classList.add('hidden');

      // Scroll to error
      errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
