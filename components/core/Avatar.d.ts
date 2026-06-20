export interface AvatarProps {
  src?: string;
  alt?: string;
  /** Two-letter fallback when no `src`. */
  initials?: string;
  size?: "sm" | "md" | "lg";
  /** `brand` renders as a teal rounded-square (used for the assistant avatar in messages). */
  brand?: boolean;
  className?: string;
}

export declare function Avatar(props: AvatarProps): JSX.Element;
