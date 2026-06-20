import React from "react";
import { Icon } from "../core/Icon";

export function BrandLogo({ size = "md", showWord = true, href }) {
  const cls = `hp-brand ${size === "lg" ? "hp-brand--lg" : ""}`.trim();
  const inner = (
    <>
      <span className="hp-brand__mark" aria-hidden="true">
        <Icon name="cornerDownRight" size={size === "lg" ? 22 : 16} strokeWidth={2} />
      </span>
      {showWord && (
        <span className="hp-brand__word">
          Health<em>Path</em>
        </span>
      )}
    </>
  );
  if (href) {
    return (
      <a className={cls} href={href} aria-label="HealthPath home">
        {inner}
      </a>
    );
  }
  return <span className={cls}>{inner}</span>;
}
