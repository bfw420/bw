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
  Mail, 
  Phone, 
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

      // Send to webhook
      const response = await fetch("https://n8n.jaxius.net/webhook/6cffe9fc-d8f8-4fdd-8a0d-0b9f94ecadc5", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });

      if (response.ok) {
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
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Sorry, there was an error sending your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Me
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get in touch with Dr Brian Walker for medical consultations or political matters
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
            </div>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <Mail className="w-5 h-5" />
                  Political Office
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">Legislative Council of Western Australia</p>
                <p className="text-sm text-gray-500 mb-3">
                  For political matters, policy questions, and parliamentary business
                </p>
                <p className="font-medium">brian.walker.mlc@mp.wa.gov.au</p>
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-accent">
                  <Phone className="w-5 h-5" />
                  Medical Practice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">Next Practice Health - Claremont</p>
                <p className="text-sm text-gray-500 mb-3">
                  For medical consultations and health-related inquiries
                </p>
                <p className="font-medium">claremont@nextpracticehealth.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  Office Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  2 Parliament Place<br />
                  West Perth, WA 6005<br />
                  Australia
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
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
                      <p className="text-primary text-sm mt-1">{errors.firstName.message}</p>
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
                      <p className="text-primary text-sm mt-1">{errors.lastName.message}</p>
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
                    <p className="text-primary text-sm mt-1">{errors.email.message}</p>
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
                    rows={5}
                  />
                  {errors.message && (
                    <p className="text-primary text-sm mt-1">{errors.message.message}</p>
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
                    <p className="text-primary text-sm mt-1">{errors.captcha.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
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