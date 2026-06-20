import React from "react";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "ref"> {
  /** Visual variant. */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** Size; `lg` (48px) is the mobile-friendly default in tap-heavy areas. */
  size?: "sm" | "md" | "lg";
  /** Stretch to fill parent width. */
  block?: boolean;
  /** Inline element rendered before children. */
  leftIcon?: React.ReactNode;
  /** Inline element rendered after children. */
  rightIcon?: React.ReactNode;
}

/**
 * HealthPath's primary action button.
 *
 * Use `primary` for the dominant CTA on a screen, `secondary` for
 * everything else, `ghost` inside tight chrome (toolbars, list rows),
 * `danger` only for truly destructive actions.
 *
 * @startingPoint section="Inputs" subtitle="Primary action button" viewport="700x150"
 */
export declare function Button(props: ButtonProps): JSX.Element;
