---
layout: page
title: Foundations of Robotics
description: Learn robotics fundamentals through our after-school program or intensive summer camp
custom_layout: true
---

<!-- Navigation Section -->
<section class="section bg-gradient-to-br from-lego-blue to-blue-700">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">Foundations of Robotics</h1>
      <p class="text-xl text-blue-100 mb-10">Choose the format that works best for you</p>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- After-School Card -->
        <a href="#after-school" class="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-left group">
          <div class="flex items-center justify-between mb-4">
            <span class="inline-block px-4 py-2 bg-lego-blue text-white rounded-full text-sm font-semibold">After-School</span>
            <svg class="w-6 h-6 text-lego-blue group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">15-Session Program</h3>
          <p class="text-gray-600">Weekly after-school sessions throughout the semester for in-depth learning</p>
        </a>

        <!-- Summer Camp Card -->
        <a href="#summer-camp" class="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-left group">
          <div class="flex items-center justify-between mb-4">
            <span class="inline-block px-4 py-2 bg-lego-yellow text-gray-900 rounded-full text-sm font-semibold">Summer Camp</span>
            <svg class="w-6 h-6 text-lego-yellow group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">2-Week Intensive</h3>
          <p class="text-gray-600">Full-day summer camp for immersive robotics experience</p>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- AFTER-SCHOOL PROGRAM SECTION -->
