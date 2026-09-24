import { useRef } from "react";
import gsap from "gsap";
import ProjectVisual from "./ProjectVisual";

/**
 * A single project row in the selected work grid.
 * On desktop hover, a floating preview image follows the cursor.
 */
export default function ProjectRow({ project }) {
  const rowRef = useRef(null);
  const visualRef = useRef(null);
  const moveX = useRef(null);
  const moveY = useRef(null);

  const handleEnter = () => {
    if (!visualRef.current) return;
    moveX.current = gsap.quickTo(visualRef.current, "x", {
      duration: 0.55,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(visualRef.current, "y", {
      duration: 0.55,
      ease: "power3.out",
    });
    rowRef.current.classList.add("is-hovered");
  };

  const handleMove = (e) => {
    if (!moveX.current) return;
    const bounds = rowRef.current.getBoundingClientRect();
    moveX.current(e.clientX - bounds.left - 120);
    moveY.current(e.clientY - bounds.top - 120);
  };

  const handleLeave = () => {
    rowRef.current.classList.remove("is-hovered");
  };

  return (
    <article
      className="project-row reveal"
      ref={rowRef}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <a
        href="#contact"
        data-cursor="VIEW"
        aria-label={`View project: ${project.title} — ${project.category}`}
      >
        <span className="project-number">{project.number}</span>
        <div className="project-title">
          <h3>{project.title}</h3>
          <p className="project-category">{project.category}</p>
          {project.description && (
            <p className="project-description">{project.description}</p>
          )}
        </div>
        <span className="project-year">{project.year}</span>
        <span className="project-arrow" aria-hidden="true">↗</span>
        <div className="project-preview" ref={visualRef}>
          <ProjectVisual type={project.visual} />
        </div>
      </a>
    </article>
  );
}
