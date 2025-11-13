"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2, CheckCircle2, Facebook, Instagram, Youtube, Twitter } from "lucide-react";

// Custom social media icons
const PatreonIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003"/>
  </svg>
);

const BlueskyIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.038.409-.056-2.36.335-5.365 1.166-5.608 3.713-.24 2.548 2.016 3.27 5.06 3.27 3.043 0 4.727-1.065 5.132-2.286.405 1.221 2.09 2.286 5.132 2.286 3.045 0 5.3-.722 5.06-3.27-.243-2.547-3.247-3.378-5.608-3.713.134.018.273.036.409.056 2.67.296 5.568-.628 6.383-3.364.246-.829.624-5.79.624-6.479 0-.688-.139-1.86-.902-2.203-.659-.299-1.664-.621-4.3 1.24C16.046 4.747 13.087 8.686 12 10.8"/>
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1"/>
  </svg>
);

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  subscribeNewsletter: z.boolean().default(false),
  wantToVolunteer: z.boolean().default(false),
  captcha: z.string().min(1, "Please complete the captcha")
});

type FormData = z.infer<typeof formSchema>;

export default function FormPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState({ a: 0, b: 0, answer: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Generate captcha only on client side
  useEffect(() => {
    const generateCaptcha = () => {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      return { a, b, answer: a + b };
    };

    setCaptchaQuestion(generateCaptcha());
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      message: "",
      subscribeNewsletter: false,
      wantToVolunteer: false,
      captcha: ""
    }
  });

  const { register, handleSubmit, formState: { errors }, reset } = form;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Validate captcha
      if (parseInt(data.captcha) !== captchaQuestion.answer) {
        alert("Incorrect captcha answer. Please try again.");
        const generateNewCaptcha = () => {
          const a = Math.floor(Math.random() * 10) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          return { a, b, answer: a + b };
        };
        setCaptchaQuestion(generateNewCaptcha());
        setIsSubmitting(false);
        return;
      }

      // Always send to MLC email (political contact type)
      const webhookData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile || "",
        message: data.message,
        subscribeNewsletter: data.subscribeNewsletter,
        wantToVolunteer: data.wantToVolunteer,
        contactType: "political",
        recipientEmail: "brian.walker.mlc@mp.wa.gov.au",
        submittedAt: new Date().toISOString()
      };

      // Send to API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        triggerConfetti();
        setIsSuccess(true);
        reset();

        // Generate new captcha
        const generateNewCaptcha = () => {
          const a = Math.floor(Math.random() * 10) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          return { a, b, answer: a + b };
        };
        setCaptchaQuestion(generateNewCaptcha());

        // Redirect to home page after 10 seconds
        setTimeout(() => {
          router.push('/');
        }, 10000);
      } else {
        throw new Error(result.message || `API failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Sorry, there was an error sending your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#00653b] mb-2">
            Contact Dr Brian Walker MLC
          </h1>
          <p className="text-gray-600">
            Send a message to my political office
          </p>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-2xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-900">Message sent successfully!</p>
              <p className="text-sm text-green-700">We&apos;ll get back to you soon.</p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  placeholder="First name"
                  className="h-11 border-2 border-gray-200 focus:border-[#00653b] rounded-lg"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Last name"
                  className="h-11 border-2 border-gray-200 focus:border-[#00653b] rounded-lg"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="your.email@example.com"
                className="h-11 border-2 border-gray-200 focus:border-[#00653b] rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Mobile */}
            <div className="space-y-1.5">
              <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">
                Mobile (optional)
              </Label>
              <Input
                id="mobile"
                type="tel"
                {...register("mobile")}
                placeholder="Your mobile number"
                className="h-11 border-2 border-gray-200 focus:border-[#00653b] rounded-lg"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                Message *
              </Label>
              <Textarea
                id="message"
                {...register("message")}
                placeholder="Write your message here..."
                rows={12}
                className="border-2 border-gray-200 focus:border-[#00653b] rounded-lg resize-none"
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("subscribeNewsletter")}
                  className="w-5 h-5 mt-0.5 text-[#00653b] rounded border-gray-300 focus:ring-[#00653b]"
                />
                <span className="text-sm text-gray-700">Subscribe to newsletter</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("wantToVolunteer")}
                  className="w-5 h-5 mt-0.5 text-[#00653b] rounded border-gray-300 focus:ring-[#00653b]"
                />
                <span className="text-sm text-gray-700">I want to volunteer</span>
              </label>
            </div>

            {/* Captcha */}
            <div className="space-y-1.5">
              <Label htmlFor="captcha" className="text-sm font-medium text-gray-700">
                What is {isMounted ? captchaQuestion.a : "?"} + {isMounted ? captchaQuestion.b : "?"}? *
              </Label>
              <Input
                id="captcha"
                type="number"
                {...register("captcha")}
                placeholder="Answer"
                disabled={!isMounted}
                className="h-11 border-2 border-gray-200 focus:border-[#00653b] rounded-lg max-w-24"
              />
              {errors.captcha && (
                <p className="text-red-500 text-xs mt-1">{errors.captcha.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#00653b] to-[#6cc24a] hover:from-[#00653b]/90 hover:to-[#6cc24a]/90 rounded-lg transition-all duration-200 hover:shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-4 mt-6 mb-4">
          <a
            href="https://www.facebook.com/BrianWalkerMLC/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#00653b] transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/brianwalkermlc/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#00653b] transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCCIGBIf3b385BV5d48Y1U2A"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#00653b] transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href="https://www.patreon.com/cw/DrBrianWalkerMLC"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#00653b] transition-colors"
            aria-label="Patreon"
          >
            <PatreonIcon />
          </a>
          <a
            href="https://bsky.app/profile/bfw.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#00653b] transition-colors"
            aria-label="Bluesky"
          >
            <BlueskyIcon />
          </a>
          <a
            href="https://x.com/BrianWalkerMLC"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#00653b] transition-colors"
            aria-label="X (Twitter)"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="https://www.tiktok.com/@brianwalkermlc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#00653b] transition-colors"
            aria-label="TikTok"
          >
            <TikTokIcon />
          </a>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          <p>
            <a
              href="/"
              className="hover:text-[#00653b] transition-colors"
            >
              Office of Dr Brian Walker MLC
            </a>
          </p>
          <p>
            <a
              href="https://maps.google.com/?q=2+Parliament+Place,+West+Perth,+WA+6005,+Australia"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00653b] transition-colors"
            >
              2 Parliament Place, West Perth, WA 6005
            </a>
          </p>
          <p>
            <a
              href="mailto:brian.walker.mlc@mp.wa.gov.au"
              className="hover:text-[#00653b] transition-colors"
            >
              brian.walker.mlc@mp.wa.gov.au
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
