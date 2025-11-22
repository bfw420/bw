import { NextRequest, NextResponse } from 'next/server';

// Simple rate limiting using in-memory store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // 3 requests per minute

function getRateLimitKey(request: NextRequest): string {
  // Use IP address or fallback to a generic key
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] :
             request.headers.get('x-real-ip') ||
             'anonymous';
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitStore.get(key);

  if (!userLimit || now > userLimit.resetTime) {
    // Reset or create new entry
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (userLimit.count >= MAX_REQUESTS) {
    return true;
  }

  userLimit.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const rateLimitKey = getRateLimitKey(request);
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    console.log('Received form data:', { ...body, message: '[redacted]' });

    // Server-side validation
    if (!body.firstName || !body.lastName || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Honeypot check - if this field is filled, it's a bot
    if (body.website) {
      console.log('Bot detected via honeypot field');
      // Pretend it worked to confuse the bot
      return NextResponse.json({ success: true, message: 'Message sent successfully' });
    }

    // Cloudflare Turnstile verification
    if (!body.turnstileToken) {
      return NextResponse.json(
        { success: false, message: 'Please complete the security check' },
        { status: 400 }
      );
    }

    // Verify Turnstile token with Cloudflare
    const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: '0x4AAAAAACBfplzDyQ45hI8l2H8zvWDZIYM',
        response: body.turnstileToken,
        remoteip: getRateLimitKey(request)
      })
    });

    const turnstileResult = await turnstileResponse.json();
    console.log('Turnstile verification result:', turnstileResult);

    if (!turnstileResult.success) {
      console.log('Turnstile verification failed:', turnstileResult);
      return NextResponse.json(
        { success: false, message: 'Security check failed. Please try again.' },
        { status: 400 }
      );
    }

    console.log('Turnstile verification passed! ✅');

    // Message length validation (prevent spam)
    if (body.message.length < 10 || body.message.length > 5000) {
      return NextResponse.json(
        { success: false, message: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    // Prepare webhook URL with query parameters (n8n expects GET request)
    const baseWebhookUrl = 'https://n8n.jaxius.net/webhook/bwwebsitecontactform';
    const webhookParams = new URLSearchParams({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      mobile: body.mobile || '',
      message: body.message,
      subscribeNewsletter: String(body.subscribeNewsletter || false),
      wantToVolunteer: String(body.wantToVolunteer || false),
      contactType: body.contactType,
      recipientEmail: body.recipientEmail,
      submittedAt: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'unknown',
      ip: getRateLimitKey(request)
    });

    const webhookUrl = `${baseWebhookUrl}?${webhookParams.toString()}`;
    console.log('Sending to webhook via GET');

    const response = await fetch(webhookUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'BrianWalkerMLC-Website/1.0',
      }
    });

    console.log('Webhook response status:', response.status);

    let responseText = '';
    try {
      responseText = await response.text();
      console.log('Webhook response body:', responseText);
    } catch {
      console.log('Could not read response body');
    }

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } else {
      console.error('Webhook failed:', response.status, response.statusText, responseText);
      return NextResponse.json(
        { success: false, message: 'Failed to send message. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}