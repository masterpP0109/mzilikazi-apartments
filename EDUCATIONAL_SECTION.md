# Homepage educational section

## Files created

- components/mzilikazi-story/MzilikaziStory.tsx: section composition.
- components/mzilikazi-story/StoryIntro.tsx: introduction and main highlighted statement.
- components/mzilikazi-story/StoryChapter.tsx: reusable alternating image/text chapter.
- components/mzilikazi-story/TravellerGuidance.tsx: four educational traveller blocks.
- components/mzilikazi-story/BrandPhilosophy.tsx: philosophy and photographic statement.
- components/mzilikazi-story/DecisionGuide.tsx: four numbered decision questions and closing links.
- components/mzilikazi-story/StoryText.tsx: paragraphs, visually separated questions and quotes.
- components/mzilikazi-story/content.ts: supplied editorial copy.
- scripts/education-qa.mjs: isolated local-browser validation.

## Files modified

- app/page.tsx: hero, new education, accommodation discovery, property and destination content, planning, trust/FAQ, final CTA. Existing sections are retained.
- app/globals.css: scoped educational layouts and responsive typography.
- components/home/TheStay.tsx: repeats of self-catering philosophy replaced with photographs, accommodation comparison and practical questions.
- components/home/WhoIsItFor.tsx: label and heading now invite visitors to continue planning. Existing card copy and links are retained.

## Design and behaviour

Server-rendered components reuse Container, Eyebrow, ImageFrame, TextLink and the existing BackgroundSection reveal. No packages added. Existing local photographs support the narrative; none are random stock images. Supplied assets live in public/mzilikazi imgs/mzilikazi-img rather than the path suggested in the request. No destination photo was fabricated. Existing blue primary CTAs are retained.

The layout uses reading-width paragraphs, alternating photographs, full-width statements, subtle dividers and numbered decision rows. Mobile layouts stack naturally and CTAs fill the available width. Images reserve their aspect ratios and lazy-load through Next.js. Desktop image columns can remain sticky below navigation; reduced motion disables this. Only the philosophy photo statement uses the existing gentle reveal.

## Accessibility

Logical h1/h2/h3/h4 structure, descriptive image alt text, decorative background alt text empty, named sections, keyboard-accessible closing links, readable photographic overlay, reduced-motion support and fully visible server-rendered content with JavaScript disabled.

## Validation

Lint, configured TypeScript check and production build passed. Hero component is unchanged (matching SHA-256). All 115 supplied paragraphs are present. Browser checks passed at 320, 360, 375, 390, 430, 768, 1440px, covering section order, four planning questions, four traveller blocks, four decision blocks, CTA routes, the unique apartment anchor, image lazy loading and alt text, heading hierarchy, horizontal overflow, reduced motion, keyboard focus and JavaScript-disabled content. Runtime errors: 0. Screenshots and report are in .qa/.

Navigation, hero carousel, existing forms, WhatsApp functionality, accommodation facts and original assets were preserved. No deployment performed.
