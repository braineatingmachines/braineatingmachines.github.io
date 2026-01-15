# Codebase Organization Improvement Plan

**Date:** January 2026
**Status:** Proposed
**Priority:** Medium (improves maintainability, no urgent issues)

---

## Executive Summary

Your Jekyll site is currently functional but has **31 pages in the root directory**, creating clutter and making maintenance harder as the site grows. This plan reorganizes files into logical subdirectories **without breaking any URLs** using Jekyll's `permalink` feature.

---

## ✅ Can Pages Be Moved Without Breaking URLs?

**YES!** Jekyll's `permalink` feature allows you to:
- Organize files in subdirectories for better management
- Keep URLs exactly the same for users and SEO
- Maintain all existing links and bookmarks

**Example:**
```yaml
# File: pages/programs/competitive-robotics.md
---
permalink: /competitive-robotics/
---
```
This page lives in `pages/programs/` but still appears at `braineatingmachines.com/competitive-robotics/`

---

## 📊 Current State Analysis

### Root Directory Clutter (31 files)
```
Root/
├── 22 markdown pages (.md) - content scattered
├── 9 HTML pages (.html) - mixed purposes
├── 3 documentation files (.md) - internal use
└── Config files (Gemfile, package.json, etc.)
```

### Issues Identified

**🔴 High Priority:**
1. **Root clutter** - 31 files make it hard to find content
2. **No logical grouping** - Programs, policies, and utilities mixed together
3. **Test files in production** - `output-test.css`, `output-test2.css`
4. **Backup files** - `home.html.backup` in layouts

**🟡 Medium Priority:**
5. **Inconsistent file types** - Some pages are .html, others .md (no clear reason)
6. **Documentation mixed with content** - Internal docs at root level
7. **Image organization** - Random images at root of assets/img/

**🟢 Low Priority:**
8. **Naming conventions** - Could be more consistent (kebab-case vs snake_case)

---

## 🎯 Proposed Organization Structure

### New Directory Layout

```
braineatingmachines.github.io/
│
├── /pages/                           # All content pages (NEW)
│   ├── /programs/                    # Program pages
│   │   ├── foundations-of-robotics.md
│   │   ├── competitive-robotics.md
│   │   ├── advanced-robotics.md
│   │   ├── after-school.md
│   │   └── summer-camp.md
│   │
│   ├── /info/                        # Informational pages
│   │   ├── about.md
│   │   ├── contact.md
│   │   ├── faq.md
│   │   ├── careers.md
│   │   └── summer-camp-guide.md
│   │
│   ├── /for/                         # Audience-specific pages
│   │   ├── for-schools.md
│   │   ├── for-teachers.md
│   │   └── for-students.md
│   │
│   ├── /legal/                       # Legal/policy pages
│   │   ├── policies.md
│   │   ├── privacy.md
│   │   ├── terms.md
│   │   └── camp-policy.md
│   │
│   ├── /registration/                # Registration-related
│   │   ├── register.md
│   │   ├── registration-help.html
│   │   ├── registration-confirmation.md
│   │   ├── waitlist.md
│   │   ├── program-feedback.html
│   │   └── program-feedback-thank-you.html
│   │
│   └── /utility/                     # Special pages
│       ├── schedule.html
│       ├── blog.html
│       └── 404.html
│
├── /docs/                            # Internal documentation (NEW)
│   ├── README.md
│   ├── ACCESSIBILITY_TODO.md
│   ├── OPTIMIZATION_SUMMARY.md
│   └── FEEDBACK-FORM-SETUP.md
│
├── /assets/
│   ├── /css/
│   │   ├── main.css
│   │   ├── output.css
│   │   ├── schedule.css
│   │   └── feedback-form.css
│   │   # REMOVE: output-test.css, output-test2.css
│   │
│   ├── /js/
│   │   ├── main.js
│   │   ├── schedule.js
│   │   └── feedback-form.js
│   │
│   └── /img/
│       ├── /programs/                # Program-specific images
│       │   ├── /ootm/
│       │   ├── /pre-lego/
│       │   ├── /foundations/
│       │   ├── /competitive/
│       │   └── /advanced/
│       │
│       ├── /ui/                      # UI elements
│       │   ├── hero.jpg
│       │   ├── logos/
│       │   └── backgrounds/
│       │
│       └── /guides/                  # Screenshots, guides
│           └── registration-flow/
│
├── /classroom/                       # PDF resources
│   ├── foundations_of_robotics_module_1.pdf
│   └── student-contract.pdf
│
├── /_cloudflare-worker/            # External integrations
│   ├── feedback-worker.js
│   └── README.md
│
├── /_includes/                      # Reusable components
│   ├── footer.html
│   ├── navigation.html
│   ├── /components/                # UI components
│   ├── /sections/                  # Page sections
│   └── /icons/                     # SVG icons
│
├── /_layouts/                       # Templates
│   ├── default.html
│   ├── page.html
│   ├── post.html
│   └── home.html
│   # REMOVE: home.html.backup
│
├── /_posts/                        # Blog posts
│   └── YYYY-MM-DD-title.md
│
├── /_data/                         # Data files
│   ├── defaults.yml
│   ├── images.yml
│   ├── schedules.yml
│   └── /programs/
│
├── /backups/                       # Archive (NEW)
│   └── home.html.backup
│
├── index.md                        # Homepage (stays at root)
├── feed.xml                        # RSS feed (stays at root)
├── _config.yml
├── tailwind.config.js
├── Gemfile
└── package.json
```

