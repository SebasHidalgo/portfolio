"use client";

import { useState } from "react";

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
      style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 2rem",
        background:
          "linear-gradient(180deg, transparent, rgba(79,142,247,0.05), rgba(0,0,0,0.3))",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p
            style={{
              color: "#4f8ef7",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.85rem",
              marginBottom: "0.75rem",
              letterSpacing: "0.2em",
            }}
          >
            // 04. CONTACTO
          </p>
          <h2 className="section-title gradient-text-blue-purple">Hablemos</h2>
          <p className="section-subtitle">
            ¿Tienes un proyecto en mente? ¡Me encantaría escucharte!
          </p>
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left - Contact info */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Availability */}
            <div
              className="glass"
              style={{
                padding: "1.5rem",
                borderRadius: "16px",
                borderColor: "rgba(34, 197, 94, 0.2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#4ade80",
                    boxShadow: "0 0 10px #4ade80",
                  }}
                  className="animate-pulse-dot"
                />
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "#4ade80",
                  }}
                >
                  Disponible para oportunidades
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "#8892b0" }}>
                Actualmente buscando roles de Full Stack Developer o Frontend
                Lead
              </p>
            </div>

            {/* Contact details */}
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
                value: "sebastian@example.com",
                href: "mailto:sebastian@example.com",
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
                className="glass"
                style={{
                  padding: "1.25rem 1.5rem",
                  borderRadius: "12px",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.color,
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#8892b0",
                      marginBottom: "2px",
                    }}
                  >
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        fontSize: "0.9rem",
                        color: "#f0f0ff",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "#f0f0ff",
                        fontWeight: 500,
                      }}
                    >
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div
              className="glass"
              style={{ padding: "1.5rem", borderRadius: "12px" }}
            >
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#8892b0",
                  marginBottom: "1rem",
                }}
              >
                Encuéntrame en
              </p>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                {[
                  {
                    href: "https://github.com",
                    label: "GitHub",
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    ),
                    bg: "#4f8ef7",
                  },
                  {
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                    bg: "#a855f7",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 18px",
                      background: `${s.bg}15`,
                      border: `1px solid ${s.bg}30`,
                      borderRadius: "10px",
                      color: s.bg,
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      transition: "all 0.3s ease",
                      flex: 1,
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        `${s.bg}25`;
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        `0 0 20px ${s.bg}30`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        `${s.bg}15`;
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    {s.icon}
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Contact form */}
          <div
            className="glass"
            style={{ padding: "2.5rem", borderRadius: "20px" }}
          >
            {sent ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div style={{ fontSize: "4rem" }}>🚀</div>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#4ade80",
                  }}
                >
                  ¡Mensaje enviado!
                </h3>
                <p style={{ color: "#8892b0", fontSize: "0.95rem" }}>
                  Te responderé lo antes posible. ¡Gracias por contactarme!
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#f0f0ff",
                    marginBottom: "0.5rem",
                  }}
                >
                  Envíame un mensaje
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                  className="form-row"
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        color: "#8892b0",
                        marginBottom: "8px",
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="contact-name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        color: "#8892b0",
                        marginBottom: "8px",
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="contact-email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="tu@email.com"
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      color: "#8892b0",
                      marginBottom: "8px",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    Asunto *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="contact-subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="¿En qué puedo ayudarte?"
                    className="form-input"
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      color: "#8892b0",
                      marginBottom: "8px",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    Mensaje *
                  </label>
                  <textarea
                    name="message"
                    id="contact-message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Cuéntame sobre tu proyecto o idea..."
                    className="form-input"
                    style={{ resize: "vertical", minHeight: "140px" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    opacity: sending ? 0.8 : 1,
                    fontSize: "1rem",
                    padding: "14px",
                  }}
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
                        style={{ animation: "spin-slow 1s linear infinite" }}
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

      {/* Footer */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "5rem auto 0",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#4a5568",
            fontSize: "0.9rem",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              background: "linear-gradient(135deg, #4f8ef7, #a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "0.75rem",
            }}
          >
            SB
          </div>
          <span>Sebastian Bernal</span>
        </div>
        <p style={{ color: "#4a5568", fontSize: "0.85rem" }}>
          © {new Date().getFullYear()} · Diseñado & construido con{" "}
          <span style={{ color: "#ef4444" }}>❤</span> y mucho ☕
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#4a5568",
              fontSize: "0.85rem",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#4f8ef7")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#4a5568")}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#4a5568",
              fontSize: "0.85rem",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#a855f7")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#4a5568")}
          >
            LinkedIn
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
