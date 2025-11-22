'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';
import confetti from 'canvas-confetti';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  website: z.string().optional(), // Honeypot field
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterSignupProps {
  source?: string; // Optional source tracking (e.g., "blog-post")
  className?: string;
}

export default function NewsletterSignup({ source = 'newsletter', className = '' }: NewsletterSignupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      website: '', // Honeypot field - should always be empty
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    setNotification(null);

    try {
      if (!turnstileToken) {
        setNotification({ type: 'error', message: 'Please complete the security check' });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          subscriptionType: 'newsletter',
          source: source,
          subscribedAt: new Date().toISOString(),
          turnstileToken: turnstileToken,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setNotification({
          type: 'success',
          message: "You're subscribed! Check your inbox for updates.",
        });
        reset();
        setTurnstileToken('');

        // Trigger confetti animation
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00653b', '#6cc24a', '#ffffff'],
        });
      } else {
        setNotification({
          type: 'error',
          message: result.message || 'Failed to subscribe. Please try again.',
        });
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setNotification({
        type: 'error',
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-sm rounded-2xl">
          <div className="flex-1">
            <Input
              {...register('email')}
              type="email"
              placeholder="Enter your email address"
              className="h-14 text-lg px-6 bg-white text-gray-900 border-0 rounded-xl focus:ring-2 focus:ring-white/30"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || !turnstileToken}
            className="h-14 px-8 text-lg font-bold rounded-xl whitespace-nowrap relative overflow-hidden"
            style={{
              background: 'white',
              color: '#00653b',
              animation: isSubmitting
                ? 'none'
                : 'breathe 2s ease-in-out infinite, glow-pulse 2s ease-in-out infinite',
              boxShadow: isSubmitting
                ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                : '0 0 0 3px rgba(108, 194, 74, 0.3), 0 10px 25px -5px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease-out',
              border: '2px solid rgba(108, 194, 74, 0.5)'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.transform = 'scale(1.1) translateY(-4px)';
                e.currentTarget.style.background = '#6cc24a';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = '#6cc24a';
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(108, 194, 74, 0.4), 0 0 60px rgba(108, 194, 74, 0.8), 0 25px 35px -5px rgba(0, 0, 0, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#00653b';
              e.currentTarget.style.borderColor = 'rgba(108, 194, 74, 0.5)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(108, 194, 74, 0.3), 0 10px 25px -5px rgba(0, 0, 0, 0.2)';
            }}
          >
            {/* Shimmer effect overlay */}
            {!isSubmitting && (
              <span
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(108, 194, 74, 0.3), transparent)',
                  animation: 'shimmer 3s infinite',
                  transform: 'translateX(-100%)',
                  pointerEvents: 'none'
                }}
              />
            )}
            {isSubmitting ? "Subscribing..." : "Join my Newsletter"}
          </Button>
          <style jsx>{`
            @keyframes breathe {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.02); }
            }
            @keyframes glow-pulse {
              0%, 100% {
                box-shadow: 0 0 0 3px rgba(108, 194, 74, 0.3), 0 10px 25px -5px rgba(0, 0, 0, 0.2);
              }
              50% {
                box-shadow: 0 0 0 5px rgba(108, 194, 74, 0.5), 0 0 40px rgba(108, 194, 74, 0.4), 0 10px 25px -5px rgba(0, 0, 0, 0.2);
              }
            }
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(200%); }
            }
          `}</style>
        </div>

        {/* Honeypot field - hidden from users */}
        <input
          {...register('website')}
          type="text"
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Turnstile CAPTCHA - compact mode */}
        <div className="flex justify-center">
          <Turnstile
            siteKey="0x4AAAAAACBfpoWtpO2-JGTD"
            onSuccess={setTurnstileToken}
            onError={() => setTurnstileToken('')}
            onExpire={() => setTurnstileToken('')}
            options={{ theme: 'light' }}
          />
        </div>

        {/* Notification */}
        {notification && (
          <div
            className={`p-4 rounded-lg flex items-start gap-3 ${
              notification.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {notification.type === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
        )}
      </form>
    </div>
  );
}
