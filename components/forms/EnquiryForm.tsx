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
    guests: z.coerce.number().min(1, 'Please enter the number of guests').max(20),
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
  'w-full px-4 py-3 font-inter text-sm text-[#0B1B2B] bg-white border border-[#E2D9C8] rounded focus:outline-none focus:border-[#C8922A] focus:ring-2 focus:ring-[#C8922A]/20 transition placeholder:text-[#4A5568]/40';

export default function EnquiryForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormValues, unknown, EnquiryFormValues>({
    resolver: zodResolver(enquirySchema) as import('react-hook-form').Resolver<EnquiryFormValues>,
  });

  const onSubmit = async (data: EnquiryFormValues) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/enquiry', {
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
      <div className="bg-[#FAF6EE] border border-[#C8922A] rounded-lg p-8 text-center">
        <h3 className="font-playfair text-2xl font-bold text-[#0B1B2B] mb-3">
          Enquiry received.
        </h3>
        <p className="font-inter text-sm text-[#4A5568]">
          Thank you for reaching out. We will review your enquiry and get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 font-dm text-sm text-[#C8922A] hover:underline underline-offset-4"
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
      <Field label="Phone / WhatsApp" error={errors.phone?.message}>
        <input
          {...register('phone')}
          type="tel"
          placeholder="+1 555 000 0000"
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
        <Field label="Guests" error={errors.guests?.message} required>
          <input
            {...register('guests')}
            type="number"
            min={1}
            max={20}
            placeholder="2"
            className={cn(inputClass, errors.guests && 'border-red-400')}
          />
        </Field>
      </div>

      {/* Apartment preference */}
      <Field label="Apartment Preference" error={errors.apartmentPreference?.message}>
        <select {...register('apartmentPreference')} className={inputClass}>
          <option value="">No preference / not sure</option>
          {/* [PLACEHOLDER — confirm apartment names with client] */}
          <option value="apartment-one">[PLACEHOLDER — apartment name 1]</option>
          <option value="apartment-two">[PLACEHOLDER — apartment name 2]</option>
          <option value="apartment-three">[PLACEHOLDER — apartment name 3]</option>
        </select>
      </Field>

      {/* Message */}
      <Field label="Message (optional)" error={errors.message?.message}>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="Any questions, special requests, or context about your visit..."
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
        className="w-full py-4 bg-[#C8922A] text-[#0B1B2B] font-dm font-semibold text-base rounded hover:bg-[#D4A84B] disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8922A] focus-visible:ring-offset-2"
      >
        {status === 'loading' ? 'Sending…' : 'Send Enquiry'}
      </button>

      <p className="font-inter text-xs text-[#4A5568] text-center">
        We respond within 24 hours. No spam, no hard sell.
      </p>
    </form>
  );
}