<div id="after-school" class="scroll-mt-20">
  {% assign page_data = site.data.programs.foundations-after-school %}

  {% include components/hero-section.html
     badge_text=page_data.program_badge
     badge_color=page_data.badge_color
     badge_text_color=page_data.badge_text_color
     title=page_data.hero.title
     description=page_data.hero.description
     primary_button_text=page_data.hero.primary_button.text
     primary_button_url=page_data.hero.primary_button.url
     tertiary_button_text=page_data.hero.tertiary_button.text
     tertiary_button_url=page_data.hero.tertiary_button.url
     secondary_button_text=page_data.hero.secondary_button.text
     secondary_button_url=page_data.hero.secondary_button.url
  %}

  <!-- Program Overview -->
  <section class="section bg-white">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-center text-gray-900 mb-8">Program Overview</h2>

        {% include components/overview-grid.html items=page_data.overview %}

        {% include components/learning-outcomes.html
           box_color=page_data.learning_outcomes.box_color
           title=page_data.learning_outcomes.title
           items=page_data.learning_outcomes.items
        %}
      </div>
    </div>
  </section>

  <!-- Modules - 3 Column Layout -->
  <section class="section bg-gray-50">
    <div class="container-custom">
      <h2 class="text-center text-gray-900 mb-12">Three Progressive Modules</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {% for module in page_data.modules %}
        <div class="card bg-white">
          <!-- Module Header -->
          <div class="p-6 border-b border-gray-200">
            <div class="inline-flex items-center {{ module.badge_color }} {{ module.badge_text_color }} px-3 py-1.5 rounded-full text-sm font-semibold mb-3">
              <span class="w-5 h-5 bg-white {{ module.badge_color | replace: 'bg-', 'text-' }} rounded-full flex items-center justify-center text-xs font-bold mr-1.5">{{ module.number }}</span>
              Module {{ module.number }}
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ module.title }}</h3>
            {% for paragraph in module.description %}
            <p class="text-base text-gray-600 mb-3">
              {{ paragraph }}
            </p>
            {% endfor %}
          </div>

          <!-- Image -->
          <div class="overflow-hidden">
            <img src="{{ module.image | relative_url }}" alt="{{ module.image_alt }}" class="w-full h-48 object-cover">
          </div>

          <!-- Activities -->
          <div class="p-6 border-b border-gray-200">
            <h4 class="text-lg font-bold text-gray-900 mb-3">{{ module.activities.title }}</h4>
            <ul class="space-y-2">
              {% for activity in module.activities.items %}
              <li class="flex items-start space-x-2">
                <span class="{{ module.activities.bullet_color }} text-sm font-bold mt-1">•</span>
                <span class="text-base text-gray-600">{{ activity }}</span>
              </li>
              {% endfor %}
            </ul>
          </div>

          <!-- Skills -->
          <div class="p-6 bg-{{ module.skills.box_color }}-50">
            <h4 class="text-lg font-bold text-gray-900 mb-3">{{ module.skills.title }}</h4>
            <ul class="space-y-1">
              {% for skill in module.skills.items %}
              <li class="flex items-start space-x-2">
                <span class="text-{{ module.skills.box_color }}-600 text-sm font-bold mt-0.5">✓</span>
                <span class="text-base text-gray-700">{{ skill }}</span>
              </li>
              {% endfor %}
            </ul>
          </div>
        </div>
        {% endfor %}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="section {{ page_data.cta.background }} {{ page_data.cta.text_color }}">
    <div class="container-custom">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-white mb-6">{{ page_data.cta.title }}</h2>
        <p class="text-xl text-blue-100 mb-8">
          {{ page_data.cta.description }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="{{ page_data.cta.primary_button.url | relative_url }}" class="btn {{ page_data.cta.primary_button.style }} px-10" {% if page_data.cta.primary_button.url contains 'register' or page_data.cta.primary_button.text contains 'Register' %}target="_blank"{% endif %}>
            {{ page_data.cta.primary_button.text }}
          </a>
          <a href="{{ page_data.cta.tertiary_button.url | relative_url }}" class="btn {{ page_data.cta.tertiary_button.style }} px-10">
            {{ page_data.cta.tertiary_button.text }}
          </a>
          <a href="{{ page_data.cta.secondary_button.url | relative_url }}" class="btn {{ page_data.cta.secondary_button.style }} px-10">
            {{ page_data.cta.secondary_button.text }}
          </a>
        </div>
        <div class="text-center mt-6">
          <a href="{{ '/faq' | relative_url }}" class="text-white hover:text-lego-yellow text-lg font-semibold underline">
            Have questions? Check our FAQ →
          </a>
        </div>
      </div>
    </div>
  </section>
</div>

<!-- Divider -->
<section class="section bg-gray-100 py-12">
  <div class="container-custom">
    <div class="text-center">
      <a href="#summer-camp" class="inline-flex items-center text-lego-blue hover:text-blue-700 font-semibold text-lg">
        <span>Jump to Summer Camp</span>
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </a>
    </div>
  </div>
</section>

<!-- SUMMER CAMP PROGRAM SECTION -->
<div id="summer-camp" class="scroll-mt-20">
  {% assign page_data = site.data.programs.foundations-summer %}

  {% include components/hero-section.html
     badge_text=page_data.program_badge
     badge_color=page_data.badge_color
     badge_text_color=page_data.badge_text_color
     title=page_data.hero.title
     description=page_data.hero.description
     primary_button_text=page_data.hero.primary_button.text
     primary_button_url=page_data.hero.primary_button.url
     secondary_button_text=page_data.hero.secondary_button.text
     secondary_button_url=page_data.hero.secondary_button.url
  %}

  <!-- Program Overview -->
  <section class="section bg-white">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-center text-gray-900 mb-8">Program Overview</h2>

        {% include components/overview-grid.html items=page_data.overview %}

        {% include components/learning-outcomes.html
           box_color=page_data.learning_outcomes.box_color
           title=page_data.learning_outcomes.title
           items=page_data.learning_outcomes.items
        %}
      </div>
    </div>
  </section>

  <!-- Weeks - 2 Column Layout -->
  <section class="section bg-gray-50">
    <div class="container-custom">
      <h2 class="text-center text-gray-900 mb-12">Two Intensive Weeks</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {% for module in page_data.modules %}
        <div class="card bg-white">
          <!-- Week Header -->
          <div class="p-6 border-b border-gray-200">
            <div class="inline-flex items-center {{ module.badge_color }} {{ module.badge_text_color }} px-3 py-1.5 rounded-full text-sm font-semibold mb-3">
              <span class="w-5 h-5 bg-white {{ module.badge_color | replace: 'bg-', 'text-' }} rounded-full flex items-center justify-center text-xs font-bold mr-1.5">{{ module.number }}</span>
              Week {{ module.number }}
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ module.title }}</h3>
            {% for paragraph in module.description %}
            <p class="text-base text-gray-600 mb-3">
              {{ paragraph }}
            </p>
            {% endfor %}
          </div>

          <!-- Image -->
          <div class="overflow-hidden">
            <img src="{{ module.image | relative_url }}" alt="{{ module.image_alt }}" class="w-full h-48 object-cover">
          </div>

          <!-- Activities -->
          <div class="p-6 border-b border-gray-200">
            <h4 class="text-lg font-bold text-gray-900 mb-3">{{ module.activities.title }}</h4>
            <ul class="space-y-2">
              {% for activity in module.activities.items %}
              <li class="flex items-start space-x-2">
                <span class="{{ module.activities.bullet_color }} text-sm font-bold mt-1">•</span>
                <span class="text-base text-gray-600">{{ activity }}</span>
              </li>
              {% endfor %}
            </ul>
          </div>

          <!-- Skills -->
          <div class="p-6 bg-{{ module.skills.box_color }}-50">
            <h4 class="text-lg font-bold text-gray-900 mb-3">{{ module.skills.title }}</h4>
            <ul class="space-y-1">
              {% for skill in module.skills.items %}
              <li class="flex items-start space-x-2">
                <span class="text-{{ module.skills.box_color }}-600 text-sm font-bold mt-0.5">✓</span>
                <span class="text-base text-gray-700">{{ skill }}</span>
              </li>
              {% endfor %}
            </ul>
          </div>
        </div>
        {% endfor %}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="section {{ page_data.cta.background }} {{ page_data.cta.text_color }}">
    <div class="container-custom">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="mb-6">{{ page_data.cta.title }}</h2>
        <p class="text-xl mb-8">
          {{ page_data.cta.description }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="{{ page_data.cta.primary_button.url | relative_url }}" class="btn {{ page_data.cta.primary_button.style }} px-10" {% if page_data.cta.primary_button.url contains 'register' or page_data.cta.primary_button.text contains 'Register' %}target="_blank"{% endif %}>
            {{ page_data.cta.primary_button.text }}
          </a>
          <a href="{{ page_data.cta.secondary_button.url | relative_url }}" class="btn {{ page_data.cta.secondary_button.style }} px-10">
            {{ page_data.cta.secondary_button.text }}
          </a>
        </div>
        <div class="text-center mt-6">
          <a href="{{ '/faq' | relative_url }}" class="hover:text-lego-yellow text-lg font-semibold underline">
            Have questions? Check our FAQ →
          </a>
        </div>
      </div>
    </div>
  </section>
</div>

<!-- Back to Top -->
<section class="section bg-gray-100 py-12">
  <div class="container-custom">
    <div class="text-center">
      <a href="#after-school" class="inline-flex items-center text-lego-blue hover:text-blue-700 font-semibold text-lg">
        <svg class="w-5 h-5 mr-2 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
        <span>Back to After-School Program</span>
      </a>
    </div>
  </div>
</section>
