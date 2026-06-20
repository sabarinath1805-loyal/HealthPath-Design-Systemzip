export interface ConversationItemProps {
  /** Conversation title. The product calls these "cases". */
  title: string;
  /** Short meta line — e.g. "2 days ago · 4 messages". */
  meta?: string;
  /**
   * - `open`     — case is moving (teal dot)
   * - `waiting`  — waiting on an external office (amber dot)
   * Undefined hides the dot.
   */
  status?: "open" | "waiting";
  /** Render as the currently-selected case. */
  active?: boolean;
  onClick?: () => void;
}

/** One row in the sidebar case list. */
export declare function ConversationItem(props: ConversationItemProps): JSX.Element;
