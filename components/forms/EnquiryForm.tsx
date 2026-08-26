'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';

const enquirySchema = z
  .object({
    name: z.string().min(2, 'Please enter your name'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().optional(),
    arrivalDate: z.string().min(1, 'Please select an arrival date'),
    departureDate: z.string().min(1, 'Please select a departure date'),
    guests: z.coerce.number().min(1, 'Please enter the number of guests').max(50),
    apartmentPreference: z.string().optional(),
    message: z.string().optional(),
  })
  .refine(
    (data) => new Date(data.departureDate) > new Date(data.arrivalDate),
    { message: 'Departure must be after arrival', path: ['departureDate'] }
  );

type EnquiryFormValues = z.infer<typeof enquirySchema>;

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ label, error, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-dm text-sm font-medium text-[#0B1B2B]">
        {label}{required && <span className="text-[#C8922A] ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && <p className="font-inter text-xs text-red-600">{error}</p>}
    </div>
  );
}

const inputClass =
  'w-full px-4 py-3 font-inter text-sm text-[#0B1B2B] bg-white border border-[#E2D9C8] rounded-lg focus:outline-none focus:border-[#C8922A] focus:ring-2 focus:ring-[#C8922A]/20 transition placeholder:text-[#4A5568]/40';

interface EnquiryFormProps {
  defaultPreference?: string;
}

export default function EnquiryForm({ defaultPreference }: EnquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormValues, unknown, EnquiryFormValues>({
    resolver: zodResolver(enquirySchema) as import('react-hook-form').Resolver<EnquiryFormValues>,
    defaultValues: {
      apartmentPreference: defaultPreference ?? '',
    },
  });

  const onSubmit = async (data: EnquiryFormValues) => {
    setStatus('loading');
    try {
      const res = await fetch('/app/api/enquiry' in window ? '/api/enquiry' : '/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Something went wrong');
      }
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#FAF6EE] border border-[#C8922A] rounded-xl p-8 text-center shadow-sm">
        <h3 className="font-playfair text-2xl font-bold text-[#0B1B2B] mb-3">
          Enquiry received.
        </h3>
        <p className="font-inter text-sm text-[#4A5568] max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to Mzilikazi Guest Lodge. Our reservations team will review your dates, preferred unit, and safari requirements, and get back to you with a detailed quote within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 px-6 py-2.5 bg-[#C8922A] text-[#0B1B2B] font-dm text-sm font-semibold rounded hover:bg-[#D4A84B] transition-colors"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" error={errors.name?.message} required>
          <input
            {...register('name')}
            type="text"
            placeholder="Jane Smith"
            autoComplete="name"
            className={cn(inputClass, errors.name && 'border-red-400')}
          />
        </Field>
        <Field label="Email Address" error={errors.email?.message} required>
          <input
            {...register('email')}
            type="email"
            placeholder="jane@example.com"
            autoComplete="email"
            className={cn(inputClass, errors.email && 'border-red-400')}
          />
        </Field>
      </div>

      {/* Phone */}
      <Field label="Phone / WhatsApp Number (for concierge updates)" error={errors.phone?.message}>
        <input
          {...register('phone')}
          type="tel"
          placeholder="+263 / +1 / +44 ..."
          autoComplete="tel"
          className={inputClass}
        />
      </Field>

      {/* Dates + Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Field label="Arrival Date" error={errors.arrivalDate?.message} required>
          <input
            {...register('arrivalDate')}
            type="date"
            className={cn(inputClass, errors.arrivalDate && 'border-red-400')}
          />
        </Field>
        <Field label="Departure Date" error={errors.departureDate?.message} required>
          <input
            {...register('departureDate')}
            type="date"
            className={cn(inputClass, errors.departureDate && 'border-red-400')}
          />
        </Field>
        <Field label="Total Guests" error={errors.guests?.message} required>
          <input
            {...register('guests')}
            type="number"
            min={1}
            max={50}
            placeholder="2"
            className={cn(inputClass, errors.guests && 'border-red-400')}
          />
        </Field>
      </div>

      {/* Room / Package preference */}
      <Field label="Primary Stay or Experience Interest" error={errors.apartmentPreference?.message}>
        <select {...register('apartmentPreference')} className={inputClass}>
          <option value="">No specific preference / recommend for me</option>
          <option value="The Zambezi 2-Bedroom Executive Suite">The Zambezi 2-Bedroom Executive Suite (Sleeps 4-6)</option>
          <option value="The Mosi-oa-Tunya Family Suite">The Mosi-oa-Tunya Family Suite (2-Bedroom, Full Kitchen)</option>
          <option value="The Batoka Garden Suite">The Batoka Garden Suite (1-Bedroom, King Bed)</option>
          <option value="Family / Group 2-Bedroom Suite">Family / Group 2-Bedroom Suite</option>
          <option value="Corporate / Conference Stay">Corporate / Conference Delegation Stay (with Invoicing)</option>
          <option value="Chobe Day Safari (Botswana)">Chobe Day Safari (Botswana River Cruise + 4x4)</option>
          <option value="Village & Cultural Experience">Village &amp; Cultural Heritage Tour</option>
          <option value="Guided Tour of Victoria Falls">Guided Tour of Victoria Falls (Mosi-oa-Tunya)</option>
          <option value="Full Connected Experience Package">Full Connected Package (Stay + Safaris + Transfers)</option>
        </select>
      </Field>

      {/* Message */}
      <Field label="Message & Special Requests" error={errors.message?.message}>
        <textarea
          {...register('message')}
          rows={3}
          placeholder="Tell us about airport pickups, dietary requirements, conference logistics, or specific activities you want included..."
          className={inputClass}
        />
      </Field>

      {/* Error banner */}
      {status === 'error' && (
        <p className="font-inter text-sm text-red-600 bg-red-50 border border-red-200 rounded px-4 py-3">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-base rounded-lg hover:bg-[#D4A84B] disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8922A] focus-visible:ring-offset-2 shadow-md"
      >
        {status === 'loading' ? 'Sending Enquiry…' : 'Send Reservation Enquiry'}
      </button>

      <p className="font-inter text-xs text-[#4A5568] text-center">
        Guaranteed direct booking rates. Response within 24 hours.
      </p>
    </form>
  );
}
