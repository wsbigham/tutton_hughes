"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        timestamp: serverTimestamp()
      });
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-midnight-blue uppercase mb-4">Contact Us</h1>
          <div className="w-24 h-1 bg-yellow-gold mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions about a vehicle or want to schedule a test drive? We&apos;re here to help. Reach out to us today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-yellow-gold">
              <h2 className="text-2xl font-bold text-midnight-blue mb-6">Dealership Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-midnight-blue p-3 rounded-lg text-yellow-gold">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <p className="font-bold text-midnight-blue">Our Location</p>
                    <p className="text-gray-600">100 Liberty Ln, Jasper, GA 30143</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-midnight-blue p-3 rounded-lg text-yellow-gold">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <p className="font-bold text-midnight-blue">Phone Number</p>
                    <a href="tel:7062532277" className="text-gray-600 hover:text-midnight-blue">(706) 253-2277</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-midnight-blue">
              <h2 className="text-2xl font-bold text-midnight-blue mb-6">Business Hours</h2>
              <ul className="space-y-3">
                <li className="flex justify-between border-b border-gray-100 pb-2 text-gray-600 font-medium">
                  <span>Monday - Friday</span>
                  <span className="text-midnight-blue">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2 text-gray-600 font-medium">
                  <span>Saturday</span>
                  <span className="text-midnight-blue">9:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between text-gray-400 font-medium">
                  <span>Sunday</span>
                  <span className="text-midnight-blue">Closed</span>
                </li>
              </ul>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 bg-gray-300 rounded-xl overflow-hidden relative shadow-md">
               <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-bold bg-gray-200">
                  [Google Maps Embed: 100 Liberty Ln, Jasper, GA]
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-xl shadow-xl border-t-8 border-midnight-blue">
            <h2 className="text-3xl font-bold text-midnight-blue mb-8">Send Us a Message</h2>
            
            {status === "success" ? (
              <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg text-center">
                <div className="text-green-600 mb-4 flex justify-center">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700">Thank you for reaching out. We&apos;ll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-green-800 font-bold underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-midnight-blue uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold focus:outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-midnight-blue uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold focus:outline-none transition-colors"
                      placeholder="Email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-midnight-blue uppercase tracking-wider mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold focus:outline-none transition-colors"
                      placeholder="(706) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-midnight-blue uppercase tracking-wider mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-yellow-gold focus:outline-none transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                
                {status === "error" && (
                  <p className="text-red-600 font-bold">There was an error sending your message. Please try again or call us.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={`w-full bg-midnight-blue text-white font-black py-4 rounded-lg text-lg uppercase tracking-widest shadow-lg transition-all ${status === "submitting" ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-90 active:transform active:scale-[0.98]"}`}
                >
                  {status === "submitting" ? "Sending..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
