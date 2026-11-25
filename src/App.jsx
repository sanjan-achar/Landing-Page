import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ArrowUpRight = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
    <path d="M5.5 14.5 14 6m0 0H6m8 0v8" />
  </svg>
);

function ProductPreview() {
  return (
    <div className="preview-wrap" aria-label="Illustrative preview of Bengaluru vehicle-buying pools">
      <div className="preview-glow" />
      <div className="preview-card">
        <aside className="preview-sidebar">
          <div className="mini-brand">
            <img className="brand-icon mini-mark" src="/clutchh-icon.svg" alt="" />
            <span>clutchh</span>
          </div>
          <div className="sidebar-label">BENGALURU</div>
          <div className="side-link active">
            <span className="side-icon grid-icon">▦</span> Browse pools
          </div>
          <div className="side-link">
            <span className="side-icon">◉</span> Cars
          </div>
          <div className="side-link">
            <span className="side-icon">◇</span> 2-wheelers
          </div>
          <div className="side-link">
            <span className="side-icon">⌑</span> How it works
          </div>
          <div className="sidebar-bottom">
            <span className="sidebar-city-mark">BLR</span>
            <span className="profile-name">Local groups</span>
          </div>
        </aside>
        <section className="preview-main">
          <div className="preview-topbar">
            <span>LOCAL VEHICLE-BUYING GROUPS</span>
            <div className="topbar-actions">
              <span className="topbar-search">⌕ <span>Search vehicles</span></span>
            </div>
          </div>
          <div className="welcome-row">
            <div>
              <p className="eyebrow">MORE BUYERS. MORE BUYING POWER.</p>
              <h2>Find your next ride <span>✳</span></h2>
              <p className="welcome-subtitle">Join a group order and unlock the potential to save more.</p>
            </div>
            <button className="new-task-button" type="button">
              Explore pools <ArrowUpRight />
            </button>
          </div>
          <div className="preview-stats">
            <div className="stat-card">
              <span className="stat-icon mint">⌖</span>
              <div><strong>6</strong><small>Sample local pools</small></div>
              <span className="stat-trend">Bengaluru</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon lilac">◷</span>
              <div><strong>10 days</strong><small>Typical pool window</small></div>
              <span className="stat-trend muted-trend">By group</span>
            </div>
          </div>
          <div className="task-panel">
            <div className="task-panel-heading">
              <div><strong>Sample pools</strong><span>Indicative savings · estimates only</span></div>
              <span className="view-all">See all <ArrowUpRight /></span>
            </div>
            <div className="task-row">
              <span className="car-thumb car-violet">C</span>
              <span className="task-title">Hyundai Creta</span>
              <span className="project-tag tag-violet">Whitefield</span>
              <span className="due-date">~₹45,000*</span>
            </div>
            <div className="task-row">
              <span className="car-thumb car-peach">C</span>
              <span className="task-title">Tata Nexon</span>
              <span className="project-tag tag-peach">Electronic City</span>
              <span className="due-date">~₹38,000*</span>
            </div>
            <div className="task-row">
              <span className="car-thumb car-blue">2W</span>
              <span className="task-title">Ather Rizta</span>
              <span className="project-tag tag-blue">Electronic City</span>
              <span className="due-date">~₹5,500*</span>
            </div>
          </div>
          <div className="preview-note">
            <span className="note-sparkle">✳</span>
            <div><strong>When the group is ready, dealers compete.</strong><span>Compare written offers. Decide for yourself.</span></div>
            <span className="note-arrow">↗</span>
          </div>
        </section>
      </div>
      <div className="floating-note note-top">
        <span className="float-icon">✦</span>
        <span>Local buyers,<br /><strong>stronger together.</strong></span>
      </div>
      <div className="floating-note note-bottom">
        <span className="float-check">✓</span>
        <span><strong>Buyer-first by design</strong><small>No pressure to purchase</small></span>
      </div>
    </div>
  );
}

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const launchUpdatesButtonRef = useRef(null);
  const modalEmailInputRef = useRef(null);

  function handleLaunchUpdatesClick(event) {
    event.preventDefault();
    setNotifyModalOpen(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) return;
    setMessage("Thanks! This preview isn't connected to a mailing list yet.");
    setEmail("");
  }

  useEffect(() => {
    if (!notifyModalOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalEmailInputRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setNotifyModalOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const dialog = document.querySelector(".notify-dialog");
      const focusable = dialog?.querySelectorAll("button, input");
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      launchUpdatesButtonRef.current?.focus();
    };
  }, [notifyModalOpen]);

  return (
    <>
      <main className="page-shell">
      <header className="site-header">
        <a className="brand" href="#" aria-label="Clutch home">
          <img className="brand-icon" src="/clutchh-icon.svg" alt="" />
          <span>clutchh</span>
        </a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#buyer-first">Buyer-first approach</a>
        </nav>
        <a
          className="header-cta"
          href="#notify"
          onClick={handleLaunchUpdatesClick}
          ref={launchUpdatesButtonRef}
          aria-haspopup="dialog"
        >
          Get launch updates <ArrowUpRight />
        </a>
      </header>

      <section className="hero" id="about">
        <div className="hero-copy">
          <div className="launch-pill"><span className="live-dot" /> BENGALURU'S LOCAL VEHICLE-BUYING GROUPS</div>
          <h1>Buy together.<br /><span>Save more.</span></h1>
          <p className="hero-description">
            Join local buyers looking for the same car or bike. By combining demand in a group order, Clutchh helps you get better dealer offers and save more.
          </p>
          <form className="notify-form" id="notify" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="email">Your email address</label>
            <input
              id="email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage("");
              }}
              required
            />
            <button type="submit">Get launch updates <ArrowUpRight /></button>
          </form>
          {message && <p className="form-message visible" aria-live="polite">{message}</p>}
          <div className="hero-proof">
            <div className="vehicle-tags" aria-label="Cars and two-wheelers in Bengaluru">
              <span>Cars</span>
              <span>2-wheelers</span>
            </div>
            <span>Better prices through group buying.</span>
          </div>
        </div>
        <ProductPreview />
      </section>

      <section className="how-it-works" id="how-it-works" aria-labelledby="how-heading">
        <div className="how-heading">
          <div className="section-kicker">A better deal, in three steps</div>
          <h2 id="how-heading">More buyers. Better deals. Bigger savings.</h2>
        </div>
        <div className="how-steps">
          <article className="how-step">
            <span className="how-step-number">01</span>
            <h3>Choose your ride</h3>
            <p>Browse local car and two-wheeler pools.</p>
          </article>
          <article className="how-step">
            <span className="how-step-number">02</span>
            <h3>Join the group</h3>
            <p>Team up with buyers looking for the same ride.</p>
          </article>
          <article className="how-step">
            <span className="how-step-number">03</span>
            <h3>Save together</h3>
            <p>Compare group offers from participating dealers.</p>
          </article>
        </div>
      </section>

      <section className="buyer-note" id="buyer-first">
        <span className="buyer-note-icon">✓</span>
        <p><strong>Your interest. Your decision. Your money.</strong> Savings are indicative, not guaranteed. Compare clear, itemized dealer offers and choose whether to proceed.</p>
        <span className="buyer-note-caption">Coming soon · Bengaluru</span>
      </section>

      <footer className="site-footer">
        <span>© 2026 Clutchh. Buy together, drive a better deal.</span>
        <span className="footer-status"><span className="live-dot" /> Sample pools · Indicative figures only</span>
      </footer>
      </main>
      {notifyModalOpen && createPortal(
        <div
          className="notify-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setNotifyModalOpen(false);
          }}
        >
          <section
            className="notify-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="notify-dialog-title"
            aria-describedby="notify-dialog-description"
          >
            <button
              className="notify-dialog-close"
              type="button"
              aria-label="Close launch updates dialog"
              onClick={() => setNotifyModalOpen(false)}
            >
              ×
            </button>
            <div className="launch-pill"><span className="live-dot" /> COMING SOON TO BENGALURU</div>
            <h2 id="notify-dialog-title">Be first to save more.</h2>
            <p className="notify-dialog-description" id="notify-dialog-description">
              Get launch updates when Clutchh group-buying pools open near you.
            </p>
            <form className="notify-form notify-dialog-form" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="notify-modal-email">Your email address</label>
              <input
                ref={modalEmailInputRef}
                id="notify-modal-email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setMessage("");
                }}
                required
              />
              <button type="submit">Get launch updates <ArrowUpRight /></button>
            </form>
            {message && <p className="form-message visible" aria-live="polite">{message}</p>}
          </section>
        </div>,
        document.body,
      )}
    </>
  );
}

export default App;
