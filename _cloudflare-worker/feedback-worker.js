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
      const programName = formData.program_participated || 'Unknown Program';
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Program Feedback <onboarding@resend.dev>',
          to: ['feedback@braineatingmachines.com'],
          subject: `Program Feedback: ${programName}`,
          html: emailHtml,
          text: emailText,
          reply_to: 'feedback@braineatingmachines.com',
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
    .program-badge { display: inline-block; background: #FFD700; color: #333; padding: 5px 15px; border-radius: 20px; font-weight: bold; margin-top: 10px; }
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
      <div class="program-badge">${formatText(data.program_participated)}</div>
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
        <div class="question-label">3. Instructor helped and made learning fun:</div>
        <div class="answer">${formatText(data.student_instructor)}</div>
      </div>

      <div class="question">
        <div class="question-label">4. Want to keep learning:</div>
        <div class="answer">${formatText(data.student_keep_learning)}</div>
      </div>

      <div class="question">
        <div class="question-label">5. Would tell friends:</div>
        <div class="answer">${formatText(data.student_tell_friends)}</div>
      </div>

      <div class="question">
        <div class="question-label">6. One thing to add:</div>
        <div class="answer">${formatText(data.student_one_thing)}</div>
      </div>
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
        <div class="question-label">3. How did you hear about us:</div>
        <div class="answer">${formatText(data.parent_hear_about)}${data.parent_hear_about_other ? ': ' + data.parent_hear_about_other : ''}</div>
      </div>

      <div class="question">
        <div class="question-label">4. Met expectations:</div>
        <div class="answer">${formatText(data.parent_met_expectations)}</div>
      </div>

      ${data.parent_expectations_improvement ? `
      <div class="question">
        <div class="question-label">   → How can we improve:</div>
        <div class="answer">${formatText(data.parent_expectations_improvement)}</div>
      </div>
      ` : ''}

      <div class="question">
        <div class="question-label">5. Would recommend:</div>
        <div class="answer">${formatText(data.parent_recommend)}</div>
      </div>

      <div class="question">
        <div class="question-label">6. Additional programs of interest:</div>
        <div class="answer">${formatArray(data.parent_additional_programs)}${data.parent_additional_programs_other ? ': ' + data.parent_additional_programs_other : ''}</div>
      </div>
    </div>

    <!-- Additional Feedback Section -->
    <div class="section">
      <div class="section-title">💭 Additional Feedback</div>

      <div class="question">
        <div class="question-label">7. Additional comments or suggestions:</div>
        <div class="answer">${formatText(data.additional_suggestions)}</div>
      </div>

      <div class="question">
        <div class="question-label">8. May use feedback anonymously:</div>
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
Program: ${formatText(data.program_participated)}

═══════════════════════════════════════
STUDENT FEEDBACK
═══════════════════════════════════════

1. Enjoyed program: ${formatText(data.student_enjoyed)}
2. Program difficulty: ${formatText(data.student_difficulty)}
3. Instructor helped and made learning fun: ${formatText(data.student_instructor)}
4. Want to keep learning: ${formatText(data.student_keep_learning)}
5. Would tell friends: ${formatText(data.student_tell_friends)}
6. One thing to add: ${formatText(data.student_one_thing)}

═══════════════════════════════════════
PARENT FEEDBACK
═══════════════════════════════════════

1. Communication satisfaction: ${formatText(data.parent_communication)}
2. Schedule worked well: ${formatText(data.parent_schedule)}
3. How did you hear about us: ${formatText(data.parent_hear_about)}${data.parent_hear_about_other ? ': ' + data.parent_hear_about_other : ''}
4. Met expectations: ${formatText(data.parent_met_expectations)}${data.parent_expectations_improvement ? '\n   → How can we improve: ' + data.parent_expectations_improvement : ''}
5. Would recommend: ${formatText(data.parent_recommend)}
6. Additional programs of interest: ${formatArray(data.parent_additional_programs)}${data.parent_additional_programs_other ? ': ' + data.parent_additional_programs_other : ''}

═══════════════════════════════════════
ADDITIONAL FEEDBACK
═══════════════════════════════════════

7. Additional comments or suggestions: ${formatText(data.additional_suggestions)}
8. May use feedback anonymously: ${formatText(data.use_feedback)}

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
