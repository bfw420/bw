import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received newsletter data:', body);
    
    // Convert the data to URL search params for GET request
    const params = new URLSearchParams();
    Object.entries(body).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    
    const webhookUrl = `https://n8n.jaxius.net/webhook/804071e0-3cb7-4df5-b90e-9e370218f439?${params.toString()}`;
    console.log('Sending to newsletter webhook via GET:', webhookUrl);
    
    const response = await fetch(webhookUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'BrianWalkerMLC-Website/1.0',
      },
    });

    console.log('Newsletter webhook response status:', response.status);
    console.log('Newsletter webhook response headers:', Object.fromEntries(response.headers.entries()));
    
    let responseText = '';
    try {
      responseText = await response.text();
      console.log('Newsletter webhook response body:', responseText);
    } catch {
      console.log('Could not read response body');
    }

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Newsletter subscription successful' });
    } else {
      console.error('Newsletter webhook failed:', response.status, response.statusText, responseText);
      return NextResponse.json(
        { success: false, message: `Newsletter webhook failed: ${response.status} ${response.statusText}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in newsletter API:', error);
    return NextResponse.json(
      { success: false, message: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}