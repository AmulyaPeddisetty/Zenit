import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Hero background visual — responds to mouse movement with a parallax offset.
 * Includes animated rings, grid, orb, and decorative elements.
 */
export default function HeroVisual() {
  const visualRef = useRef(null);

  useEffect(() => {
    const visual = visualRef.current;

    const moveX = gsap.quickTo(visual, "x", { duration: 0.8, ease: "power3.out" });
    const moveY = gsap.quickTo(visual, "y", { duration: 0.8, ease: "power3.out" });

    const handleMove = (e) => {
      moveX((e.clientX / window.innerWidth - 0.5) * 22);
      moveY((e.clientY / window.innerHeight - 0.5) * 22);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      id="hero-visual"
      className="hero-visual"
      ref={visualRef}
      aria-hidden="true"
    >
      <div className="hero-grid" />
      <div className="hero-ring hero-ring-large" />
      <div className="hero-ring hero-ring-small" />
      <div className="hero-orb" />
      <div className="hero-cross hero-cross-one" />
      <div className="hero-cross hero-cross-two" />
      <span className="hero-coordinate">40°44&apos; / 73°59&apos;</span>
      <span className="hero-stamp">
        BUILD
        <br />
        WITH
        <br />
        INTENT
      </span>
    </div>
  );
}
