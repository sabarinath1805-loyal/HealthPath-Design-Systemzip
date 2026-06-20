import React from "react";

export function IconButton({
  size = "md",
  variant = "ghost",
  round = false,
  className = "",
  children,
  label,
  ...rest
}) {
  const cls = [
    "hp-icon-button",
    variant === "brand" && "hp-icon-button--brand",
    round && "hp-icon-button--round",
    size === "sm" && "hp-icon-button--sm",
    size === "lg" && "hp-icon-button--lg",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={cls} aria-label={label} title={label} {...rest}>
      {children}
    </button>
  );
}
