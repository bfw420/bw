"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Landmark,
  Cross,
  Send,
  Loader2
} from "lucide-react";
import { Turnstile } from '@marsidev/react-turnstile';
import confetti from 'canvas-confetti';

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message is too long"),
  subscribeNewsletter: z.boolean().default(false),
  wantToVolunteer: z.boolean().default(false),
  contactType: z.enum(["medical", "political"]),
  website: z.string().optional() // Honeypot field
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      message: "",
      contactType: "political" as const,
      subscribeNewsletter: false,
      wantToVolunteer: false,
      website: "" // Honeypot field - should always be empty
    }
  });

  const { register, handleSubmit, formState: { errors }, reset } = form;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00653b', '#6cc24a', '#ffffff']
    });
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Check if Turnstile token is present
      if (!turnstileToken) {
        alert("Please complete the security check");
        setIsSubmitting(false);
        return;
      }

      // Determine recipient email
      const recipientEmail = data.contactType === "medical"
        ? "claremont@nextpracticehealth.com"
        : "brian.walker.mlc@mp.wa.gov.au";

      // Prepare API payload with server-side validation fields
      const apiData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile || "",
        message: data.message,
        subscribeNewsletter: data.subscribeNewsletter,
        wantToVolunteer: data.wantToVolunteer,
        contactType: data.contactType,
        recipientEmail: recipientEmail,
        website: data.website, // Honeypot field
        turnstileToken: turnstileToken
      };

      // Send to API route with server-side validation
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        triggerConfetti();
        setNotification({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
        reset();
        setTurnstileToken(""); // Reset Turnstile token
        // Auto-hide notification after 5 seconds
        setTimeout(() => setNotification(null), 5000);
      } else {
        // Handle specific error messages from server
        setNotification({ type: 'error', message: result.message || 'Failed to send message. Please try again.' });
        setTurnstileToken(""); // Reset Turnstile token on error
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setNotification({ type: 'error', message: 'Something went wrong. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#00653b] mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you need political assistance or medical care, I&apos;m here to help.
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="group bg-white rounded-xl p-6 shadow-md border-2 border-[#00653b]/10 hover:border-[#00653b]/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#00653b]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00653b] transition-colors duration-300">
                  <Landmark className="w-6 h-6 text-[#00653b] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[#00653b] mb-2">Political Office</h3>
                <p className="text-base font-semibold text-gray-900 mb-2">brian.walker.mlc@mp.wa.gov.au</p>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <p className="font-medium mb-1">Office of Dr Brian Walker</p>
                  <p>2 Parliament Place, West Perth, WA 6005</p>
                </div>
                <a
                  href="https://maps.google.com/?q=2+Parliament+Place,+West+Perth,+WA+6005,+Australia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm text-[#00653b] hover:text-[#6cc24a] font-medium transition-colors duration-200"
                >
                  View on Maps →
                </a>
              </div>
            </div>

            <div className="group bg-white rounded-xl p-6 shadow-md border-2 border-[#6cc24a]/10 hover:border-[#6cc24a]/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#6cc24a]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#6cc24a] transition-colors duration-300">
                  <Cross className="w-6 h-6 text-[#6cc24a] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[#6cc24a] mb-2">Medical Practice</h3>
                <p className="text-base font-semibold text-gray-900 mb-2">claremont@nextpracticehealth.com</p>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <p className="font-medium mb-1">Next Practice Health</p>
                  <p>3 Airlie St, Claremont WA 6010</p>
                </div>
                <a
                  href="https://maps.google.com/?q=3+Airlie+St,+Claremont+WA+6010,+Australia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm text-[#6cc24a] hover:text-[#00653b] font-medium transition-colors duration-200"
                >
                  View on Maps →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#00653b] to-[#6cc24a] px-8 py-6">
              <h3 className="text-3xl font-bold text-white text-center">Send me a Message</h3>
              <p className="text-center text-white/90 mt-2">I&apos;ll get back to you as soon as possible</p>
            </div>
            
            <div className="p-6 sm:p-8 md:p-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-base font-medium text-gray-700">First Name *</Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      placeholder="Enter your first name"
                      className="h-14 sm:h-12 text-base border-2 border-gray-200 focus:border-[#00653b] rounded-xl transition-colors"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-base font-medium text-gray-700">Last Name *</Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      placeholder="Enter your last name"
                      className="h-14 sm:h-12 text-base border-2 border-gray-200 focus:border-[#00653b] rounded-xl transition-colors"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium text-gray-700">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="your.email@example.com"
                      className="h-14 sm:h-12 text-base border-2 border-gray-200 focus:border-[#00653b] rounded-xl transition-colors"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="text-base font-medium text-gray-700">Mobile Number</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      {...register("mobile")}
                      placeholder="Your mobile number (optional)"
                      className="h-14 sm:h-12 text-base border-2 border-gray-200 focus:border-[#00653b] rounded-xl transition-colors"
                    />
                  </div>
                </div>

                {/* Contact Type */}
                <div className="space-y-4">
                  <Label className="text-base font-medium text-gray-700">Contact Type *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center p-5 sm:p-4 bg-gray-50 rounded-xl border-2 border-transparent hover:border-[#00653b]/20 cursor-pointer transition-colors min-h-[60px]">
                      <input
                        type="radio"
                        value="political"
                        {...register("contactType")}
                        className="w-6 h-6 sm:w-5 sm:h-5 text-[#00653b] mr-4"
                      />
                      <div>
                        <span className="font-medium text-gray-900">Political Office</span>
                        <p className="text-sm text-gray-600">Legislative Council matters</p>
                      </div>
                    </label>
                    <label className="flex items-center p-5 sm:p-4 bg-gray-50 rounded-xl border-2 border-transparent hover:border-[#6cc24a]/20 cursor-pointer transition-colors min-h-[60px]">
                      <input
                        type="radio"
                        value="medical"
                        {...register("contactType")}
                        className="w-6 h-6 sm:w-5 sm:h-5 text-[#6cc24a] mr-4"
                      />
                      <div>
                        <span className="font-medium text-gray-900">Medical Practice</span>
                        <p className="text-sm text-gray-600">Health consultations</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-base font-medium text-gray-700">Message *</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Please write your message here..."
                    rows={8}
                    className="text-base border-2 border-gray-200 focus:border-[#00653b] rounded-xl resize-none transition-colors"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center p-5 sm:p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors min-h-[60px]">
                      <input
                        type="checkbox"
                        {...register("subscribeNewsletter")}
                        className="w-6 h-6 sm:w-5 sm:h-5 text-[#00653b] mr-4 rounded"
                      />
                      <span className="font-medium text-gray-900">Subscribe to newsletter</span>
                    </label>
                    <label className="flex items-center p-5 sm:p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors min-h-[60px]">
                      <input
                        type="checkbox"
                        {...register("wantToVolunteer")}
                        className="w-6 h-6 sm:w-5 sm:h-5 text-[#00653b] mr-4 rounded"
                      />
                      <span className="font-medium text-gray-900">I want to volunteer</span>
                    </label>
                  </div>
                </div>

                {/* Cloudflare Turnstile */}
                <div className="flex justify-center">
                  <Turnstile
                    siteKey="0x4AAAAAACBfpoWtpO2-JGTD"
                    onSuccess={(token) => setTurnstileToken(token)}
                    onError={() => setTurnstileToken("")}
                    onExpire={() => setTurnstileToken("")}
                  />
                </div>

                {/* Honeypot field - hidden from users but visible to bots */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website (leave blank)</label>
                  <Input
                    id="website"
                    type="text"
                    {...register("website")}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-[#00653b] to-[#6cc24a] hover:from-[#00653b]/90 hover:to-[#6cc24a]/90 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:hover:scale-100 disabled:hover:shadow-none"
                    disabled={isSubmitting}
                    style={{
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 20px 40px -8px rgba(0, 101, 59, 0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = 'scale(1) translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 8px -2px rgba(0, 101, 59, 0.1)';
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-3 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>

                {/* Success/Error Message - Below Submit Button */}
                {notification && (
                  <div className="text-center">
                    <p className={`text-lg font-medium ${
                      notification.type === 'success'
                        ? 'text-[#00653b]'
                        : 'text-red-600'
                    }`}>
                      {notification.message}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}