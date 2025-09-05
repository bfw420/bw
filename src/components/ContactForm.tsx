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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Heart,
  MapPin,
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
    <section id="contact" className="py-16 bg-gradient-to-br from-[#00653b]/5 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00653b] mb-4">
            Contact Me
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Get in touch with Dr Brian Walker for medical consultations or political matters
          </p>
        </div>

        {/* Contact Information */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-[#00653b]/10">
              <Building2 className="w-8 h-8 text-[#00653b] mx-auto mb-4" />
              <h4 className="font-semibold text-[#00653b] mb-2">Political Office</h4>
              <p className="text-sm text-gray-600 mb-2">Legislative Council of WA</p>
              <p className="text-sm font-medium">brian.walker.mlc@mp.wa.gov.au</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-[#6cc24a]/10">
              <Heart className="w-8 h-8 text-[#6cc24a] mx-auto mb-4" />
              <h4 className="font-semibold text-[#6cc24a] mb-2">Medical Practice</h4>
              <p className="text-sm text-gray-600 mb-2">Next Practice Health - Claremont</p>
              <p className="text-sm font-medium">claremont@nextpracticehealth.com</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <MapPin className="w-8 h-8 text-gray-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-700 mb-2">Office Address</h4>
              <a
                href="https://maps.google.com/?q=2+Parliament+Place,+West+Perth,+WA+6005,+Australia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-[#00653b] transition-colors"
              >
                Office of Dr Brian Walker<br />
                2 Parliament Place<br />
                West Perth, WA 6005
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      placeholder="Your first name"
                    />
                    {errors.firstName && (
                      <p className="text-[#00653b] text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      placeholder="Your last name"
                    />
                    {errors.lastName && (
                      <p className="text-[#00653b] text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-[#00653b] text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    {...register("mobile")}
                    placeholder="Your mobile number (optional)"
                  />
                </div>

                <div>
                  <Label htmlFor="contactType">Contact Type *</Label>
                  <div className="mt-2 space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="political"
                        {...register("contactType")}
                        className="mr-2"
                      />
                      <span>Political Office - Legislative Council matters</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="medical"
                        {...register("contactType")}
                        className="mr-2"
                      />
                      <span>Medical Practice - Health consultations</span>
                    </label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Please write your message here..."
                    rows={8}
                    className="min-h-[200px]"
                  />
                  {errors.message && (
                    <p className="text-[#00653b] text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register("subscribeNewsletter")}
                      className="mr-2"
                    />
                    <span className="text-sm">Subscribe to my newsletter</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register("wantToVolunteer")}
                      className="mr-2"
                    />
                    <span className="text-sm">I want to volunteer</span>
                  </label>
                </div>

                <div>
                  <Label htmlFor="captcha">
                    Simple Math: What is {isMounted ? captchaQuestion.a : "?"} + {isMounted ? captchaQuestion.b : "?"}? *
                  </Label>
                  <Input
                    id="captcha"
                    type="number"
                    {...register("captcha")}
                    placeholder="Enter the answer"
                    disabled={!isMounted}
                  />
                  {errors.captcha && (
                    <p className="text-[#00653b] text-sm mt-1">{errors.captcha.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#00653b] hover:bg-[#00653b]/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}