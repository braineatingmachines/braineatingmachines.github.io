/**
 * Cloudflare Worker for Program Feedback Form
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to Cloudflare Workers dashboard (https://workers.cloudflare.com/)
 * 2. Create a new Worker
 * 3. Copy this code into the worker editor
 * 4. Add your RESEND_API_KEY as an environment variable in the worker settings
 * 5. Deploy the worker
 * 6. Copy the worker URL and update it in assets/js/feedback-form.js
 *
 * Environment Variables needed:
 * - RESEND_API_KEY: Your Resend API key (re_xxxxx)
 */

export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // In production, change this to your domain
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', {
        status: 405,
        headers: corsHeaders,
      });
    }

    try {
      // Parse form data
      const formData = await request.json();

      // Format email content
      const emailHtml = formatEmailHtml(formData);
      const emailText = formatEmailText(formData);

      // Send email via Resend
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Program Feedback <feedback@braineatingmachines.com>',
          to: ['feedback@braineatingmachines.com'],
          subject: 'New Program Feedback Submission',
          html: emailHtml,
          text: emailText,
        }),
      });

      if (!resendResponse.ok) {
        const error = await resendResponse.text();
        console.error('Resend API error:', error);
        throw new Error('Failed to send email');
      }

      // Return success
      return new Response(
        JSON.stringify({ success: true, message: 'Feedback submitted successfully' }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }
  },
};

/**
 * Format form data as HTML email
 */
