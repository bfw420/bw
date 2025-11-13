"use client";

import { useState, useEffect } from "react";
import { Loader2, Play } from "lucide-react";

export default function SubscriberCounter() {
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch subscriber count
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch('/api/youtube/subscribers');
        const data = await response.json();

        if (data.success && data.subscriberCount) {
          setSubscriberCount(data.subscriberCount);
        } else {
          setError(data.error || 'Unable to load subscriber count');
        }
      } catch (err) {
        console.error('Error fetching subscriber count:', err);
        setError('Unable to load subscriber count');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  // Animate counter tick-up
  useEffect(() => {
    if (subscriberCount === null) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = subscriberCount / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setDisplayCount(Math.floor(increment * currentStep));
      } else {
        setDisplayCount(subscriberCount);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [subscriberCount]);

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 text-gray-600">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  if (error || subscriberCount === null) {
    return null; // Don't show anything if there's an error
  }

  return (
    <div className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-sm shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 hover:scale-105">
      <div className="flex items-center justify-center w-10 h-10 bg-[#cc0000] rounded-sm">
        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
      </div>
      <div className="flex flex-col">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Subscribers
        </div>
        <div className="text-2xl font-bold text-gray-900 tabular-nums">
          {formatNumber(displayCount)}
        </div>
      </div>
    </div>
  );
}
