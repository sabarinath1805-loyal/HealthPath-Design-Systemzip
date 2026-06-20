export interface BadgeProps {
  tone?: "neutral" | "brand" | "info" | "warn" | "solid";
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export declare function Badge(props: BadgeProps): JSX.Element;
