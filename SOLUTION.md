
**Actionable Steps:**
1. **Build Media Release Archive**
   - Create data structure: `{ date, title, summary, fullText, tags, pdfUrl }`
   - Add CMS integration or use markdown files for content
   - Display in reverse chronological order
   - Include search, filter by tag/date
   - Add "Subscribe to Media Releases" email signup
   - Move media kit from `/downloads` to `/media` as subsection
   - Add high-resolution headshots (multiple poses)


remove decimal place from parliament stat card.


#### 1.3 FAQ Section (HIGH PRIORITY - QUICK WIN)
**Status:** Not present
**Gap:** Common constituent questions not addressed efficiently

**Actionable Steps:**
1. **Create FAQ Page** (`/faq`)
   - Categories: Cannabis Reform, Healthcare, Parliamentary Process, Volunteering
   - Accordion-style expandable answers
   - Search functionality
   - "Still have questions?" → Contact form link

2. **Top 20 Questions to Address:**
   - What is your position on [key issue]?
   - How can I volunteer for your campaign?
   - How do I contact you about a constituent issue?
   - What is the Legalise Cannabis WA Party platform?
   - How can I submit a petition or concern?
   - What bills have you introduced?
   - How does the WA Legislative Council work?
   - What is the economic case for cannabis reform?
   - How can I access your voting record?
   - What medical services do you still provide?
   - How can I book an appointment (medical)?
   - What languages do you speak?
   - How often do you hold community forums?
   - How can I invite you to speak at an event?
   - What committees are you on?
   - How can I support your work financially?
   - What is your position on [current issue in news]?
   - How can I get help with a government service issue?
   - What is your policy on [local issue]?
   - How can I stay updated on your work?

3. **Dynamic FAQ Updates**
   - Track most-visited FAQ items via analytics
   - Add new FAQs based on common contact form questions
   - Link to relevant speeches/policy positions
   - Include video answers for top 5 questions


#### 1.4 Policy Position Database (HIGH PRIORITY - STRATEGIC)
**Status:** Scattered across speeches and goals sections
**Gap:** No centralized, searchable policy resource

**Actionable Steps:**
1. **Build Policy Hub** (`/policy`)
   - Structured database: `{ issue, position, rationale, supporting_evidence, last_updated }`
   - Categories: Healthcare, Cannabis Reform, Education, Economy, Environment, Justice, Transport
   - Search and filter by category, date, keyword
   - Link to relevant Hansard speeches
   - Link to supporting research/reports

2. **Policy Position Format**
   ```markdown
   # Issue: [Name]
   **Position:** [1-2 sentence stance]
   **Why This Matters:** [Impact on WA]
   **Evidence:** [Data, research, expert opinions]
   **What I'm Doing:** [Bills, amendments, advocacy]
   **Timeline:** [Realistic goals]
   **Get Involved:** [Action steps for constituents]
   ```

3. **Interactive Policy Comparison**
   - Compare positions with other parties
   - Show voting record on related bills
   - Highlight alignment with constituent surveys

4. **Policy Update Notifications**
   - Email subscribers when positions updated
   - RSS feed for policy changes
   - Social media auto-posts

**Impact:** Establishes thought leadership, voter education
**Effort:** 2-3 weeks
**Dependencies:** Policy research and writing

---

#### 1.5 Blog/Articles Section (MEDIUM PRIORITY)
**Status:** Not present
**Gap:** No long-form content beyond economic report

**Actionable Steps:**
1. **Create Blog** (`/blog` or `/articles`)
   - Monthly deep-dive articles (1,000-2,000 words)
   - Topics: Policy analysis, constituent stories, parliamentary insights
   - Categories: Healthcare, Cannabis, Parliament, Community
   - Author bio with photo
   - Social share buttons
   - Comments section (moderated)

2. **Content Calendar**
   - Week 1: Speech breakdown/analysis
   - Week 2: Policy deep dive
   - Week 3: Constituent spotlight
   - Week 4: Parliamentary process education

3. **SEO Optimization**
   - Keyword research for each article
   - Internal linking to policy positions and speeches
   - Meta descriptions and featured images
   - Schema markup for articles

4. **Guest Contributions**
   - Invite experts to write on topics
   - Community voices and testimonials
   - Coalition partners and allies

**Impact:** Improved SEO, thought leadership, constituent education
**Effort:** Ongoing (2-4 hours/week for writing)
**Dependencies:** Content strategy and writing time

---

