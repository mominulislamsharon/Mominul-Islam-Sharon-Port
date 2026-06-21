"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = Boolean((session?.user as { isAdmin?: boolean })?.isAdmin);
  const pillRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  const handleLogoClick = (e: React.MouseEvent) => {
    setLogoClicks((prev) => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        signIn("google"); // This logs in and stays on the same page!
        return 0;
      }
      return newCount;
    });

    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => setLogoClicks(0), 1000); // 1 second threshold
  };

  useEffect(() => {
    const idx = links.findIndex((l) => l.href === pathname);
    setActiveIndex(idx >= 0 ? idx : 0);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill || mobileOpen) return;

    const linkEls = nav.querySelectorAll<HTMLElement>(".nav-link-item");
    const el = linkEls[activeIndex];
    if (!el) return;

    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    pill.style.left = `${elRect.left - navRect.left}px`;
    pill.style.width = `${elRect.width}px`;
  }, [activeIndex, mobileOpen]);

  const movePillToIndex = (i: number) => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;

    const els = nav.querySelectorAll<HTMLElement>(".nav-link-item");
    const el = els[i];
    if (!el) return;

    const navRect = nav.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    pill.style.left = `${rect.left - navRect.left}px`;
    pill.style.width = `${rect.width}px`;
  };

  const handleHireClick = () => {
    if (isAdmin) {
      signOut();
    } else {
      router.push("/contact");
    }
    setMobileOpen(false);
  };

  const hireLabel = isAdmin ? "Logout" : "Hire Me";

  return (
    <header className="navbar-header">
      <div className="navbar-inner">
        <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <Link href="/" className="navbar-logo" onClick={(e) => { if (logoClicks > 0) e.preventDefault(); }}>
            MS.
          </Link>
        </div>

        {/* Laptop / desktop — center pill menu */}
        <nav ref={navRef} className="navbar-desktop-nav" aria-label="Main">
          <div ref={pillRef} className="navbar-pill" />
          <div className="navbar-links-row">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link-item navbar-link ${pathname === link.href
                    ? "navbar-link--active"
                    : "navbar-link--idle"
                  }`}
                onMouseEnter={() => movePillToIndex(i)}
                onMouseLeave={() => movePillToIndex(activeIndex)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="navbar-actions">
          {isAdmin && (
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              style={{
                padding: "8px 16px",
                borderRadius: "100px",
                fontSize: "13px",
                fontWeight: 600,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(124,58,237,0.3)",
                color: "#f1f5f9",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
              className="navbar-hire-btn--desktop"
            >
              ⚙ Dashboard
            </button>
          )}

          <button
            type="button"
            className="navbar-hire-btn navbar-hire-btn--desktop"
            onClick={handleHireClick}
          >
            <span className="navbar-hire-dot" />
            {hireLabel}
          </button>

          <button
            type="button"
            className={`navbar-menu-btn ${mobileOpen ? "navbar-menu-btn--open" : ""}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="navbar-menu-bar" />
            <span className="navbar-menu-bar" />
            <span className="navbar-menu-bar" />
          </button>
        </div>
      </div>

      {/* Mobile — dropdown links */}
      <div
        className={`navbar-mobile-panel ${mobileOpen ? "navbar-mobile-panel--open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`navbar-mobile-link ${pathname === link.href
                ? "navbar-mobile-link--active"
                : "navbar-mobile-link--idle"
              }`}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <button
          type="button"
          className="navbar-hire-btn navbar-hire-btn--mobile-full"
          onClick={handleHireClick}
        >
          <span className="navbar-hire-dot" />
          {hireLabel}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
