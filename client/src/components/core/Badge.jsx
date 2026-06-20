import React from "react";

export function Badge({ tone = "neutral", icon, children, className = "" }) {
  const cls = [
    "hp-badge",
    tone === "brand" && "hp-badge--brand",
    tone === "info" && "hp-badge--info",
    tone === "warn" && "hp-badge--warn",
    tone === "solid" && "hp-badge--solid",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls}>
      {icon}
      {children}
    </span>
  );
}
