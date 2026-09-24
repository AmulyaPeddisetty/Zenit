import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Interactive playground field — objects respond to cursor position
 * with layered parallax offsets and gentle rotation.
 */
export default function Playground() {
  const fieldRef = useRef(null);

  useEffect(() => {
    const field = fieldRef.current;
    const objects = [...field.querySelectorAll("[data-play-object]")];

    /* Create independent quick-setters for each object */
    const quickMoves = objects.map((obj, i) => ({
      x: gsap.quickTo(obj, "x", {
        duration: 1.1 + i * 0.15,
        ease: "power3.out",
      }),
      y: gsap.quickTo(obj, "y", {
        duration: 1.2 + i * 0.15,
        ease: "power3.out",
      }),
      rotation: gsap.quickTo(obj, "rotation", {
        duration: 1.6,
        ease: "power3.out",
      }),
    }));

    const handleMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      quickMoves.forEach((move, i) => {
        move.x(x * (i + 1) * 24);
        move.y(y * (i + 1) * 24);
        move.rotation(x * (i % 2 ? -12 : 12));
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      id="playground-field"
      className="playground-field"
      ref={fieldRef}
      aria-hidden="true"
    >
      <div className="play-object play-object-ring" data-play-object />
      <div className="play-object play-object-square" data-play-object />
      <div className="play-object play-object-dot" data-play-object />
      <div className="play-object play-object-type" data-play-object>
        01
      </div>
      <span className="playground-note">MOVE / THINK / MAKE</span>
    </div>
  );
}
