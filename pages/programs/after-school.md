---
layout: page
title: Foundations of Robotics - After-School
description: Learn robotics fundamentals through our 15-session after-school program
permalink: /after-school/
custom_layout: true
---

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

<!-- Modules -->
{% for module in page_data.modules %}
  {% include components/module-section.html
     module_number=module.number
     badge_color=module.badge_color
     badge_text_color=module.badge_text_color
     badge_text=module.badge_text
     title=module.title
     image_url=module.image
     image_alt=module.image_alt
     image_position=module.image_position
     background=module.background
     description=module.description
     activities_title=module.activities.title
     activities_bullet_color=module.activities.bullet_color
     activities=module.activities.items
     skills_box_color=module.skills.box_color
     skills_title=module.skills.title
     skills=module.skills.items
  %}
{% endfor %}

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
