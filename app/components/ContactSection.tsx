"use client";

import { useState } from "react";
import GithubSVG from "./svg/GithubSVG";
import LinkedinSVG from "./svg/LinkedinSVG";

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
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1800));
    setSending(false);
    setSent(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section
      id="contact"
      className="
    relative z-[1]
    py-[100px] px-8
    max-md:py-[60px]
    bg-gradient-to-b
    from-transparent
    via-primary/5
    to-black/30
  "
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-[0.85rem] mb-3 tracking-[0.2em]">
            // 04. CONTACTO
          </p>

          <h2 className="section-title gradient-text-blue-purple">Hablemos</h2>

          <p className="section-subtitle">
            ¿Tienes un proyecto en mente? ¡Me encantaría escucharte!
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-[1fr_1.4fr] gap-12 items-start max-md:grid-cols-1 contact-grid">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Availability */}
            <div className="glass p-6 rounded-2xl border border-green-400/20">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-[10px] h-[10px] rounded-full bg-green-400 shadow-[0_0_10px_#4ade80] animate-pulse-dot" />
                <span className="text-[0.9rem] font-semibold text-green-400">
                  Disponible para oportunidades
                </span>
              </div>
              <p className="text-[0.85rem] text-muted">
                Actualmente buscando roles de Full Stack Developer o Frontend
                Lead
              </p>
            </div>

            {/* Contact Details */}
            {[
              {
                icon: (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
                label: "Email",
                value: "Guillermo@example.com",
                href: "mailto:Guillermo@example.com",
                color: "#4f8ef7",
              },
              {
                icon: (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
                label: "Ubicación",
                value: "Ciudad de México, México",
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
              <p className="text-[0.85rem] text-muted mb-4">Encuéntrame en</p>

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
                  ¡Mensaje enviado!
                </h3>
                <p className="text-muted text-[0.95rem]">
                  Te responderé lo antes posible. ¡Gracias por contactarme!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-[1.2rem] font-bold text-foreground mb-2">
                  Envíame un mensaje
                </h3>

                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 form-row">
                  <div>
                    <label className="block text-[0.8rem] text-muted mb-2 font-mono">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.8rem] text-muted mb-2 font-mono">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="tu@email.com"
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[0.8rem] text-muted mb-2 font-mono">
                    Asunto *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="¿En qué puedo ayudarte?"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-[0.8rem] text-muted mb-2 font-mono">
                    Mensaje *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Cuéntame sobre tu proyecto o idea..."
                    className="form-input resize-y min-h-[140px]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="
                btn-primary
                w-full
                flex items-center justify-center gap-2
                text-[1rem] py-[14px]
                transition-opacity
                disabled:opacity-80
              "
                >
                  {sending ? (
                    <>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="animate-spin"
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      Enviar Mensaje
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
