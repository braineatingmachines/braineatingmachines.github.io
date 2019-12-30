---
layout: page
title: Register
subtitle: Registrations Open!
---

## Prerequisite

 * Bring your own laptop (Mac, Windows or Chromebook), with WiFi capability, internet connection will be provided.
 * Well versed with using the laptop keyboard and mouse without assistance.
 * Have active regular USB ports on the laptop. New MacBooks with USB-C only will need dongles.

## Registration Form

If you have more than one child you want to enroll, please refill the form again for them.

After registering your child, Venmo the fees to confirm a seat for the session, and mention the email id you used to register.


<form id="fs-frm" name="registration-form" accept-charset="utf-8" action="https://formspree.io/register@braineatingmachines.com" method="post" class="form">
    <div class="form-group">
      <label for="track">Which class are you registering for ?</label>
      <select class="form-control input-lg" name="track" id="track" required="">
        <option value="101" selected="">101 - Robotics</option>
        <option value="102">102 - 3D Modeling</option>
        <option value="103">103 - Programming</option>
      </select>
    </div>
    <div class="form-group">
      <label for="student-full-name">Student Full Name</label>
      <input class="form-control input-lg" type="text" name="student_name" id="student-full-name" placeholder="First and Last" required="">
    </div>

    <div class="form-group">
      <label for="parent-full-name">Parent Full Name</label>
      <input class="form-control input-lg" type="text" name="parent_name" id="parent-full-name" placeholder="First and Last" required="">
    </div>
    <div class="form-group">
      <label for="email-address">Email Address</label>
      <input class="form-control input-lg" type="email" name="_replyto" id="email-address" placeholder="email@domain.tld" required="">
    </div>
    <div class="form-group">
      <label for="phone">Phone</label>
      <input class="form-control input-lg" type="telephone" name="phone" id="phone" placeholder="(555) 555-5555" required="">
    </div>
    <div class="form-group">
      <label for="town">Town</label>
      <input class="form-control input-lg" type="text" name="town" id="town" placeholder="Glen Rock" required="">
    </div>
    <div class="form-group">
      <label for="school">School</label>
      <input class="form-control input-lg" type="text" name="school" id="school" placeholder="Coleman Elementary School, Glen Rock" required="">
    </div>
    <div class="form-group">
      <label for="grade">Grade</label>
      <select class="form-control input-lg" name="grade" id="grade" required="">
        <option value="2" selected="">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>

    <div class="form-group">
      <p><label for="worked">Has your child worked with any of these ?</label> </p>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="arduino" id="arduino" value="arduino">
        <label class="form-check-label" for="arduino">Arduino</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="Blockly" id="Blockly" value="Blockly">
        <label class="form-check-label" for="Blockly">Blockly</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="Code_org" id="Code_org" value="Code.org">
        <label class="form-check-label" for="Code_org">Code.org (Hour of Code)</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="Dot_Dash" id="Dot_Dash" value="Dot_Dash">
        <label class="form-check-label" for="Dot_Dash">Dot & Dash</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="Khan_Academy" id="Khan_Academy" value="Khan Academy">
        <label class="form-check-label" for="Khan_Academy">Khan Academy (Programming)</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="Lego" id="Lego" value="Lego">
        <label class="form-check-label" for="Lego">Lego Mindstorm</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="MakeCode" id="MakeCode" value="MakeCode">
        <label class="form-check-label" for="MakeCode">MakeCode</label>
      </div>      
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="microbit" id="microbit" value="microbit">
        <label class="form-check-label" for="microbit">micro:bit</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="Raspberry_Pi" id="Raspberry_Pi" value="Raspberry_Pi">
        <label class="form-check-label" for="Raspberry_Pi">Raspberry Pi</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="Scratch" id="Scratch" value="Scratch">
        <label class="form-check-label" for="Scratch">Scratch</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="other" id="other" value="other">
        <label class="form-check-label" for="other">Other</label><input class="form-control input-lg" type="text" name="other" id="other" placeholder="Other">
      </div>

    </div>
    <div class="form-group">
      <label for="why">Why does your child want to enroll in this class ?</label>
      <textarea class="form-control input-lg" rows="5" name="why" id="why" placeholder="Their interest in particular topics will help shape us the class accordingly."></textarea>
      <small id="whyHelpBlock" class="form-text text-muted">
        Their interest in particular topics will help shape us the class accordingly.
      </small>
    </div>
    <div class="form-group">
      <label for="questions">Questions or Comments</label>
      <textarea class="form-control input-lg" rows="5" name="questions" id="questions" placeholder="Any questions regarding the program ?"></textarea>
    </div>
    <input class="form-control input-lg" type="hidden" name="_subject" id="email-subject" value="Registration Form Submission">
  <button class="btn btn-lg btn-primary" type="submit">Register</button>
</form>
