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

    // Server-side captcha validation
    if (!body.captchaAnswer || !body.captchaExpected) {
      return NextResponse.json(
        { success: false, message: 'Captcha validation failed' },
        { status: 400 }
      );
    }

    if (parseInt(body.captchaAnswer) !== parseInt(body.captchaExpected)) {
      return NextResponse.json(
        { success: false, message: 'Incorrect captcha answer' },
        { status: 400 }
      );
    }

    // Message length validation (prevent spam)
    if (body.message.length < 10 || body.message.length > 5000) {
      return NextResponse.json(
        { success: false, message: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    // Prepare webhook payload (use POST, not GET with URL params)
    const webhookData = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      mobile: body.mobile || '',
      message: body.message,
      subscribeNewsletter: body.subscribeNewsletter || false,
      wantToVolunteer: body.wantToVolunteer || false,
      contactType: body.contactType,
      recipientEmail: body.recipientEmail,
      submittedAt: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'unknown',
      ip: getRateLimitKey(request)
    };

    const webhookUrl = 'https://n8n.jaxius.net/webhook/6cffe9fc-d8f8-4fdd-8a0d-0b9f94ecadc5';
    console.log('Sending to webhook via POST');

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'BrianWalkerMLC-Website/1.0',
      },
      body: JSON.stringify(webhookData)
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