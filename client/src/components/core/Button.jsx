import React from "react";

/** Primary button with size + variant. */
export function Button({
  variant = "primary",
  size = "md",
  block = false,
  leftIcon,
  rightIcon,
  className = "",
  children,
  ...rest
}) {
  const cls = [
    "hp-button",
    `hp-button--${variant}`,
    size === "sm" && "hp-button--sm",
    size === "lg" && "hp-button--lg",
    block && "hp-button--block",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={cls} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
