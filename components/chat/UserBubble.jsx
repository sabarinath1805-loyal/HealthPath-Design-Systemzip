import React from "react";

export function UserBubble({ children, attachments }) {
  return (
    <div className="hp-msg hp-msg--user" data-role="user">
      <div className="hp-msg__user-col">
        {attachments && <div className="hp-msg__attachments">{attachments}</div>}
        <div className="hp-msg__bubble">{children}</div>
      </div>
    </div>
  );
}
