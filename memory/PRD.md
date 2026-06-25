# NEXXTECHS - IT Education Institute Website

## Problem Statement
Build a modern, professional, high-converting IT Education Institute website for "NEXXTECHS" — a light-themed, responsive, single-page marketing site with enquiry form functionality.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn/UI components
- **Backend**: FastAPI + MongoDB (Motor async driver)
- **Database**: MongoDB via MONGO_URL environment variable
- **Deployment**: Kubernetes container with supervisor-managed services

## User Personas
1. **Students (18-30)**: Looking for IT courses, want to browse options and enroll
2. **Job Seekers**: Seeking placement assistance and career guidance
3. **Parents/Guardians**: Evaluating education options for children

## Core Requirements (Static)
- Light theme, professional UI inspired by top ed-tech platforms
- Sticky header with navigation
- Hero section with compelling headline and CTAs
- 10 course cards in grid layout
- 8 popular courses with details
- 5 "Why Choose Us" features
- Student project gallery
- Placement success stories with testimonials
- Enquiry form with MongoDB storage
- Dark footer with contact info
- Floating WhatsApp/Call buttons
- Mobile responsive with hamburger menu

## What's Been Implemented (Feb 2026)
- [x] Full single-page website with all 10 sections
- [x] Sticky glassmorphism header with top bar
- [x] Hero section with headline, CTAs, stats, floating cards
- [x] Courses grid (10 cards with icons and pastel backgrounds)
- [x] Popular courses (8 cards with duration/level/badges)
- [x] Why Choose Us (5 feature cards, bento layout)
- [x] Student projects gallery with hover overlays
- [x] Placement section: stats, testimonials, company logos
- [x] Enquiry form with MongoDB backend (POST /api/enquiry)
- [x] Dark footer with quick links, courses, contact info
- [x] Floating WhatsApp + Call buttons with pulse animation
- [x] Mobile responsive with hamburger menu
- [x] Smooth scroll navigation between sections
- [x] Cabinet Grotesk + Inter fonts
- [x] Primary color: #84CC16 (yellow-green matching logo)
- [x] All interactive elements have data-testid attributes
- [x] Backend API: POST /api/enquiry, GET /api/enquiries, GET /api/health

## Testing Results
- Backend: 100% (9/9 tests passed)
- Frontend: 100% (all 13 feature tests passed)

## Prioritized Backlog
### P0 (Critical) - Done
- All core sections implemented and tested

### P1 (Important)
- Individual course detail pages
- Blog CMS with admin panel
- Admin dashboard to view enquiries
- SEO meta tags and Open Graph data

### P2 (Nice to Have)
- Course search/filter functionality
- Email notifications on enquiry submission
- Google Maps embed in contact section
- Testimonials carousel/slider animation
- Course comparison feature
- Download syllabus PDF feature

## Next Tasks
1. Add individual course detail pages with syllabus, pricing, batch schedule
2. Build admin dashboard to view and manage enquiries
3. Add blog section with CMS functionality
4. Implement email notifications for new enquiries
5. Add SEO optimization (meta tags, structured data)
