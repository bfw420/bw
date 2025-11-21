'use client';

import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  excerpt: string;
}

export default function ShareButton({ title, excerpt }: ShareButtonProps) {
  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url,
        });
      } catch (error) {
        // User cancelled the share
        console.log('Share cancelled');
      }
    } else {
      // Fallback to copying to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy:', error);
        alert('Failed to copy link. Please copy manually: ' + url);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00653b] to-[#6cc24a] text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-200 shadow-md"
    >
      <Share2 className="w-5 h-5" />
      <span>Share</span>
    </button>
  );
}
