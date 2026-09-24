/**
 * Reusable CTA button rendered as an anchor tag.
 * @param {string}  href      - Destination URL
 * @param {boolean} primary   - If true, uses accent fill style
 * @param {string}  className - Additional CSS classes
 */
export function Button({
  children,
  href = "#",
  primary = false,
  className = "",
  ...props
}) {
  return (
    <a
      className={`btn${primary ? " btn-primary" : ""} ${className}`.trim()}
      href={href}
      {...props}
    >
      {children}
    </a>
  );
}
