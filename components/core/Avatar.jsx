import React from "react";

export function Avatar({ src, alt = "", initials, size = "md", brand = false, className = "" }) {
  const cls = [
    "hp-avatar",
    brand && "hp-avatar--brand",
    size === "sm" && "hp-avatar--sm",
    size === "lg" && "hp-avatar--lg",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={cls}>
      {src ? <img src={src} alt={alt} /> : initials ? initials.slice(0, 2).toUpperCase() : null}
    </span>
  );
}
