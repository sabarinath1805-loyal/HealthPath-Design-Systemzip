import React from "react";

export interface AssistantMessageProps {
  /** Show the three-dot thinking indicator instead of children. */
  thinking?: boolean;
  /**
   * Children render in a vertical column inside the message. May include
   * any mix of `<AssistantText>`, `<DocumentCard>`, `<EscalationCard>`,
   * attachments, or follow-up actions.
   */
  children?: React.ReactNode;
}

export interface AssistantTextProps {
  children: React.ReactNode;
}

/** Avatar + column wrapper for one assistant turn. */
export declare function AssistantMessage(props: AssistantMessageProps): JSX.Element;
/** One paragraph of plain assistant text. Use inside AssistantMessage. */
export declare function AssistantText(props: AssistantTextProps): JSX.Element;
