---
layout: page
title: Contact Us
description: Get in touch with Brain Eating Machines. Contact us with questions about robotics programs, STEM workshops, or summer camps.
permalink: /contact/
---

<div class="container-custom py-12">
  <!-- Header Section -->
  <section class="text-center max-w-3xl mx-auto mb-16 fade-in-section">
    <h1 class="text-gray-900 mb-6">Send Us a Message</h1>
    <p class="text-xl text-gray-600 leading-relaxed">
      Have questions about our programs? Want to learn more about robotics education?
      We'd love to hear from you!
    </p>
  </section>

  <!-- Contact Form -->
  <section class="bg-gray-50 rounded-2xl p-8 md:p-12 fade-in-section">
    <div class="max-w-2xl mx-auto">
      <form action="https://formspree.io/f/xpzwedgw" method="POST" class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
            <input type="text" id="name" name="name" required
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lego-blue focus:border-lego-blue transition-colors">
          </div>
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
            <input type="email" id="email" name="email_from" required
                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lego-blue focus:border-lego-blue transition-colors">
          </div>
        </div>

        <div>
          <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">Phone (Optional)</label>
          <input type="tel" id="phone" name="phone"
                 class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lego-blue focus:border-lego-blue transition-colors">
        </div>

        <div>
          <label for="subject" class="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
          <select id="subject" name="subject"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lego-blue focus:border-lego-blue transition-colors">
            <option value="">Select a topic...</option>
            <option value="general">General Inquiry</option>
            <option value="programs">Program Information</option>
            <option value="registration">Registration Question</option>
            <option value="partnership">Partnership Opportunity</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
          <textarea id="message" name="message" rows="6" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lego-blue focus:border-lego-blue transition-colors"></textarea>
        </div>

        <input type="hidden" name="_subject" value="New contact form submission from braineatingmachines.com">
        <input type="text" name="_gotcha" style="display:none">
        <input type="hidden" name="_next" value="?message=Thank you! We'll get back to you soon.">

        <div class="text-center">
          <button type="submit" class="btn btn-primary text-lg px-12">
            Send Message
          </button>
          <p class="mt-4 text-sm text-gray-500">
            We typically respond within 24-48 hours.
          </p>
        </div>
      </form>
    </div>
  </section>
</div>

<style>
/* Ensure proper spacing for content sections */
.fade-in-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
