import React from "react";

export function Field({ label, help, error, children, htmlFor }) {
  return (
    <label className="hp-field" htmlFor={htmlFor}>
      {label && <span className="hp-field__label">{label}</span>}
      {children}
      {error ? (
        <span className="hp-field__error" role="alert">{error}</span>
      ) : help ? (
        <span className="hp-field__help">{help}</span>
      ) : null}
    </label>
  );
}

export function Input({ leftIcon, className = "", ...rest }) {
  if (!leftIcon) {
    return <input className={`hp-input ${className}`.trim()} {...rest} />;
  }
  return (
    <span style={{ position: "relative", display: "block" }}>
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 12,
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--text-muted)",
          display: "inline-flex",
        }}
      >
        {leftIcon}
      </span>
      <input
        className={`hp-input ${className}`.trim()}
        style={{ paddingLeft: 38 }}
        {...rest}
      />
    </span>
  );
}

export function Textarea({ className = "", rows = 3, ...rest }) {
  return <textarea className={`hp-textarea ${className}`.trim()} rows={rows} {...rest} />;
}