---

## 🔄 Migration Plan (3 Phases)

### Phase 1: Cleanup (Low Risk) - 30 minutes

**Remove unnecessary files:**
```bash
# Test CSS files
rm assets/css/output-test.css
rm assets/css/output-test2.css

# Backup layouts
mkdir -p backups
mv _layouts/home.html.backup backups/

# Create docs folder
mkdir -p docs
mv ACCESSIBILITY_TODO.md docs/
mv OPTIMIZATION_SUMMARY.md docs/
mv FEEDBACK-FORM-SETUP.md docs/
```

**Result:** Cleaner root, no URL changes

---

### Phase 2: Create New Directory Structure (Low Risk) - 1 hour

**Create new folders:**
```bash
mkdir -p pages/{programs,info,for,legal,registration,utility}
mkdir -p assets/img/{programs,ui,guides}
```

**Update _config.yml to recognize pages directory:**
```yaml
# Add to _config.yml
collections:
  pages:
    output: true
    permalink: /:path/

# Or use defaults
defaults:
  - scope:
      path: "pages"
    values:
      layout: "page"
```

**Result:** Folders ready, no content moved yet

---

### Phase 3: Move Pages (Requires Testing) - 2-3 hours

**Move files with permalink preservation:**

Each file gets a `permalink` to maintain URL:

```yaml
# Example: pages/programs/competitive-robotics.md
---
layout: page
title: Competitive Robotics
permalink: /competitive-robotics/  # URL stays the same!
---
```

**Migration order:**

1. **Programs** (6 files)
   ```bash
   mv competitive-robotics.md pages/programs/
   mv advanced-robotics.md pages/programs/
   mv foundations-of-robotics.md pages/programs/
   mv after-school.md pages/programs/
   mv summer-camp.md pages/programs/
   mv summer-camp-guide.md pages/info/
   ```

2. **Info pages** (5 files)
   ```bash
   mv about.md pages/info/
   mv contact.md pages/info/
   mv faq.md pages/info/
   mv careers.md pages/info/
   ```

3. **For-audience pages** (3 files)
   ```bash
   mv for-schools.md pages/for/
   mv for-teachers.md pages/for/
   mv for-students.md pages/for/
   ```

4. **Legal pages** (4 files)
   ```bash
   mv policies.md pages/legal/
   mv privacy.md pages/legal/
   mv terms.md pages/legal/
   mv camp-policy.md pages/legal/
   ```

5. **Registration pages** (6 files)
   ```bash
   mv register.md pages/registration/
   mv registration-help.html pages/registration/
   mv registration-confirmation.md pages/registration/
   mv waitlist.md pages/registration/
   mv program-feedback.html pages/registration/
   mv program-feedback-thank-you.html pages/registration/
   ```

6. **Utility pages** (3 files)
   ```bash
   mv schedule.html pages/utility/
   mv blog.html pages/utility/
   mv 404.html pages/utility/
   ```

**After each move:**
- Verify permalink is set
- Build and test locally
- Check that URL still works

---

## 🧪 Testing Checklist

After moving files, verify:

