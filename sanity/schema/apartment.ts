import { defineField, defineType } from '@sanity/types';

export default defineType({
  name: 'apartment',
  title: 'Apartment',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Apartment Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'guestProfile', title: 'Guest Profile (who is this apartment for?)', type: 'string' }),
    defineField({ name: 'capacity', title: 'Max Guests', type: 'number' }),
    defineField({ name: 'bedrooms', title: 'Bedrooms', type: 'number' }),
    defineField({ name: 'beds', title: 'Beds', type: 'number' }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{
        type: 'image',
        fields: [
          { name: 'alt', type: 'string', title: 'Alt text' },
          { name: 'caption', type: 'string', title: 'Caption' },
        ],
      }],
    }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'longDescription', title: 'Long Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'highlights',
      title: 'Highlights (bullet points)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'price',
      title: 'Price per Night (USD) — [PLACEHOLDER — confirm with client]',
      type: 'number',
      description: 'Leave blank until pricing is confirmed with client.',
    }),
    defineField({ name: 'featured', title: 'Featured?', type: 'boolean', initialValue: false }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline' },
  },
});
