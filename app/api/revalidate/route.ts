import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const secret = request.headers.get('x-sanity-webhook-secret');
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Revalidate all content-driven paths
    revalidatePath('/');
    revalidatePath('/apartments');
    revalidatePath('/apartments/[slug]', 'page');
    revalidatePath('/victoria-falls');
    revalidatePath('/faq');

    return NextResponse.json({ revalidated: true, timestamp: Date.now() });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