function formatEmailHtml(data) {
  const formatArray = (arr) => arr && arr.length > 0 ? arr.join(', ') : 'None selected';
  const formatText = (text) => text || 'Not provided';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .header { background: #0055BF; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .section { background: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #0055BF; }
    .section-title { font-size: 20px; font-weight: bold; color: #0055BF; margin-bottom: 15px; }
    .question { margin-bottom: 15px; }
    .question-label { font-weight: bold; color: #4B5563; margin-bottom: 5px; }
    .answer { color: #1F2937; padding-left: 10px; }
    .footer { text-align: center; padding: 20px; color: #6B7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Program Feedback Submission</h1>
      <p>Received: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
    </div>

    <!-- Parent Feedback Section -->
    <div class="section">
      <div class="section-title">📋 Parent Feedback</div>

      <div class="question">
        <div class="question-label">1. Communication satisfaction:</div>
        <div class="answer">${formatText(data.parent_communication)}</div>
      </div>

      <div class="question">
        <div class="question-label">2. Schedule worked well:</div>
        <div class="answer">${formatText(data.parent_schedule)}</div>
      </div>

      <div class="question">
        <div class="question-label">3. Location convenient:</div>
        <div class="answer">${formatText(data.parent_location)}</div>
      </div>

      <div class="question">
        <div class="question-label">4. How did you hear:</div>
        <div class="answer">${formatText(data.parent_hear_about)}${data.parent_hear_about_other ? ': ' + data.parent_hear_about_other : ''}</div>
      </div>

      <div class="question">
        <div class="question-label">5. Child enjoyed:</div>
        <div class="answer">${formatText(data.parent_child_enjoyed)}</div>
      </div>

      <div class="question">
        <div class="question-label">6. Child excited to attend:</div>
        <div class="answer">${formatText(data.parent_child_excited)}</div>
      </div>

      <div class="question">
        <div class="question-label">7. Child talked about it:</div>
        <div class="answer">${formatText(data.parent_child_talked)}</div>
      </div>

      <div class="question">
        <div class="question-label">8. Child felt challenged:</div>
        <div class="answer">${formatText(data.parent_child_challenged)}</div>
      </div>

      <div class="question">
        <div class="question-label">9. Child felt supported:</div>
        <div class="answer">${formatText(data.parent_child_supported)}</div>
      </div>

      <div class="question">
        <div class="question-label">10. Hands-on approach effective:</div>
        <div class="answer">${formatText(data.parent_hands_on)}</div>
      </div>

      <div class="question">
        <div class="question-label">11. What child enjoyed most:</div>
        <div class="answer">${formatText(data.parent_child_enjoyed_most)}</div>
      </div>

      <div class="question">
        <div class="question-label">12. Met expectations:</div>
        <div class="answer">${formatText(data.parent_met_expectations)}</div>
      </div>

      <div class="question">
        <div class="question-label">13. Good value for cost:</div>
        <div class="answer">${formatText(data.parent_good_value)}</div>
      </div>

      <div class="question">
        <div class="question-label">14. Would recommend:</div>
        <div class="answer">${formatText(data.parent_recommend)}</div>
      </div>

      <div class="question">
        <div class="question-label">15. Child wants to continue:</div>
        <div class="answer">${formatText(data.parent_child_continue)}</div>
      </div>

      <div class="question">
        <div class="question-label">16. What hoped to gain:</div>
        <div class="answer">${formatText(data.parent_hoped_to_gain)}</div>
      </div>

      <div class="question">
        <div class="question-label">17. Scheduling preferences:</div>
        <div class="answer">${formatArray(data.parent_scheduling)}${data.parent_scheduling_other ? ': ' + data.parent_scheduling_other : ''}</div>
      </div>

      <div class="question">
        <div class="question-label">18. Additional programs of interest:</div>
        <div class="answer">${formatArray(data.parent_additional_programs)}${data.parent_additional_programs_other ? ': ' + data.parent_additional_programs_other : ''}</div>
      </div>
    </div>

    <!-- Student Feedback Section -->
    <div class="section">
      <div class="section-title">👨‍🎓 Student Feedback</div>

      <div class="question">
        <div class="question-label">1. Enjoyed program:</div>
        <div class="answer">${formatText(data.student_enjoyed)}</div>
      </div>

      <div class="question">
        <div class="question-label">2. Program difficulty:</div>
        <div class="answer">${formatText(data.student_difficulty)}</div>
      </div>

      <div class="question">
        <div class="question-label">3. Favorite parts:</div>
        <div class="answer">${formatArray(data.student_favorite)}${data.student_favorite_other ? ': ' + data.student_favorite_other : ''}</div>
      </div>

      <div class="question">
        <div class="question-label">4. Least favorite part:</div>
        <div class="answer">${formatText(data.student_least_favorite)}${data.student_least_favorite_other ? ': ' + data.student_least_favorite_other : ''}</div>
      </div>

      <div class="question">
        <div class="question-label">5. Learned new things:</div>
        <div class="answer">${formatText(data.student_learned)}</div>
      </div>

      <div class="question">
        <div class="question-label">6. Coolest thing learned:</div>
        <div class="answer">${formatText(data.student_coolest_thing)}</div>
      </div>

      <div class="question">
        <div class="question-label">7. Skills improved:</div>
        <div class="answer">${formatArray(data.student_skills)}</div>
      </div>

      <div class="question">
        <div class="question-label">8. Feel more confident:</div>
        <div class="answer">${formatText(data.student_confident)}</div>
      </div>

      <div class="question">
        <div class="question-label">9. Instructor helped:</div>
        <div class="answer">${formatText(data.student_instructor_helped)}</div>
      </div>

      <div class="question">
        <div class="question-label">10. Instructor explained well:</div>
        <div class="answer">${formatText(data.student_instructor_explained)}</div>
      </div>

      <div class="question">
        <div class="question-label">11. Instructor made it fun:</div>
        <div class="answer">${formatText(data.student_instructor_fun)}</div>
      </div>

      <div class="question">
        <div class="question-label">12. Want to keep learning:</div>
        <div class="answer">${formatText(data.student_keep_learning)}</div>
      </div>

      <div class="question">
        <div class="question-label">13. Would tell friends:</div>
        <div class="answer">${formatText(data.student_tell_friends)}</div>
      </div>

      <div class="question">
        <div class="question-label">14. One thing to add:</div>
        <div class="answer">${formatText(data.student_one_thing)}</div>
      </div>
    </div>

    <!-- Additional Feedback Section -->
    <div class="section">
      <div class="section-title">💭 Additional Feedback</div>

      <div class="question">
        <div class="question-label">Anything else to share:</div>
        <div class="answer">${formatText(data.additional_experience)}</div>
      </div>

      <div class="question">
        <div class="question-label">Suggestions for growth:</div>
        <div class="answer">${formatText(data.additional_suggestions)}</div>
      </div>

      <div class="question">
        <div class="question-label">May use feedback anonymously:</div>
        <div class="answer">${formatText(data.use_feedback)}</div>
      </div>
    </div>

    <!-- Contact Information Section -->
    ${data.contact_name || data.contact_email ? `
    <div class="section">
      <div class="section-title">📧 Contact Information</div>

      <div class="question">
        <div class="question-label">Name:</div>
        <div class="answer">${formatText(data.contact_name)}</div>
      </div>

      <div class="question">
        <div class="question-label">Email:</div>
        <div class="answer">${formatText(data.contact_email)}</div>
      </div>

      <div class="question">
        <div class="question-label">Available for testimonial:</div>
        <div class="answer">${data.contact_testimonial ? 'Yes' : 'No'}</div>
      </div>
    </div>
    ` : ''}

    <div class="footer">
      <p>Brain Eating Machines - Program Feedback</p>
      <p>braineatingmachines.com</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Format form data as plain text email (fallback)
 */
function formatEmailText(data) {
  const formatArray = (arr) => arr && arr.length > 0 ? arr.join(', ') : 'None selected';
  const formatText = (text) => text || 'Not provided';

  return `
NEW PROGRAM FEEDBACK SUBMISSION
Received: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}

═══════════════════════════════════════
PARENT FEEDBACK
═══════════════════════════════════════

1. Communication satisfaction: ${formatText(data.parent_communication)}
2. Schedule worked well: ${formatText(data.parent_schedule)}
3. Location convenient: ${formatText(data.parent_location)}
4. How did you hear: ${formatText(data.parent_hear_about)}${data.parent_hear_about_other ? ': ' + data.parent_hear_about_other : ''}
5. Child enjoyed: ${formatText(data.parent_child_enjoyed)}
6. Child excited to attend: ${formatText(data.parent_child_excited)}
7. Child talked about it: ${formatText(data.parent_child_talked)}
8. Child felt challenged: ${formatText(data.parent_child_challenged)}
9. Child felt supported: ${formatText(data.parent_child_supported)}
10. Hands-on approach effective: ${formatText(data.parent_hands_on)}
11. What child enjoyed most: ${formatText(data.parent_child_enjoyed_most)}
12. Met expectations: ${formatText(data.parent_met_expectations)}
13. Good value for cost: ${formatText(data.parent_good_value)}
14. Would recommend: ${formatText(data.parent_recommend)}
15. Child wants to continue: ${formatText(data.parent_child_continue)}
16. What hoped to gain: ${formatText(data.parent_hoped_to_gain)}
17. Scheduling preferences: ${formatArray(data.parent_scheduling)}${data.parent_scheduling_other ? ': ' + data.parent_scheduling_other : ''}
18. Additional programs: ${formatArray(data.parent_additional_programs)}${data.parent_additional_programs_other ? ': ' + data.parent_additional_programs_other : ''}

═══════════════════════════════════════
STUDENT FEEDBACK
═══════════════════════════════════════

1. Enjoyed program: ${formatText(data.student_enjoyed)}
2. Program difficulty: ${formatText(data.student_difficulty)}
3. Favorite parts: ${formatArray(data.student_favorite)}${data.student_favorite_other ? ': ' + data.student_favorite_other : ''}
4. Least favorite: ${formatText(data.student_least_favorite)}${data.student_least_favorite_other ? ': ' + data.student_least_favorite_other : ''}
5. Learned new things: ${formatText(data.student_learned)}
6. Coolest thing: ${formatText(data.student_coolest_thing)}
7. Skills improved: ${formatArray(data.student_skills)}
8. More confident: ${formatText(data.student_confident)}
9. Instructor helped: ${formatText(data.student_instructor_helped)}
10. Instructor explained: ${formatText(data.student_instructor_explained)}
11. Instructor made fun: ${formatText(data.student_instructor_fun)}
12. Keep learning: ${formatText(data.student_keep_learning)}
13. Tell friends: ${formatText(data.student_tell_friends)}
14. One thing to add: ${formatText(data.student_one_thing)}

═══════════════════════════════════════
ADDITIONAL FEEDBACK
═══════════════════════════════════════

Anything else to share: ${formatText(data.additional_experience)}
Suggestions for growth: ${formatText(data.additional_suggestions)}
May use feedback: ${formatText(data.use_feedback)}

${data.contact_name || data.contact_email ? `
═══════════════════════════════════════
CONTACT INFORMATION
═══════════════════════════════════════

Name: ${formatText(data.contact_name)}
Email: ${formatText(data.contact_email)}
Available for testimonial: ${data.contact_testimonial ? 'Yes' : 'No'}
` : ''}

---
Brain Eating Machines - Program Feedback
braineatingmachines.com
  `;
}
