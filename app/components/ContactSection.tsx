"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Loader, Send } from "lucide-react";
import toast from "react-hot-toast";
import { sendContactEmail } from "@/lib/emailjs";
import { PROFILE } from "@/lib/profile";

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

  const row = "grid grid-cols-[6rem_1fr] gap-4 border-b border-rule py-3";

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <header className="section-head">
        <h2 id="contact-title" className="h2">
          <span className="h2-num">4</span>Contact
        </h2>
        <p className="lede">
          Have a project in mind? I&apos;d love to hear about it!
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-ok">
            <span aria-hidden="true" className="size-2 bg-ok" />
            Available for opportunities
          </p>

          <dl className="mt-6 border-t border-ink">
            <div className={row}>
              <dt className="label pt-1">Email</dt>
              <dd className="min-w-0 text-sm font-medium">
                <a href={`mailto:${PROFILE.email}`} className="link break-all">
                  {PROFILE.email}
                </a>
              </dd>
            </div>
            <div className={row}>
              <dt className="label pt-1">Location</dt>
              <dd className="text-sm font-medium">{PROFILE.location}</dd>
            </div>
            <div className={row}>
              <dt className="label pt-1">GitHub</dt>
              <dd className="text-sm font-medium">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-flex items-center gap-1"
                >
                  github.com/sebashidalgo{" "}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </dd>
            </div>
            <div className={row}>
              <dt className="label pt-1">LinkedIn</dt>
              <dd className="text-sm font-medium">
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-flex items-center gap-1"
                >
                  guillermo-hidalgo-alvarado{" "}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7">
          <div className="sheet p-6 sm:p-8">
            {sent ? (
              <div
                role="status"
                className="flex flex-col items-start gap-4 py-6"
              >
                <span className="flex size-10 items-center justify-center bg-ok text-paper">
                  <Check size={20} aria-hidden="true" />
                </span>
                <h3 className="text-xl font-bold">Message sent!</h3>
                <p className="max-w-[48ch] text-ink-2">
                  I will get back to you as soon as possible. Thank you for
                  contacting me!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-xl font-bold">Send me a message</h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="label mb-2 block">
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="input"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="label mb-2 block">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder="your.email@example.com"
                      className="input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="label mb-2 block">
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
                    className="input"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="label mb-2 block">
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
                    className="input min-h-[140px] resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn btn-primary sm:self-start"
                >
                  {sending ? (
                    <>
                      <Loader
                        size={16}
                        className="animate-spin"
                        aria-hidden="true"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} aria-hidden="true" />
                      Send message
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
