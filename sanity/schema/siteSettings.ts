import { defineField, defineType } from '@sanity/types';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton — only one document of this type should exist
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string', initialValue: 'Mzilikazi Apartments' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({
      name: 'address',
      title: 'Address — [PLACEHOLDER — confirm with client]',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'phone',
      title: 'Phone — [PLACEHOLDER — confirm with client]',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email — [PLACEHOLDER — confirm with client]',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number — [PLACEHOLDER — confirm with client]',
      type: 'string',
    }),
    defineField({
      name: 'checkIn',
      title: 'Check-in Time — [PLACEHOLDER — confirm with client]',
      type: 'string',
    }),
    defineField({
      name: 'checkOut',
      title: 'Check-out Time — [PLACEHOLDER — confirm with client]',
      type: 'string',
    }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroSubheading', title: 'Hero Subheading', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'siteName' },
  },
});
