import { NextResponse } from 'next/server';

export async function GET() {
  const channelId = 'UCCIGBIf3b385BV5d48Y1U2A';

  // Check if API key is configured
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      success: false,
      error: 'YouTube API key not configured',
      subscriberCount: null,
    });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`,
      {
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const subscriberCount = parseInt(data.items[0].statistics.subscriberCount, 10);

      return NextResponse.json({
        success: true,
        subscriberCount,
        hiddenSubscriberCount: data.items[0].statistics.hiddenSubscriberCount,
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Channel not found',
      subscriberCount: null,
    });
  } catch (error) {
    console.error('Error fetching YouTube subscriber count:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch subscriber count',
      subscriberCount: null,
    });
  }
}
