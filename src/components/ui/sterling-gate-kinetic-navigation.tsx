import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export function Component() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isFirstRender = useRef(true);
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Initial Setup & Kinetic Hover Effects
  useEffect(() => {
    if (!containerRef.current) return;

    // Register custom easing
    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.6 });
      }
    } catch {
      gsap.defaults({ ease: "power2.out", duration: 0.6 });
    }

    const navWrap = containerRef.current.querySelector(".nav-overlay-wrapper");
    const menu = containerRef.current.querySelector(".menu-content");
    const overlay = containerRef.current.querySelector(".overlay");
    const bgPanels = containerRef.current.querySelectorAll(".backdrop-layer");
    const menuLinks = containerRef.current.querySelectorAll(".nav-link");

    // Initialize hidden state
    gsap.set(navWrap, { display: "none" });
    gsap.set(menu, { xPercent: 120 });
    gsap.set(overlay, { autoAlpha: 0 });
    gsap.set(bgPanels, { xPercent: 101 });
    gsap.set(menuLinks, { yPercent: 120, opacity: 0 });

    // Kinetic Shape Hover Setup
    const menuItems = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
    const shapesContainer = containerRef.current.querySelector(".ambient-background-shapes");

    menuItems.forEach((item) => {
      const shapeIndex = item.getAttribute("data-shape");
      const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;
      if (!shape) return;

      const shapeEls = shape.querySelectorAll(".shape-element");

      const onEnter = () => {
        if (shapesContainer) {
          shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
        }
        shape.classList.add("active");

        gsap.fromTo(
          shapeEls,
          { scale: 0.5, opacity: 0, rotation: -10 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.5, stagger: 0.06, ease: "back.out(1.7)", overwrite: "auto" }
        );
      };

      const onLeave = () => {
        gsap.to(shapeEls, {
          scale: 0.8,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => shape.classList.remove("active"),
          overwrite: "auto"
        });
      };

      item.addEventListener("mouseenter", onEnter);
      item.addEventListener("mouseleave", onLeave);

      (item as any)._cleanup = () => {
        item.removeEventListener("mouseenter", onEnter);
        item.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
        items.forEach((item: any) => item._cleanup && item._cleanup());
      }
    };
  }, []);

  // 2. Menu Open/Close Sliding Timeline
  useEffect(() => {
    if (!containerRef.current) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const navWrap = containerRef.current.querySelector(".nav-overlay-wrapper") as HTMLElement | null;
    const menu = containerRef.current.querySelector(".menu-content");
    const overlay = containerRef.current.querySelector(".overlay");
    const bgPanels = containerRef.current.querySelectorAll(".backdrop-layer");
    const menuLinks = containerRef.current.querySelectorAll(".nav-link");
    const menuButton = containerRef.current.querySelector(".nav-close-btn");
    const menuButtonTexts = menuButton?.querySelectorAll("p");
    const menuButtonIcon = menuButton?.querySelector(".menu-button-icon");

    if (isMenuOpen) {
      if (navWrap) {
        navWrap.setAttribute("data-nav", "open");
        navWrap.style.display = "block";
      }

      const tl = gsap.timeline();
      tl.set(menu, { xPercent: 0 })
        .to(menuButtonTexts, { yPercent: -100, stagger: 0.1, duration: 0.3 }, 0)
        .to(menuButtonIcon, { rotate: 315, duration: 0.3 }, 0)
        .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, 0)
        .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" }, 0)
        .fromTo(
          menuLinks,
          { yPercent: 120, opacity: 0, rotate: 6 },
          { yPercent: 0, opacity: 1, rotate: 0, stagger: 0.05, duration: 0.45, ease: "power3.out" },
          0.2
        );
    } else {
      if (navWrap) navWrap.setAttribute("data-nav", "closed");

      const tl = gsap.timeline({
        onComplete: () => {
          if (navWrap) navWrap.style.display = "none";
        }
      });

      tl.to(menuLinks, { yPercent: 80, opacity: 0, stagger: 0.03, duration: 0.25 })
        .to(bgPanels, { xPercent: 101, stagger: 0.06, duration: 0.35, ease: "power2.in" }, 0.05)
        .to(menu, { xPercent: 120, duration: 0.35 }, 0.1)
        .to(overlay, { autoAlpha: 0, duration: 0.3 }, 0.05)
        .to(menuButtonTexts, { yPercent: 0, duration: 0.3 }, 0)
        .to(menuButtonIcon, { rotate: 0, duration: 0.3 }, 0);
    }
  }, [isMenuOpen]);

  // 3. Escape key handling
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Smooth scroll or navigate to target section
  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    closeMenu();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection(targetId);
      }, 150);
      return;
    }

    scrollToSection(targetId);
  };

  const scrollToSection = (targetId: string) => {
    if (targetId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef}>
      {/* Floating Trigger (No header bar, no logo, just the floating text in top right) */}
      <div className="fixed top-5 right-6 sm:top-7 sm:right-10 z-[100] flex items-center gap-3.5 sm:gap-4 pointer-events-auto select-none">
        <div
          className={`nav-toggle-label cursor-pointer transition-colors duration-200 ${
            isMenuOpen ? "text-[#FCE2D2] hover:text-white" : "text-[#0047FF] hover:text-[#0037CC]"
          }`}
          onClick={toggleMenu}
        >
          click me
        </div>

        <button
          type="button"
          role="button"
          aria-label="Toggle Navigation Menu"
          className="nav-close-btn flex items-center gap-2 cursor-pointer bg-transparent border-none p-0 outline-none"
          onClick={toggleMenu}
        >
          <div className="menu-button-text">
            <p className={`p-large transition-colors duration-200 ${isMenuOpen ? "text-white" : "text-[#0047FF]"}`}>
              Menu
            </p>
            <p className={`p-large transition-colors duration-200 ${isMenuOpen ? "text-white" : "text-[#0047FF]"}`}>
              Close
            </p>
          </div>
          <div className="icon-wrap">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className={`menu-button-icon transition-colors duration-200 ${
                isMenuOpen ? "text-white stroke-white" : "text-[#0047FF] stroke-[#0047FF]"
              }`}
              strokeWidth="2.5"
            >
              <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" strokeLinecap="round" />
              <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeLinecap="round" />
            </svg>
          </div>
        </button>
      </div>

      {/* Fullscreen Sliding Kinetic Drawer Overlay */}
      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper">
          {/* Dimmed backdrop overlay click to close */}
          <div className="overlay" onClick={closeMenu} />

          {/* Menu Drawer */}
          <nav className="menu-content">
            {/* Sliding Wave Background Layers */}
            <div className="menu-bg">
              <div className="backdrop-layer first" />
              <div className="backdrop-layer second" />
              <div className="backdrop-layer" />

              {/* Kinetic Ambient Abstract Shapes (Peach & Cobalt Website Theme) */}
              <div className="ambient-background-shapes">
                {/* Shape 1: Floating circles */}
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(252, 226, 210, 0.25)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(255, 255, 255, 0.15)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(252, 226, 210, 0.22)" />
                  <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(0, 45, 179, 0.35)" />
                </svg>

                {/* Shape 2: Wave pattern */}
                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M0 200 Q100 100, 200 200 T 400 200"
                    stroke="rgba(252, 226, 210, 0.25)"
                    strokeWidth="50"
                    fill="none"
                  />
                  <path
                    className="shape-element"
                    d="M0 280 Q100 180, 200 280 T 400 280"
                    stroke="rgba(0, 45, 179, 0.4)"
                    strokeWidth="35"
                    fill="none"
                  />
                </svg>

                {/* Shape 3: Grid dots */}
                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="50" cy="50" r="8" fill="rgba(252, 226, 210, 0.35)" />
                  <circle className="shape-element" cx="150" cy="50" r="8" fill="rgba(255, 255, 255, 0.25)" />
                  <circle className="shape-element" cx="250" cy="50" r="8" fill="rgba(252, 226, 210, 0.35)" />
                  <circle className="shape-element" cx="350" cy="50" r="8" fill="rgba(255, 255, 255, 0.25)" />
                  <circle className="shape-element" cx="100" cy="150" r="12" fill="rgba(0, 45, 179, 0.35)" />
                  <circle className="shape-element" cx="200" cy="150" r="12" fill="rgba(252, 226, 210, 0.3)" />
                  <circle className="shape-element" cx="300" cy="150" r="12" fill="rgba(255, 255, 255, 0.2)" />
                </svg>

                {/* Shape 4: Organic blobs */}
                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                    fill="rgba(252, 226, 210, 0.2)"
                  />
                  <path
                    className="shape-element"
                    d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200"
                    fill="rgba(0, 45, 179, 0.35)"
                  />
                </svg>

                {/* Shape 5: Diagonal lines */}
                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none">
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="rgba(252, 226, 210, 0.25)" strokeWidth="28" />
                  <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="rgba(0, 45, 179, 0.3)" strokeWidth="22" />
                  <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="18" />
                </svg>
              </div>
            </div>

            {/* Navigation Menu Links */}
            <div className="menu-content-wrapper">
              <ul className="menu-list">
                <li className="menu-list-item" data-shape="1">
                  <a href="#hero" onClick={(e) => handleNavClick(e, "hero")} className="nav-link w-inline-block">
                    <p className="nav-link-text">Home</p>
                  </a>
                </li>
                <li className="menu-list-item" data-shape="2">
                  <a href="#about-section" onClick={(e) => handleNavClick(e, "about-section")} className="nav-link w-inline-block">
                    <p className="nav-link-text">About Me</p>
                  </a>
                </li>
                <li className="menu-list-item" data-shape="3">
                  <a href="#projects-section" onClick={(e) => handleNavClick(e, "projects-section")} className="nav-link w-inline-block">
                    <p className="nav-link-text">Projects</p>
                  </a>
                </li>
                <li className="menu-list-item" data-shape="4">
                  <a href="#certificates-section" onClick={(e) => handleNavClick(e, "certificates-section")} className="nav-link w-inline-block">
                    <p className="nav-link-text">Certificates</p>
                  </a>
                </li>
                <li className="menu-list-item" data-shape="5">
                  <a href="#contact-section" onClick={(e) => handleNavClick(e, "contact-section")} className="nav-link w-inline-block">
                    <p className="nav-link-text">Contact</p>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}

export default Component;