- [ ] All URLs still work (check sitemap)
- [ ] Navigation links work
- [ ] Internal page links work
- [ ] Blog post links work
- [ ] Schedule page loads
- [ ] Contact form submits
- [ ] Feedback form submits
- [ ] 404 page works
- [ ] RSS feed generates
- [ ] Search engines can crawl (robots.txt)

**Test locally:**
```bash
bundle exec jekyll build
bundle exec jekyll serve
# Visit http://localhost:4000 and click through all pages
```

---

## 📈 Benefits of This Reorganization

1. **Easier to find files** - Logical grouping by purpose
2. **Better maintainability** - Clear structure for new team members
3. **Scalability** - Easy to add new programs or pages
4. **Professional** - Industry-standard Jekyll organization
5. **No URL changes** - SEO and bookmarks preserved
6. **Faster development** - Less time searching for files

---

## ⚠️ Risks & Mitigation

| Risk | Mitigation |
|------|------------|
| Broken internal links | Test all navigation and links after migration |
| Missing permalinks | Use checklist, verify each file has permalink |
| Build failures | Move files one category at a time, test after each |
| Git history loss | Files tracked through git mv, not rm/add |
| Deployment issues | Test on staging branch first |

---

## 🚀 Recommended Approach

### Option A: Full Migration (Recommended)
- **Time:** 3-4 hours
- **Risk:** Low (with testing)
- **Benefit:** Complete organization improvement
- **When:** Next maintenance window

### Option B: Incremental Migration
- **Time:** 30 min per phase over 3 weeks
- **Risk:** Very low
- **Benefit:** Gradual improvement, easy to revert
- **When:** Ongoing during regular updates

### Option C: Cleanup Only (Minimum)
- **Time:** 30 minutes
- **Risk:** None
- **Benefit:** Quick win, reduces clutter
- **When:** Immediately

---

## 📋 Implementation Commands

Here's a complete script for Phase 1 (Cleanup):

```bash
#!/bin/bash
# cleanup.sh - Phase 1: Remove clutter

echo "🧹 Phase 1: Cleanup"

# Create directories
mkdir -p backups
mkdir -p docs

# Move documentation
mv ACCESSIBILITY_TODO.md docs/ 2>/dev/null || echo "ACCESSIBILITY_TODO.md not found"
mv OPTIMIZATION_SUMMARY.md docs/ 2>/dev/null || echo "OPTIMIZATION_SUMMARY.md not found"
mv FEEDBACK-FORM-SETUP.md docs/ 2>/dev/null || echo "FEEDBACK-FORM-SETUP.md not found"

# Move backups
mv _layouts/home.html.backup backups/ 2>/dev/null || echo "Backup file not found"

# Remove test files
rm -f assets/css/output-test.css
rm -f assets/css/output-test2.css

echo "✅ Cleanup complete!"
echo "📊 Files moved to /docs/ and /backups/"
echo "🗑️  Test CSS files removed"
```

---

## 🎓 Jekyll Permalink Reference

Common permalink patterns:

```yaml
# Keep exact current URL
permalink: /competitive-robotics/

# Date-based (for blogs)
permalink: /blog/:year/:month/:day/:title/

# Category-based
permalink: /:categories/:title/

# Custom structure
permalink: /programs/:title/
```

**Important:** All existing pages should use explicit permalinks during migration to avoid any URL changes.

---

## 📞 Questions Before Starting?

Before implementing this plan, consider:

1. **Do you want to maintain current URLs?** (Recommended: YES)
2. **Are there any pages you want to deprecate?**
3. **Should we add redirects for any old URLs?**
4. **Do you have a staging/test environment?**
5. **What's your preferred timeline?** (Incremental vs. full migration)

---

## 🏁 Next Steps

**To proceed:**

1. **Review this plan** - Ensure it fits your needs
2. **Choose approach** - Full migration, incremental, or cleanup only
3. **Set timeline** - When to start implementation
4. **Backup current site** - Git commit before starting
5. **Create test branch** - Implement on branch first
6. **Test thoroughly** - Use checklist above
7. **Deploy** - Merge to main when confident

---

**Questions or ready to start?** Let me know which approach you prefer, and I can begin implementation!

---

**Document Version:** 1.0
**Last Updated:** January 13, 2026
**Author:** Claude (AI Assistant)
