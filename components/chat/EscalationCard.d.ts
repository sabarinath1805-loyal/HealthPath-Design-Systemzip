export interface EscalationAction {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface EscalationCardProps {
  /** Eyebrow label. Defaults to "Next step". */
  label?: string;
  /** One-sentence headline. Should answer "what now?" */
  title: string;
  /** Optional supporting paragraph. */
  description?: React.ReactNode;
  /** Icon name passed to <Icon>. Defaults to alertCircle. */
  icon?: string;
  primaryAction?: EscalationAction;
  secondaryAction?: EscalationAction;
}

/**
 * Recommended next step / escalation. Warm amber accent + 4px left
 * border so a stressed user can't miss it. NOT a warning, NOT an alert —
 * it's a guide, intentionally calmer than browser alert tones.
 *
 * @startingPoint section="Cards" subtitle="Recommended next step / escalation card" viewport="700x260"
 */
export declare function EscalationCard(props: EscalationCardProps): JSX.Element;
