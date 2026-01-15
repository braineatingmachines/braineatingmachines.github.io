---
layout: page
title: Registration Confirmation
description: Thank you for signing up for Brain Eating Machines program updates.
permalink: /registration-confirmation/
---

<div class="container-custom py-12">
  <section class="text-center max-w-3xl mx-auto fade-in-section">
    <!-- Success Icon -->
    <div class="mb-8">
      <svg class="w-24 h-24 mx-auto text-lego-green" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
      </svg>
    </div>

    <!-- Thank You Message -->
    <h1 class="text-gray-900 mb-6">Thank You for Signing Up!</h1>

    <p class="text-xl text-gray-600 leading-relaxed mb-8">
      You've been added to our mailing list. We'll send you a notification as soon as the registration window opens.
    </p>

    <!-- Additional Info -->
    <div class="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">What Happens Next?</h2>
      <ul class="text-left text-gray-600 space-y-3 max-w-lg mx-auto">
        <li class="flex items-start">
          <svg class="w-6 h-6 text-lego-blue mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span>You'll receive an email confirmation shortly</span>
        </li>
        <li class="flex items-start">
          <svg class="w-6 h-6 text-lego-blue mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span>We'll notify you when registration opens</span>
        </li>
        <li class="flex items-start">
          <svg class="w-6 h-6 text-lego-blue mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span>Get updates about program details and special announcements</span>
        </li>
      </ul>
    </div>

    <!-- Learn More Section -->
    <div class="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
      <h3 class="text-xl font-bold text-gray-900 mb-3">In the Meantime...</h3>
      <p class="text-gray-600 mb-6">
        Learn more about our Foundations of Robotics Summer Camp program:
      </p>
      <a href="{{ '/foundations-of-robotics/' | relative_url }}" class="btn btn-primary inline-block">
        View Summer Camp Details
      </a>
    </div>

    <!-- Auto-redirect notice -->
    <p class="text-sm text-gray-500">
      You will be redirected to the homepage in <span id="countdown">8</span> seconds...
    </p>
  </section>
</div>

<script>
  // Auto-redirect to homepage after 8 seconds
  let timeLeft = 8;
  const countdownElement = document.getElementById('countdown');

  const countdown = setInterval(() => {
    timeLeft--;
    countdownElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      window.location.href = '{{ "/" | relative_url }}';
    }
  }, 1000);
</script>
