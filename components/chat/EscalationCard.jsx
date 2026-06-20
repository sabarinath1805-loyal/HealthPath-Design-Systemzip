import React from "react";
import { Icon } from "../core/Icon";

const DEFAULT_ICON = "alertCircle";

export function EscalationCard({
  label = "Next step",
  title,
  description,
  icon = DEFAULT_ICON,
  primaryAction,
  secondaryAction,
}) {
  return (
    <div className="hp-esc" role="group" aria-label={`Escalation: ${title}`}>
      <div className="hp-esc__icon" aria-hidden="true">
        <Icon name={icon} size={18} />
      </div>
      <div className="hp-esc__body">
        <span className="hp-esc__label">{label}</span>
        <div className="hp-esc__title">{title}</div>
        {description && <div className="hp-esc__desc">{description}</div>}
        {(primaryAction || secondaryAction) && (
          <div className="hp-esc__actions">
            {primaryAction && (
              <button
                type="button"
                className="hp-esc__action hp-esc__action--primary"
                onClick={primaryAction.onClick}
              >
                {primaryAction.icon}
                {primaryAction.label}
              </button>
            )}
            {secondaryAction && (
              <button
                type="button"
                className="hp-esc__action"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.icon}
                {secondaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
