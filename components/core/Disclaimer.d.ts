export interface DisclaimerProps {
  /** Defaults to "I help with access and paperwork, not medical advice." */
  text?: string;
  showIcon?: boolean;
  className?: string;
}

/**
 * The single persistent reassurance line that lives near the composer
 * on every chat screen. Rendered in --text-muted; never an alert.
 */
export declare function Disclaimer(props: DisclaimerProps): JSX.Element;
