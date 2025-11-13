"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

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

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
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

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>Office of Dr Brian Walker MLC</p>
          <p>2 Parliament Place, West Perth, WA 6005</p>
          <p>brian.walker.mlc@mp.wa.gov.au</p>
        </div>
      </div>
    </div>
  );
}
