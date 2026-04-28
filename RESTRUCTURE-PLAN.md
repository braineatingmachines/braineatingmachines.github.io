# Plan: Two-Arm Website Restructure — Programs + Platform

## Context
BEM has two distinct arms:
- **Programs** — BEM-delivered courses (Spark.AI, Foundations, FLL, Advanced Robotics). Audience: parents enrolling students, schools inviting BEM in.
- **Products/Platform** — the software ecosystem (Spark.AI LMS + XRP coding platform) that schools license to deploy themselves. Audience: IT admins, teachers, curriculum builders.

The current site conflates these. Visitors who want to enroll a child and visitors who want to license a platform hit the same pages with no clear routing. Goal: clean segregation, intuitive design, full homepage redesign, no verbosity.

Scope: **Full redesign** — new homepage structure, new nav, new platform page, Partner With Us split into two distinct pages, visible cross-link from Spark.AI program page to platform.

---

## Platform Name (decide before Phase 3)

The platform merges the Spark.AI LMS and the XRP Coding Platform into one institutional product. Name options:

| Name | Feel | Tagline idea |
|---|---|---|
| **Forge** | Tactile, craft, building | "Where AI and robotics skills are built" |
| **Nexus** | Ecosystem hub, connected | "The hub for next-gen STEM education" |
| **Kernel** | Technical, infrastructure, depth | "The core of AI and robotics education" |
| **Lattice** | Structured, scalable, modular | "Modular STEM education infrastructure" |
| **Arc** | Forward-motion, curriculum arc | "The complete arc from beginner to builder" |

**Recommendation: Forge** — resonates with both AI (algorithms forged from data) and robotics (physical making), avoids corporate blandness, and is unused in edtech.

---

## New Site Architecture

```
Homepage (redesigned - two entry forks)
├── Programs (audience: parents/students)
│   ├── /spark.ai           — Spark.AI program page (+ cross-link to Platform)
│   ├── /foundations-of-robotics
│   ├── /competitive-robotics
│   └── /advanced-robotics
├── Partner With Us (audience: institutional)
│   ├── /partner-with-us    — Bring Our Programs (BEM-staffed, revised scope)
│   └── /platform           — License the Platform (NEW, self-deploy)
├── /schedule
├── /news
└── About▾
    ├── /about
    ├── /careers
    ├── /faq
    └── /contact
```

---

## Phase 1 — Nav Restructure (`_config.yml`)

**Current:**
```
Programs▾ | Schedule | Partner With Us | News | About▾
```

**New:**
```
Programs▾ | Partner With Us▾ | Schedule | News | About▾
```

`Programs▾` dropdown:
- Spark.AI
- Foundations of Robotics
- Competitive Robotics (FLL)
- Advanced Robotics

`Partner With Us▾` dropdown:
- Bring Our Programs  →  /partner-with-us
- License the Platform  →  /platform

Keep "Partner With Us" as a standalone top-level nav item. The dropdown explains the two paths. Partnering is not just with Schools, but also with Club, or Community Organization?

---

## Phase 2 — Homepage Full Redesign

The homepage becomes a clean routing surface. Every section maps to one or both audiences.

### New section order (`_layouts/home.html`):

```
home-featured-news.html     (keep as-is)
home-hero.html              (REDESIGNED — fork)
home-programs-overview.html (NEW — 4 program cards, compact)
home-spark-ai.html          (keep, already good)
home-why-robotics.html      (keep)
home-partner.html           (REDESIGNED - fork)
home-blog-preview.html      (keep)
```

Remove from layout: `home-what-students-learn.html` (detail belongs on program pages, not homepage), `home-programs.html` (replaced by compact overview).

### `home-hero.html` — full redesign

Two-fork hero: Programs path left, For Schools path right.

```
┌─────────────────────────────────────────────────────┐
│           Brain Eating Machines                      │
│     AI and Robotics Education for Every Learner      │
├────────────────────┬────────────────────────────────┤
│   PROGRAMS         │   FOR SCHOOLS                  │
│                    │                                │
│  Enroll in Spark.AI│  Bring programs to your        │
│  or one of our     │  school, or deploy the         │
│  robotics programs │  platform your teachers use    │
│                    │                                │
│  [Explore Programs]│  [For Schools & Institutions]  │
└────────────────────┴────────────────────────────────┘
```

Mobile: stacks vertically, Programs first.

### `home-programs-overview.html` — NEW

4 compact cards in a grid. Each card: program name, grade badge, one-line description, Learn More link. No long descriptions — those live on program pages.

