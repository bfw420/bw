"use client";

import { useState, useEffect } from "react";
import { Users, Loader2 } from "lucide-react";

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
      <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Loading subscribers...</span>
      </div>
    );
  }

  if (error || subscriberCount === null) {
    return null; // Don't show anything if there's an error
  }

  return (
    <div className="mb-6">
      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full shadow-lg">
        <Users className="w-5 h-5" />
        <div className="flex flex-col items-start">
          <div className="text-2xl font-bold tabular-nums">
            {formatNumber(displayCount)}
          </div>
          <div className="text-xs opacity-90 -mt-1">
            Subscribers
          </div>
        </div>
      </div>
    </div>
  );
}
