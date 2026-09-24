import { useEffect, useState } from "react";

/**
 * Animated loading screen that counts from 0 → 100 over ~800ms,
 * then fades out via CSS animation.
 */
export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const started = performance.now();
    let frame;

    const tick = (now) => {
      const next = Math.min(100, Math.round(((now - started) / 800) * 100));
      setProgress(next);

      if (next < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setVisible(false), 300);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!visible) return null;

  return (
    <div
      id="site-loader"
      className="loader"
      aria-label="Loading portfolio"
      role="status"
    >
      <div className="loader-mark">ZENIT</div>
      <div className="loader-progress">
        <span style={{ width: `${progress}%` }} aria-hidden="true" />
        <b>
          {String(progress).padStart(2, "0")} — 100
        </b>
      </div>
    </div>
  );
}
