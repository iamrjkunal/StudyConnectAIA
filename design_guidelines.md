# StudyConnect Design Guidelines

## Design Approach: Utility-First System Design

**Selected Framework**: Material Design 3 with custom data visualization components

**Rationale**: StudyConnect is a utility-focused matching engine where trust, efficiency, and data clarity are paramount. Users need to quickly parse match quality, compare alumni profiles, and take action. A clean, systematic approach ensures:
- Fast cognitive processing of match scores and profiles
- Clear hierarchy between input steps and results
- Professional credibility for a mentorship platform
- Consistent patterns that don't distract from decision-making

**Key Principles**:
1. Information clarity over visual flair
2. Progress transparency (3-step workflow must be obvious)
3. Trust signals (verification badges, match confidence)
4. Action-oriented layout (contact options immediately visible)

---

## Typography

**Font Stack**: Inter (primary), SF Pro Display (fallback)

**Hierarchy**:
- H1 (Page titles): 2.5rem (40px), font-weight 700, letter-spacing -0.02em
- H2 (Section headers, "Top 3 Matches"): 2rem (32px), font-weight 600
- H3 (Alumni names, step titles): 1.5rem (24px), font-weight 600
- Body Large (Match score labels): 1.125rem (18px), font-weight 500
- Body Regular (Profile descriptions): 1rem (16px), font-weight 400, line-height 1.6
- Body Small (Metadata, tags): 0.875rem (14px), font-weight 400
- Caption (Helper text, email status): 0.75rem (12px), font-weight 500, uppercase

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-6 or p-8
- Section gaps: space-y-8 or space-y-12
- Card spacing: gap-6
- Button padding: px-6 py-3

**Container Strategy**:
- Max-width: max-w-6xl for main content (optimized for data readability)
- Grid layouts: 3-column for alumni cards (grid-cols-1 md:grid-cols-3)
- Input forms: max-w-2xl centered

**No Hero Section**: This is a workflow-driven tool, not a marketing page. Landing directly into the input form maximizes efficiency.

---

## Core Components

### 1. **Workflow Stepper**
- Horizontal step indicator at top: Step 1 → Step 2 → Step 3
- Active step: Bold with accent underline
- Completed steps: Checkmark icon
- Inactive steps: Muted opacity

### 2. **Input Forms (Steps 1 & 2)**
- Large, clear input fields with floating labels
- Helper text below each input explaining what's needed
- Primary CTA button: Full-width on mobile, auto-width on desktop
- Validation indicators (checkmark/error icon inline)

### 3. **Alumni Profile Cards**
- Card layout: White background, subtle shadow, 8px rounded corners
- Header: Alumni photo (64px circle), name, current role
- Match Score Badge: Large percentage (e.g., "92% Match") in accent color, top-right position
- Similarity Breakdown: Horizontal bar chart showing skill/experience/city alignment
- Pre-study Background: Compact list of previous role, location, skills
- Contact Section: Icon-based buttons for LinkedIn/Twitter/Website, displayed horizontally
- Email Display: Grayed container with verification badge (e.g., "Verified Academic Email")

### 4. **Match Confidence Visualization**
- Segmented horizontal bars for each matching criterion:
  - Skills overlap: 40% weight
  - Experience alignment: 25% weight
  - City background: 15% weight
  - Extracurriculars: 10% weight
  - Education: 10% weight
- Each bar shows filled percentage in gradient
- Labels with percentages displayed inline

### 5. **AI-Generated Email Section**
- Expandable card below each alumni profile
- Email preview with personalized highlights (bold text for customization points)
- "Copy Email" button with success state (copied confirmation)
- Personalization tags: Colored badges showing shared skills/experiences used in email

### 6. **Contact Options**
- Icon buttons with labels: LinkedIn (blue), Twitter (light blue), Website (neutral)
- Tooltip on hover showing full URL
- Email display: Monospace font in bordered container with copy button

---

## Interaction Patterns

**Progressive Disclosure**: Email generation hidden until user clicks "View Outreach Email" to reduce cognitive load

**Loading States**: Skeleton screens for alumni cards during matching, subtle pulse animation

**Empty States**: If no matches found, show helpful message with suggestions to broaden search

**Success Confirmations**: Toast notifications for "Email Copied" actions

---

## Trust & Verification Signals

- Verification badges next to emails (checkmark icon + "Verified" label)
- Match confidence displayed as percentage (e.g., "High Confidence: 92%")
- Data source attribution: Small text below profiles ("Matched from 50,000+ alumni database")

---

## Images

**No large hero image required** - this is a utility application

**Profile Photos**: 
- Alumni headshots: 64px circular avatars in profile cards
- Placeholder: Gradient circles with initials if no photo available

**Icons**: 
- Use Heroicons throughout for consistency
- Contact icons: LinkedIn, Twitter, Globe, Mail, ExternalLink
- UI icons: Check, X, ChevronRight, Copy, Info

---

## Accessibility

- All form inputs have visible labels and ARIA attributes
- Match score visualizations include text alternatives
- Color contrast ratios meet WCAG AA standards (4.5:1 for body text)
- Keyboard navigation: Tab through inputs, cards, and CTAs logically
- Focus states: 2px accent-colored outline on interactive elements