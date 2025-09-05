import { NextResponse } from 'next/server';

// YouTube channel ID from the footer
const CHANNEL_ID = 'UCCIGBIf3b385BV5d48Y1U2A';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  publishedAt: string;
  description: string;
  priority?: number;
}

export async function GET() {
  try {
    // Fetch the RSS feed
    const response = await fetch(RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`);
    }

    const xmlText = await response.text();
    
    // Parse the XML manually since we're in a server environment
    const videos: YouTubeVideo[] = [];
    
    // Extract video entries using regex (simple parsing for RSS)
    const entryMatches = xmlText.match(/<entry>[\s\S]*?<\/entry>/g);
    
    if (entryMatches) {
      for (let i = 0; i < Math.min(20, entryMatches.length) && videos.length < 4; i++) {
        const entry = entryMatches[i];
        
        // Extract video ID and other data
        const idMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
        const titleMatch = entry.match(/<title>(.*?)<\/title>/);
        const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
        const descriptionMatch = entry.match(/<media:description>(.*?)<\/media:description>/);
        
        if (idMatch && titleMatch && publishedMatch) {
          const videoId = idMatch[1];
          const title = titleMatch[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
          const publishedAt = publishedMatch[1];
          const description = descriptionMatch ? descriptionMatch[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"') : '';
          
          // Filter out YouTube Shorts by checking title and description for common short indicators
          const isLikelyShort = title.toLowerCase().includes('#shorts') ||
                              description.toLowerCase().includes('#shorts') ||
                              title.toLowerCase().includes('short') ||
                              title.length < 25; // Very short titles are often shorts
          
          // Only add if it's likely a long-form video
          if (!isLikelyShort) {
            videos.push({
              id: videoId,
              title,
              url: `https://www.youtube.com/watch?v=${videoId}`,
              thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
              publishedAt,
              description: description.substring(0, 150) + (description.length > 150 ? '...' : '')
            });
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      videos,
      total: videos.length
    });

  } catch (error) {
    console.error('Error fetching YouTube RSS:', error);
    
    // Return fallback data if RSS fails
    const fallbackVideos: YouTubeVideo[] = [
      {
        id: 'fallback1',
        title: 'Cannabis Law Reform: Parliamentary Speech - Dr Brian Walker MLC',
        url: 'https://www.youtube.com/channel/UCCIGBIf3b385BV5d48Y1U2A',
        thumbnail: '/images/hero1.jpg',
        publishedAt: new Date().toISOString(),
        description: 'Recent parliamentary speech by Dr Brian Walker'
      },
      {
        id: 'fallback2',
        title: 'Mental Health Crisis in Western Australia - Full Interview',
        url: 'https://www.youtube.com/channel/UCCIGBIf3b385BV5d48Y1U2A',
        thumbnail: '/images/hero3.svg',
        publishedAt: new Date().toISOString(),
        description: 'Interview discussing mental health support systems'
      },
      {
        id: 'fallback3',
        title: 'Renewable Energy Future for WA - Parliamentary Debate',
        url: 'https://www.youtube.com/channel/UCCIGBIf3b385BV5d48Y1U2A',
        thumbnail: '/images/hero4.svg',
        publishedAt: new Date().toISOString(),
        description: 'Debate on renewable energy policy'
      },
      {
        id: 'fallback4',
        title: 'Housing Affordability Solutions - Community Address',
        url: 'https://www.youtube.com/channel/UCCIGBIf3b385BV5d48Y1U2A',
        thumbnail: '/images/hero5.svg',
        publishedAt: new Date().toISOString(),
        description: 'Community address on housing crisis solutions'
      }
    ];

    return NextResponse.json({
      success: false,
      videos: fallbackVideos,
      total: fallbackVideos.length,
      error: 'Failed to fetch RSS feed, showing fallback content'
    });
  }
}