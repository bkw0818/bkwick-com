import { useEffect, useRef, useState } from "react";

export function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState("");
  const nameInputRef = useRef(null);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 72);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!isContactDialogOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsContactDialogOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    window.setTimeout(() => nameInputRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isContactDialogOpen]);

  const openContactDialog = () => {
    setContactStatus("");
    setIsContactDialogOpen(true);
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name")?.trim();
    const email = form.get("email")?.trim();
    const phone = form.get("phone")?.trim();
    const message = form.get("message")?.trim();
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      "",
      message,
    ].join("\n");

    setContactStatus("Opening your email app with your message ready to send.");
    window.location.href = `mailto:hello@bkwick.com?subject=${encodeURIComponent(`A note from ${name}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="page-frame">
      <header className={`site-header ${isScrolled ? "is-compact" : ""}`}>
        <a className="signature-mark" href="#top" aria-label="Back to the top">
          <img src="/assets/bkw-signature-mark-transparent.png" alt="BKW signature" />
        </a>

        <button className="header-cta" type="button" onClick={openContactDialog}>
          Let&apos;s talk <span aria-hidden="true">⟶</span>
        </button>
      </header>

      <main>
        <section className="hero-section" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Founder &amp; Director</p>
            <h1 id="hero-title">Better outcomes<br />begin with better<br />questions.</h1>

            <div className="hero-notes" aria-label="Ideas to progress">
              <span>Ideas</span>
              <span>Systems</span>
              <span>People</span>
              <span>Progress</span>
            </div>

            <p className="hero-principle">Curiosity drives<br />a more thoughtful tomorrow.</p>
          </div>

          <figure className="hero-portrait">
            <img className="portrait-sharp" src="/assets/benjamin-wick-cutout.png" alt="Benjamin Keith Wick" />
            <img className="portrait-blur" src="/assets/benjamin-wick-cutout.png" alt="" aria-hidden="true" />
          </figure>

          <aside className="hero-rail" aria-label="Working principles">
            <span>Curiosity</span>
            <span>Discipline</span>
            <span>A more thoughtful tomorrow</span>
          </aside>
        </section>

        <section className="about-section content-section" id="about" aria-labelledby="about-title">
          <div className="section-label">01&nbsp;&nbsp;/&nbsp;&nbsp;About</div>
          <div className="about-grid">
            <div className="about-copy">
              <h2 id="about-title">Better outcomes begin<br />with better questions.</h2>
              <img
                className="process-note-image"
                src="/assets/process-before-tools.png"
                alt="Process before tools."
              />
              <p>
                I&apos;m a systems builder at heart. I&apos;m drawn to the opportunity to make complex
                things simpler — to turn ideas into practical systems that help people do their
                best work.
              </p>
              <p>
                I believe better businesses are built through clarity, consistency, and a focus
                on what really matters.
              </p>
            </div>

            <div className="principle-list" aria-label="Principles">
              {[
                "Clearer thinking",
                "Simpler systems",
                "More human progress",
                "A better tomorrow",
              ].map((principle) => (
                <span key={principle}>
                  <svg className="hand-arrow" viewBox="0 0 54 18" aria-hidden="true">
                    <path d="M2 13 C14 10.5, 29 5.8, 47 8.5 M41 3.5 C44 5.4, 47 7.4, 49 8.5 C46 10.2, 43 12.4, 40.5 14.6" />
                  </svg>
                  {principle}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="tyria-section content-section" id="tyria" aria-labelledby="tyria-title">
          <div className="section-label">02&nbsp;&nbsp;/&nbsp;&nbsp;Tyria</div>
          <div className="tyria-grid">
            <div className="tyria-copy">
              <h2 id="tyria-title">Systems people can<br />actually use.</h2>
              <p>
                Tyria turns complexity into clear, practical operating systems that reduce
                friction, support adoption, and help teams make better progress.
              </p>
              <p className="handwritten-note progress-note">Clarity&nbsp;&nbsp;→&nbsp;&nbsp;Coordination&nbsp;&nbsp;→&nbsp;&nbsp;Progress</p>
            </div>

            <figure className="operating-model" aria-label="Tyria operating model covering people, process, and tools">
              <div className="model-card">
                <h3>Operating Model</h3>
                <div className="model-row">
                  <span>People</span>
                  <em>Right roles.<br />Clear ownership.</em>
                </div>
                <div className="model-row">
                  <span>Process</span>
                  <em>Simpler workflows.<br />Less friction.</em>
                </div>
                <div className="model-row">
                  <span>Tools</span>
                  <em>Support the work.<br />Enable progress.</em>
                </div>
              </div>
            </figure>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-copy">
            <div className="section-label">03&nbsp;&nbsp;/&nbsp;&nbsp;Contact</div>
            <h2 id="contact-title">Good conversations<br />move good work forward.</h2>
            <p>Have a project, a question, or just an idea to explore?<br />I&apos;d love to hear from you.</p>
            <button className="primary-button" type="button" onClick={openContactDialog}>
              Let&apos;s talk <span aria-hidden="true">⟶</span>
            </button>
          </div>

          <div className="contact-signoff">
            <img src="/assets/signature-lockup-hires-transparent.png" alt="Better work ahead, BKW, Benjamin Keith Wick" />
          </div>
        </section>
      </main>

      {isContactDialogOpen && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={() => setIsContactDialogOpen(false)}>
          <section
            className="contact-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="dialog-close"
              type="button"
              aria-label="Close contact form"
              onClick={() => setIsContactDialogOpen(false)}
            >
              ×
            </button>
            <div className="section-label">Let&apos;s talk</div>
            <h2 id="dialog-title">Start a conversation.</h2>
            <p className="dialog-intro">A few details are all I need to begin.</p>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label className="form-field">
                <span>Name</span>
                <input ref={nameInputRef} name="name" type="text" autoComplete="name" required />
              </label>
              <label className="form-field">
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label className="form-field form-field-wide">
                <span>Phone <em>(optional)</em></span>
                <input name="phone" type="tel" autoComplete="tel" />
              </label>
              <label className="form-field form-field-wide">
                <span>Message</span>
                <textarea name="message" rows="3" required />
              </label>
              <div className="form-actions form-field-wide">
                <button className="primary-button" type="submit">
                  Let&apos;s talk <span aria-hidden="true">⟶</span>
                </button>
                <p className="form-status" role="status" aria-live="polite">{contactStatus}</p>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
