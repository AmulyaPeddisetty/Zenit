import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Custom cursor — follows mouse with a smooth GSAP lag.
 * Expands when hovering interactive elements and shows a label.
 * Hidden on touch / reduced-motion devices.
 */
export default function Cursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const noMouse = window.matchMedia(
      "(pointer: coarse), (prefers-reduced-motion: reduce)"
    ).matches;
    if (noMouse) return undefined;

    const cursor = cursorRef.current;
    const label = labelRef.current;

    /* Smooth position tracking */
    const moveX = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3.out" });
    const moveY = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3.out" });

    const handleMove = (e) => {
      moveX(e.clientX);
      moveY(e.clientY);
    };

    /* Expand cursor when over interactive elements */
    const handleOver = (e) => {
      const target = e.target.closest("a, button, [data-cursor]");
      if (!target) return;
      cursor.classList.add("cursor-active");
      label.textContent =
        target.dataset.cursor ||
        (target.closest(".project-row") ? "VIEW" : "OPEN");
    };

    /* Shrink cursor when leaving interactive elements */
    const handleOut = (e) => {
      if (!e.relatedTarget?.closest?.("a, button, [data-cursor]")) {
        cursor.classList.remove("cursor-active");
        label.textContent = "";
      }
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      className="custom-cursor"
      ref={cursorRef}
      aria-hidden="true"
    >
      <span ref={labelRef} />
    </div>
  );
}