import React from "react";

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "ref" | "children"> {
  /** Required for accessibility — used as aria-label and tooltip. */
  label: string;
  /** Icon node (e.g. `<Icon name="mic" />`). */
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "brand";
  /** Fully circular instead of rounded-square. Mic + send use this. */
  round?: boolean;
}

/**
 * Square or round icon-only button. The composer's mic and attachment
 * buttons are IconButtons; the send button uses `variant="brand"` + `round`.
 */
export declare function IconButton(props: IconButtonProps): JSX.Element;
