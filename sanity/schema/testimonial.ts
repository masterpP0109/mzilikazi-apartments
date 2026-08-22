import { defineField, defineType } from '@sanity/types';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: 'guestName', title: 'Guest Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'guestOrigin',
      title: 'Guest Origin (city/country) — [PLACEHOLDER — confirm with client]',
      type: 'string',
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: ['Google', 'Booking.com', 'Airbnb', 'TripAdvisor', 'Direct', 'Other'],
      },
    }),
    defineField({
      name: 'verified',
      title: 'Verified Review?',
      type: 'boolean',
      initialValue: false,
      description: 'Only publish verified reviews. Do not invent or fabricate testimonials.',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1–5) — [PLACEHOLDER — confirm with client]',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({ name: 'apartmentStayed', title: 'Apartment Stayed In', type: 'string' }),
    defineField({ name: 'date', title: 'Date of Stay', type: 'date' }),
  ],
  preview: {
    select: { title: 'guestName', subtitle: 'platform' },
  },
});
