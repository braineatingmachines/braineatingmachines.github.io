---
layout: page
title: Student Resources
description: Access your robotics course materials and learning resources
permalink: /for-students/
custom_layout: true
---

<!-- Hero Section -->
<section class="section bg-gradient-to-br from-lego-blue to-blue-700">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">Student Resources</h1>
      <p class="text-xl text-blue-100 mb-8">
        Welcome! Here you'll find all the course materials, guides, and resources you need for your robotics journey.
      </p>
    </div>
  </div>
</section>

<!-- Learning Pathway Overview -->
<section class="section bg-white">
  <div class="container-custom">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-gray-900 mb-4">Your Learning Path</h2>
        <p class="text-lg text-gray-600">
          Follow the path below to build your robotics skills from the ground up
        </p>
      </div>

      <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
        <img src="{{ '/assets/img/foundation-of-robotics.png' | relative_url }}"
             alt="Robotics Learning Pathway"
             class="w-full h-auto rounded-lg shadow-lg">
      </div>
    </div>
  </div>
</section>

<!-- Foundations of Robotics Modules -->
<section class="section bg-gray-50">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <div class="inline-block bg-lego-blue text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
          LEVEL 1
        </div>
        <h2 class="text-gray-900 mb-4">Foundations of Robotics</h2>
        <p class="text-lg text-gray-600">
          Master the basics of robot building, movement, and sensor programming
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Module 1 -->
        <div class="card bg-white hover:shadow-xl transition-shadow duration-300">
          <div class="p-6">
            <div class="flex items-center space-x-3 mb-4">
              <span class="inline-block w-12 h-12 bg-lego-red rounded-full flex-shrink-0 text-white text-lg font-bold flex items-center justify-center">1</span>
              <h3 class="text-xl font-bold text-gray-900">Module 1</h3>
            </div>
            <h4 class="font-semibold text-gray-900 mb-2">Building & Movement</h4>
            <p class="text-sm text-gray-600 mb-6">
              Robot assembly, basic programming, and precise movement control
            </p>
            <a href="{{ '/classroom/foundations_of_robotics_module_1.pdf' | relative_url }}"
               class="btn btn-primary w-full text-center"
               target="_blank">
              Open Module 1 Guide
            </a>
          </div>
        </div>

        <!-- Module 2 -->
        <div class="card bg-white hover:shadow-xl transition-shadow duration-300">
          <div class="p-6">
            <div class="flex items-center space-x-3 mb-4">
              <span class="inline-block w-12 h-12 bg-lego-yellow rounded-full flex-shrink-0 text-gray-900 text-lg font-bold flex items-center justify-center">2</span>
              <h3 class="text-xl font-bold text-gray-900">Module 2</h3>
            </div>
            <h4 class="font-semibold text-gray-900 mb-2">Sensors & Navigation</h4>
            <p class="text-sm text-gray-600 mb-6">
              Distance and color sensors, autonomous navigation, obstacle avoidance
            </p>
            <a href="{{ '/classroom/foundations_of_robotics_module_2.pdf' | relative_url }}"
               class="btn btn-secondary w-full text-center opacity-50 cursor-not-allowed"
               onclick="return false;">
              Coming Soon
            </a>
          </div>
        </div>

        <!-- Module 3 -->
        <div class="card bg-white hover:shadow-xl transition-shadow duration-300">
          <div class="p-6">
            <div class="flex items-center space-x-3 mb-4">
              <span class="inline-block w-12 h-12 bg-lego-blue rounded-full flex-shrink-0 text-white text-lg font-bold flex items-center justify-center">3</span>
              <h3 class="text-xl font-bold text-gray-900">Module 3</h3>
            </div>
            <h4 class="font-semibold text-gray-900 mb-2">Advanced Integration</h4>
            <p class="text-sm text-gray-600 mb-6">
              Multi-sensor programming, complex challenges, final showcase project
            </p>
            <a href="{{ '/classroom/foundations_of_robotics_module_3.pdf' | relative_url }}"
               class="btn btn-secondary w-full text-center opacity-50 cursor-not-allowed"
               onclick="return false;">
              Coming Soon
            </a>
          </div>
        </div>
      </div>

      <div class="mt-8 bg-blue-50 border-l-4 border-lego-blue p-6 rounded-r-lg">
        <p class="text-gray-700">
          <strong>Note:</strong> These modules are taught in both our After-School program (15 weekly sessions)
          and Summer Camp (2-week intensive format). The curriculum is the same - choose the schedule that works best for you!
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Next Steps Section -->
<section class="section bg-white">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-gray-900 mb-4">What's Next?</h2>
        <p class="text-lg text-gray-600">
          Continue your robotics journey with these advanced programs
        </p>
      </div>

      <div class="space-y-6">
        <!-- Competitive Robotics -->
        <div class="card bg-gradient-to-br from-red-50 to-red-100 border-2 border-lego-red">
          <div class="p-8">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <span class="inline-block px-4 py-2 bg-lego-red text-white rounded-full text-sm font-semibold">
                  LEVEL 2
                </span>
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-gray-900 mb-3">Competitive Robotics</h3>
                <p class="text-gray-700 mb-4">
                  Ready to compete? Join a team and participate in FIRST LEGO League challenges.
                  Design, build, and program robots to solve real-world problems alongside teammates.
                </p>
                <a href="{{ '/competitive-robotics' | relative_url }}" class="btn btn-primary">
                  Learn More About Competition Teams
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Advanced Robotics -->
        <div class="card bg-gradient-to-br from-green-50 to-green-100 border-2 border-lego-green">
          <div class="p-8">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <span class="inline-block px-4 py-2 bg-lego-green text-white rounded-full text-sm font-semibold">
                  LEVEL 3
                </span>
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-gray-900 mb-3">Advanced Robotics</h3>
                <p class="text-gray-700 mb-4">
                  Level up to professional tools! Learn electronics, 3D modeling, and real programming languages
                  (C++ and Python). Build robots from scratch just like the pros.
                </p>
                <a href="{{ '/advanced-robotics' | relative_url }}" class="btn btn-primary">
                  Explore Advanced Robotics
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- High School Robotics -->
        <div class="card bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-600">
          <div class="p-8">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <span class="inline-block px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold">
                  LEVEL 4
                </span>
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-gray-900 mb-3">High School Robotics</h3>
                <p class="text-gray-700 mb-4">
                  Join your high school's FIRST Robotics Competition (FRC) or FIRST Tech Challenge (FTC) team.
                  Apply all the skills you've learned in competitive high school robotics programs.
                </p>
                <div class="flex gap-4">
                  <a href="https://www.firstinspires.org/robotics/frc" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                    Learn About FRC
                  </a>
                  <a href="https://www.firstinspires.org/robotics/ftc" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                    Learn About FTC
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Help Section -->
<section class="section bg-gray-50">
  <div class="container-custom">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-gray-900 mb-6">Need Help?</h2>
      <p class="text-lg text-gray-600 mb-8">
        If you have questions about your course materials or need support, don't hesitate to reach out!
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="{{ '/contact' | relative_url }}" class="btn btn-primary px-8">
          Contact Your Instructor
        </a>
        <a href="{{ '/faq' | relative_url }}" class="btn btn-secondary px-8">
          View FAQ
        </a>
      </div>
    </div>
  </div>
</section>
