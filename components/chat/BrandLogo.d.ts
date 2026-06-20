export interface BrandLogoProps {
  size?: "md" | "lg";
  /** Hide the "HealthPath" wordmark; mark-only. */
  showWord?: boolean;
  /** Render as an anchor — sets aria-label. */
  href?: string;
}

/** HealthPath wordmark + teal corner-arrow mark. */
export declare function BrandLogo(props: BrandLogoProps): JSX.Element;
