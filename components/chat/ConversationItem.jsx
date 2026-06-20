import React from "react";

const STATUS_DOT = {
  open: "hp-conv__dot",
  waiting: "hp-conv__dot hp-conv__dot--amber",
};

export function ConversationItem({
  title,
  meta,
  status,
  active = false,
  onClick,
}) {
  return (
    <button
      type="button"
      className="hp-conv"
      aria-current={active ? "true" : undefined}
      onClick={onClick}
    >
      <span className="hp-conv__title">{title}</span>
      {(meta || status) && (
        <span className="hp-conv__meta">
          {status && <span className={STATUS_DOT[status]} aria-hidden="true" />}
          {meta}
        </span>
      )}
    </button>
  );
}