### SECTION 4: TECHNICAL IMPROVEMENTS

#### 4.1 Enhanced Search (MEDIUM PRIORITY)
**Status:** Basic search on speeches page only
**Gap:** Can't search across entire site

**Actionable Steps:**
1. **Site-wide Search**
   - Add search bar to navigation
   - Search across: Pages, speeches, policies, blog, FAQ
   - Instant results dropdown
   - Full search results page
   - Filters: Content type, date range, topic

2. **Search Optimization**
   - Implement Algolia or Meilisearch
   - Typo tolerance
   - Synonym support (e.g., "weed" → "cannabis")
   - Search analytics: Track popular queries

3. **Smart Suggestions**
   - "Did you mean...?" for typos
   - Related searches
   - Trending topics
   - Popular searches this week

**Impact:** Improved user experience, content discovery
**Effort:** 1-2 weeks
**Dependencies:** Search platform subscription


#### 4.3 Performance Optimization (MEDIUM PRIORITY)
**Status:** Good but room for improvement
**Gap:** Some images not optimized, no PWA

**Actionable Steps:**
1. **Image Optimization**
   - Convert all JPG/PNG to WebP (done for most)
   - Implement lazy loading for images below fold
   - Responsive images with srcset
   - CDN for image delivery (Cloudflare Images)

2. **Progressive Web App (PWA)**
   - Add service worker for offline access
   - Enable "Add to Home Screen"
   - Push notifications for new speeches/events
   - Offline FAQ access

3. **Code Splitting & Lazy Loading**
   - Split large components
   - Lazy load modals and non-critical features
   - Prefetch critical routes

4. **Caching Strategy**
   - Static pages: Cache for 1 hour
   - API responses: Cache where appropriate
   - Stale-while-revalidate for dynamic content

**Impact:** Faster load times, better mobile experience
**Effort:** 1-2 weeks
**Dependencies:** None

---

#### 4.4 Accessibility Enhancements (MEDIUM PRIORITY)
**Status:** Basic accessibility present
**Gap:** Not WCAG 2.1 AA compliant

**Actionable Steps:**
1. **WCAG 2.1 AA Compliance**
   - Audit with axe DevTools
   - Fix contrast issues
   - Add ARIA labels to all interactive elements
   - Keyboard navigation for all features
   - Screen reader testing

2. **Accessibility Features**
   - Font size controls
   - High contrast mode toggle
   - Skip navigation links
   - Alt text for all images
   - Captions for videos

3. **Inclusive Design**
   - Plain language option for complex topics
   - Visual aids for data/statistics
   - Multiple formats: Text, audio, video

**Impact:** Reach more constituents, legal compliance
**Effort:** 1 week
**Dependencies:** Accessibility testing tools

---

### SECTION 7: SEO & DISCOVERABILITY

#### 7.1 Advanced SEO (MEDIUM PRIORITY)
**Status:** Good foundation, can be enhanced
**Gap:** Not ranking for many relevant local searches

**Actionable Steps:**
1. **Local SEO**
   - Google My Business optimization
   - Local keywords: "Claremont GP", "East Metro MLC"
   - Location pages for different suburbs
   - Local news links and citations

2. **Content SEO**
   - Target long-tail keywords
   - Internal linking strategy
   - Schema markup for articles, events, FAQs
   - XML sitemap optimization

3. **Technical SEO**
   - Core Web Vitals optimization
   - Mobile-first indexing compliance
   - Structured data for rich snippets
   - Canonical URLs

4. **Link Building**
   - Guest posts on political blogs
   - Media mentions and citations
   - University partnerships (UWA)
   - Community organization partnerships

**Impact:** Increased organic traffic, better visibility
**Effort:** Ongoing
**Dependencies:** SEO tools, content creation

---

### SECTION 8: SECURITY & PRIVACY

#### 8.1 Enhanced Security (LOW PRIORITY - but important)
**Status:** Basic security present
**Gap:** No security audit, limited monitoring

**Actionable Steps:**
1. **Security Audit**
   - Penetration testing
   - OWASP Top 10 review
   - Dependency vulnerability scan
   - SSL/TLS configuration check

2. **Enhanced Protection**
   - Web Application Firewall (Cloudflare)
   - DDoS protection
   - Rate limiting on all API endpoints
   - CSRF protection

3. **Data Privacy**
   - GDPR compliance audit (for EU visitors)
   - Privacy policy update
   - Cookie consent banner
   - Data retention policies
   - Right to deletion workflow
