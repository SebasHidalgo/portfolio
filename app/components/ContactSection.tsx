"use client";

import { useState } from "react";
import GithubSVG from "./svg/GithubSVG";
import LinkedinSVG from "./svg/LinkedinSVG";
import { Loader, Mail, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { sendContactEmail } from "@/lib/emailjs";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await sendContactEmail(formData);

      setSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent successfully!");
      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative z-1 py-[100px] px-8 max-md:py-[60px] bg-linear-to-b from-transparent via-primary/5 to-black/30"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-[0.85rem] mb-3 tracking-[0.2em]">
            // 04. CONTACT
          </p>

          <h2 className="section-title gradient-text-blue-purple">
            Let's Talk
          </h2>

          <p className="section-subtitle">
            Have a project in mind? I'd love to hear about it!
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-[1fr_1.4fr] gap-12 items-start max-md:grid-cols-1 contact-grid">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Availability */}
            <div className="glass p-6 rounded-2xl border border-green-400/20">
              <div className="flex items-center justify-center gap-2.5">
                <span className="w-[10px] h-[10px] rounded-full bg-green-400 shadow-[0_0_10px_#4ade80] animate-pulse-dot" />
                <span className="text-[0.9rem] font-semibold text-green-400">
                  Available for opportunities
                </span>
              </div>
            </div>

            {/* Contact Details */}
            {[
              {
                icon: <Mail size={18} />,
                label: "Email",
                value: "sebas.hidalgo2004@gmail.com",
                href: "sebas.hidalgo2004@gmail.com",
                color: "#4f8ef7",
              },
              {
                icon: <MapPin size={18} />,
                label: "Location",
                value: "San José, Costa Rica",
                href: null,
                color: "#a855f7",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass px-6 py-5 rounded-xl flex gap-4 items-center"
              >
                <div
                  className="w-[42px] h-[42px] rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>

                <div>
                  <p className="text-[0.75rem] text-muted mb-[2px]">
                    {item.label}
                  </p>

                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-[0.9rem] text-foreground font-medium no-underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[0.9rem] text-foreground font-medium">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="glass p-6 rounded-xl">
              <p className="text-[0.85rem] text-muted mb-4">Find me on</p>

              <div className="flex gap-3">
                {[
                  {
                    href: "https://github.com/sebashidalgo",
                    label: "GitHub",
                    bg: "#4f8ef7",
                    icon: <GithubSVG width={20} height={20} />,
                  },
                  {
                    href: "https://linkedin.com/in/guillermo-hidalgo-alvarado",
                    label: "LinkedIn",
                    bg: "#a855f7",
                    icon: <LinkedinSVG width={20} height={20} />,
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-[0.875rem] transition-all duration-300 flex-1 hover:shadow-lg"
                    style={{
                      background: `${s.bg}15`,
                      border: `1px solid ${s.bg}30`,
                      color: s.bg,
                    }}
                  >
                    {s.icon}
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="glass p-10 rounded-[20px]">
            {sent ? (
              <div className="text-center py-12 px-4 flex flex-col items-center gap-4">
                <div className="text-[4rem]">🚀</div>
                <h3 className="text-[1.3rem] font-bold text-green-400">
                  Message sent!
                </h3>
                <p className="text-muted text-[0.95rem]">
                  I will get back to you as soon as possible. Thank you for
                  contacting me!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-[1.2rem] font-bold text-foreground mb-2">
                  Send me a message
                </h3>

                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 form-row">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[0.8rem] text-muted mb-2 font-mono"
                    >
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[0.8rem] text-muted mb-2 font-mono"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-[0.8rem] text-muted mb-2 font-mono"
                  >
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What can I help you with?"
                    className="form-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[0.8rem] text-muted mb-2 font-mono"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell me about your project or idea..."
                    className="form-input resize-y min-h-[140px]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-[1rem] py-[14px] transition-opacity disabled:opacity-80"
                >
                  {sending ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
