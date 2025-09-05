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
import {
  Landmark,
  Cross,
  Send,
  Loader2
} from "lucide-react";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  subscribeNewsletter: z.boolean().default(false),
  wantToVolunteer: z.boolean().default(false),
  contactType: z.enum(["medical", "political"]),
  captcha: z.string().min(1, "Please complete the captcha")
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState({ a: 0, b: 0, answer: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Generate captcha only on client side to avoid hydration mismatch
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

  const onSubmit = async (data: ContactFormData) => {
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

      // Determine recipient email
      const recipientEmail = data.contactType === "medical" 
        ? "claremont@nextpracticehealth.com" 
        : "brian.walker.mlc@mp.wa.gov.au";

      // Prepare webhook payload
      const webhookData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile || "",
        message: data.message,
        subscribeNewsletter: data.subscribeNewsletter,
        wantToVolunteer: data.wantToVolunteer,
        contactType: data.contactType,
        recipientEmail: recipientEmail,
        submittedAt: new Date().toISOString()
      };

      // Send to our API route which forwards to the webhook
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });

      const result = await response.json();
      console.log('API response:', result);
      
      if (response.ok && result.success) {
        triggerConfetti();
        alert("Thank you! Your message has been sent successfully.");
        reset();
        // Generate new captcha
        const generateNewCaptcha = () => {
          const a = Math.floor(Math.random() * 10) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          return { a, b, answer: a + b };
        };
        setCaptchaQuestion(generateNewCaptcha());
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
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="group bg-white rounded-2xl p-8 shadow-lg border-2 border-[#00653b]/10 hover:border-[#00653b]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#00653b]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00653b] transition-colors duration-300">
                  <Landmark className="w-8 h-8 text-[#00653b] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-[#00653b] mb-3">Political Office</h3>
                <p className="text-lg font-semibold text-gray-900 mb-2">brian.walker.mlc@mp.wa.gov.au</p>
                <div className="text-gray-600 leading-relaxed">
                  <p className="font-medium mb-1">Office of Dr Brian Walker</p>
                  <p>2 Parliament Place, West Perth, WA 6005</p>
                </div>
                <a
                  href="https://maps.google.com/?q=2+Parliament+Place,+West+Perth,+WA+6005,+Australia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-[#00653b] hover:text-[#6cc24a] font-medium transition-colors duration-200"
                >
                  View on Maps →
                </a>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg border-2 border-[#6cc24a]/10 hover:border-[#6cc24a]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#6cc24a]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#6cc24a] transition-colors duration-300">
                  <Cross className="w-8 h-8 text-[#6cc24a] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-[#6cc24a] mb-3">Medical Practice</h3>
                <p className="text-lg font-semibold text-gray-900 mb-2">claremont@nextpracticehealth.com</p>
                <div className="text-gray-600 leading-relaxed">
                  <p className="font-medium mb-1">Next Practice Health</p>
                  <p>3 Airlie St, Claremont WA 6010</p>
                </div>
                <a
                  href="https://maps.google.com/?q=3+Airlie+St,+Claremont+WA+6010,+Australia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-[#6cc24a] hover:text-[#00653b] font-medium transition-colors duration-200"
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
            
            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-base font-medium text-gray-700">First Name *</Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      placeholder="Enter your first name"
                      className="h-12 text-base border-2 border-gray-200 focus:border-[#00653b] rounded-xl transition-colors"
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
                      className="h-12 text-base border-2 border-gray-200 focus:border-[#00653b] rounded-xl transition-colors"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium text-gray-700">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="your.email@example.com"
                      className="h-12 text-base border-2 border-gray-200 focus:border-[#00653b] rounded-xl transition-colors"
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
                      className="h-12 text-base border-2 border-gray-200 focus:border-[#00653b] rounded-xl transition-colors"
                    />
                  </div>
                </div>

                {/* Contact Type */}
                <div className="space-y-4">
                  <Label className="text-base font-medium text-gray-700">Contact Type *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center p-4 bg-gray-50 rounded-xl border-2 border-transparent hover:border-[#00653b]/20 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        value="political"
                        {...register("contactType")}
                        className="w-5 h-5 text-[#00653b] mr-4"
                      />
                      <div>
                        <span className="font-medium text-gray-900">Political Office</span>
                        <p className="text-sm text-gray-600">Legislative Council matters</p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 bg-gray-50 rounded-xl border-2 border-transparent hover:border-[#6cc24a]/20 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        value="medical"
                        {...register("contactType")}
                        className="w-5 h-5 text-[#6cc24a] mr-4"
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
                    rows={6}
                    className="text-base border-2 border-gray-200 focus:border-[#00653b] rounded-xl resize-none transition-colors"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <input
                        type="checkbox"
                        {...register("subscribeNewsletter")}
                        className="w-5 h-5 text-[#00653b] mr-4 rounded"
                      />
                      <span className="font-medium text-gray-900">Subscribe to newsletter</span>
                    </label>
                    <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <input
                        type="checkbox"
                        {...register("wantToVolunteer")}
                        className="w-5 h-5 text-[#00653b] mr-4 rounded"
                      />
                      <span className="font-medium text-gray-900">I want to volunteer</span>
                    </label>
                  </div>
                </div>

                {/* Captcha */}
                <div className="space-y-2">
                  <Label htmlFor="captcha" className="text-base font-medium text-gray-700">
                    Security Check: What is {isMounted ? captchaQuestion.a : "?"} + {isMounted ? captchaQuestion.b : "?"}? *
                  </Label>
                  <Input
                    id="captcha"
                    type="number"
                    {...register("captcha")}
                    placeholder="Answer"
                    disabled={!isMounted}
                    className="h-12 text-base border-2 border-gray-200 focus:border-[#00653b] rounded-xl transition-colors max-w-32"
                  />
                  {errors.captcha && (
                    <p className="text-red-500 text-sm mt-1">{errors.captcha.message}</p>
                  )}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}