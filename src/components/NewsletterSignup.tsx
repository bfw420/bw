'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Mail, CheckCircle } from 'lucide-react';
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

      const apiData = {
        firstName: 'Newsletter',
        lastName: 'Subscriber',
        email: data.email,
        mobile: '',
        message: `Newsletter signup from ${source}`,
        subscribeNewsletter: true,
        wantToVolunteer: false,
        contactType: 'political' as const,
        recipientEmail: 'brian.walker.mlc@mp.wa.gov.au',
        website: data.website,
        turnstileToken: turnstileToken,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
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
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              {...register('email')}
              type="email"
              placeholder="Enter your email address"
              className="bg-white border-gray-300 focus:border-[#00653b] focus:ring-[#00653b] h-12"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || !turnstileToken}
            className="bg-gradient-to-r from-[#00653b] to-[#6cc24a] hover:scale-105 transition-transform duration-200 text-white font-bold px-8 h-12"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-5 w-5" />
                Subscribe
              </>
            )}
          </Button>
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
            size="compact"
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
