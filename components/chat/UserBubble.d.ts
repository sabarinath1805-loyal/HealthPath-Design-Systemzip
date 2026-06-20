import React from "react";

export interface UserBubbleProps {
  children: React.ReactNode;
  /** Optional row of file/image attachment thumbnails rendered above the bubble. */
  attachments?: React.ReactNode;
}

/** Right-aligned user message bubble. Solid teal, rounded-xl, br corner softened. */
export declare function UserBubble(props: UserBubbleProps): JSX.Element;
