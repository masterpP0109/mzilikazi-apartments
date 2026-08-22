import { defineField, defineType } from '@sanity/types';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    // Hero
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'headline', type: 'string', title: 'Headline' },
        { name: 'subheading', type: 'text', title: 'Subheading', rows: 2 },
        {
          name: 'backgroundImage',
          type: 'image',
          title: 'Background Image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
        },
      ],
    }),
    // Trust pillars
    defineField({
      name: 'trustPillars',
      title: 'Trust Pillars',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', type: 'string', title: 'Icon name (Lucide)' },
          { name: 'title', type: 'string', title: 'Title' },
          { name: 'description', type: 'text', title: 'Description', rows: 2 },
        ],
      }],
    }),
    // The Stay section
    defineField({
      name: 'theStaySection',
      title: 'The Stay Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', type: 'string', title: 'Eyebrow label' },
        { name: 'headline', type: 'string', title: 'Headline' },
        { name: 'body', type: 'text', title: 'Body copy', rows: 4 },
        {
          name: 'bullets',
          type: 'array',
          title: 'Feature → Benefit bullets',
          of: [{ type: 'string' }],
        },
      ],
    }),
    // Why Mzilikazi points
    defineField({
      name: 'whyMzilikaziPoints',
      title: 'Why Mzilikazi Points',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'number', type: 'string', title: 'Number (e.g. "01")' },
          { name: 'title', type: 'string', title: 'Title' },
          { name: 'description', type: 'text', title: 'Description', rows: 2 },
        ],
      }],
    }),
    // Final CTA section
    defineField({
      name: 'finalCTASection',
      title: 'Final CTA Section',
      type: 'object',
      fields: [
        { name: 'headline', type: 'string', title: 'Headline' },
        { name: 'body', type: 'text', title: 'Body', rows: 2 },
        { name: 'primaryCTA', type: 'string', title: 'Primary CTA label' },
        { name: 'secondaryCTA', type: 'string', title: 'Secondary CTA label' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage' };
    },
  },
});
