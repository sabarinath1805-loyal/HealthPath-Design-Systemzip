import React from "react";
import { Icon } from "../core/Icon";

export function AssistantMessage({ children, thinking = false }) {
  return (
    <div className="hp-msg hp-msg--assistant" data-role="assistant">
      <div className="hp-msg__avatar" aria-hidden="true">
        <Icon name="cornerDownRight" size={14} strokeWidth={2} />
      </div>
      <div className="hp-msg__column">
        {thinking ? (
          <span className="hp-msg__thinking" aria-label="Thinking">
            <span /><span /><span />
          </span>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

/** A plain-text reply paragraph; lives inside <AssistantMessage>. */
export function AssistantText({ children }) {
  return <div className="hp-msg__text">{children}</div>;
}