```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Spark.AI │ │Foundations│ │  FLL     │ │ Advanced │
│ Gr 6-10  │ │ Gr 4-8   │ │ Gr 4-8   │ │ Gr 8-9   │
│ [Learn→] │ │ [Learn→] │ │ [Learn→] │ │ [Learn→] │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

### `home-partner.html` — UPDATE (home-partner.html)

Two-column section with a distinct background (dark or gray). Clear visual break from the Programs section above.

```
┌─────────────────────────────────────────────────────┐
│  For Schools, Clubs & Institutions                         │
├──────────────────────────┬──────────────────────────┤
│  BRING OUR PROGRAMS      │  LICENSE THE PLATFORM    │
│                          │                          │
│  Want BEM instructors to │  Want your teachers to   │
│  run Spark.AI or robotics│  deliver AI and robotics │
│  at your school?         │  using our tools?        │
│                          │                          │
│  [Partner With Us →]     │  [Explore the Platform→] │
└──────────────────────────┴──────────────────────────┘
```

---

## Phase 3 — New Platform Page (`/pages/for/platform.html`)

**Permalink:** `/platform/`  
**Audience:** IT admins, teachers, curriculum builders  
**Layout:** `page` with `custom_layout: true` and new `custom_css: platform`

### Page sections:
1. **Hero** — "Deploy AI and Robotics Education at Your Institution" — clean, enterprise tone. Grade range, licensing model, support CTA.
2. **What's included** — two components: Spark.AI notebook ecosystem + XRP Coding Platform. What each delivers.
3. **For Teachers** — what the teacher experience looks like: pre-built curricula, student/teacher notebook versions, daily exit tickets, progress visibility.
4. **For IT/Admins** — deployment: runs in the browser (Google Colab), no infra to manage, single sign-on options, school-wide rollout.
5. **How it connects to Programs** — brief note: "Already running Spark.AI programs? This is the same platform your students use."
6. **CTA** — Request a demo / Contact for licensing (links to contact or consultation page).

**Visual language:** Cleaner, more enterprise than program pages. Less LEGO color palette, more neutral with accent color.

---

## Phase 4 — Partner With Us Revision (`/pages/for/partner-with-us.md`)

Scope narrows: now exclusively "Bring Our Programs to Your School."

- Audience: PTAs, HSAs, school admins, after-school coordinators
- Offering: BEM instructors come to your location and run programs (Spark.AI, Foundations, FLL, Advanced)
- Keep the consultation CTA
- Remove any platform/licensing language (that moves to /platform)
- Update hero badge from "PTAs, HSAs, School Administrators" — keep this, it's right

**No URL change** — `/partner-with-us/` stays. SEO preserved.

---

## Phase 5 — Spark.AI Program Cross-Link (`/pages/programs/spark-ai.html`)

Add a visible callout block between the "How it's Delivered" section and the final CTA:

```
┌─────────────────────────────────────────────────────┐
│  Are you a school, teacher, or curriculum builder?  │
│                                                     │
│  The Spark.AI program runs on our learning          │
│  platform — the same notebooks, tools, and          │
│  progress tracking are available for schools        │
│  to deploy independently.                           │
│                                                     │
│  [Explore the Platform →]                           │
└─────────────────────────────────────────────────────┘
```
Add a note, we can integrate with leading Learning Management Systems out there, like Canvas, Moodle to name a few.

Use the existing `ai-cta-block` CSS class or a new styled aside. Blue accent, not the primary CTA color (that's reserved for enrollment).

---

## Phase 6 — Footer Update (`_includes/footer.html`)

Add a "Partner with Us" column (or rename "Programs" to two sub-columns):

**Programs column:** Spark.AI | Foundations | FLL | Advanced Robotics  
**Partner with Us:** Bring Our Programs | License the Platform  

Update copyright tagline if platform name is decided.

---

## Files Summary

| Action | File |
|---|---|
| Modify | `_config.yml` — nav restructure |
| Modify | `_layouts/home.html` — new section order |
| Rewrite | `_includes/sections/home-hero.html` — two-fork design |
| Create | `_includes/sections/home-programs-overview.html` — 4 compact cards |
| Create | `_includes/sections/partner-with-us.html` — institutional two-column |
| Delete from layout | `home-what-students-learn.html`, `home-programs.html`, `home-partner.html` |
| Create | `pages/for/platform.html` — new platform product page |
| Create | `assets/css/platform.css` — platform page styles |
| Modify | `pages/for/partner-with-us.md` — narrow scope to program and platform partnership |
| Modify | `pages/programs/spark-ai.html` — add cross-link callout |
| Modify | `_includes/footer.html` — add For Schools column |

## Verification
1. `docker compose up` — confirm site builds
2. Homepage: hero forks correctly on desktop (two columns) and mobile (stacked)
3. Nav: "For Schools" dropdown shows two items
4. `/platform/` loads with enterprise-tone content, no LEGO-heavy styling
5. `/partner-with-us/` is now program-partnership only, no platform language
6. `/spark.ai/` has visible cross-link callout to `/platform/`
7. Footer has For Schools links
8. All existing program page URLs unchanged (SEO preserved)
