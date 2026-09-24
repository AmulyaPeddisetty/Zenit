/**
 * Decorative project thumbnail art — purely visual, aria-hidden.
 * Each variant (aura / nova / form) has its own color story.
 */
export default function ProjectVisual({ type }) {
  return (
    <div
      className={`project-art project-art-${type}`}
      aria-hidden="true"
    >
      <div className="art-grid" />

      {type === "aura" && (
        <>
          <div className="aura-shape aura-one" />
          <div className="aura-shape aura-two" />
          <div className="aura-dot" />
        </>
      )}

      {type === "nova" && (
        <>
          <div className="nova-box" />
          <div className="nova-line nova-line-one" />
          <div className="nova-line nova-line-two" />
          <span className="nova-label">SYSTEM / 02</span>
        </>
      )}

      {type === "form" && (
        <>
          <span className="form-word">FORM</span>
          <div className="form-block" />
          <div className="form-circle" />
        </>
      )}
    </div>
  );
}
