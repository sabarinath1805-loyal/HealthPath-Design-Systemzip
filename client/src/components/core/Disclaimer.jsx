import React from "react";
import { Icon } from "./Icon";

const DEFAULT_TEXT = "I help with access and paperwork, not medical advice.";

export function Disclaimer({ text = DEFAULT_TEXT, showIcon = true, className = "" }) {
  return (
    <p className={`hp-disclaimer ${className}`.trim()}>
      {showIcon && (
        <span className="hp-disclaimer__icon">
          <Icon name="info" size={13} />
        </span>
      )}
      <span>{text}</span>
    </p>
  );
}
