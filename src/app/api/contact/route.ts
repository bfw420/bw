import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received form data:', body);
    
    // Convert the data to URL search params for GET request
    const params = new URLSearchParams();
    Object.entries(body).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    
    const webhookUrl = `https://n8n.jaxius.net/webhook/6cffe9fc-d8f8-4fdd-8a0d-0b9f94ecadc5?${params.toString()}`;
    console.log('Sending to webhook via GET:', webhookUrl);
    
    const response = await fetch(webhookUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'BrianWalkerMLC-Website/1.0',
      },
    });

    console.log('Webhook response status:', response.status);
    console.log('Webhook response headers:', Object.fromEntries(response.headers.entries()));
    
    let responseText = '';
    try {
      responseText = await response.text();
      console.log('Webhook response body:', responseText);
    } catch (e) {
      console.log('Could not read response body');
    }

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } else {
      console.error('Webhook failed:', response.status, response.statusText, responseText);
      return NextResponse.json(
        { success: false, message: `Webhook failed: ${response.status} ${response.statusText}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { success: false, message: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}