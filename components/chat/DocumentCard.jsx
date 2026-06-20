import React from "react";
import { Icon } from "../core/Icon";
import { Button } from "../core/Button";
import { Badge } from "../core/Badge";

export function DocumentCard({
  title,
  caseId,
  language,
  status = "Draft",
  preview,
  onDownload,
  onCopy,
  onOpen,
}) {
  return (
    <div className="hp-doc" role="group" aria-label={`Document: ${title}`}>
      <div className="hp-doc__head">
        <div className="hp-doc__icon" aria-hidden="true">
          <Icon name="fileText" size={18} />
        </div>
        <div className="hp-doc__meta">
          <div className="hp-doc__title">{title}</div>
          <div className="hp-doc__sub">
            <Badge tone="brand">{status}</Badge>
            {caseId && <code>{caseId}</code>}
            {language && <span>{language}</span>}
          </div>
        </div>
      </div>
      {preview && (
        <div className="hp-doc__preview">
          {typeof preview === "string" ? (
            preview.split("\n\n").map((p, i) => <p key={i}>{p}</p>)
          ) : (
            preview
          )}
        </div>
      )}
      <div className="hp-doc__actions">
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Icon name="download" size={14} />}
          onClick={onDownload}
        >
          Download
        </Button>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Icon name="copy" size={14} />}
          onClick={onCopy}
        >
          Copy text
        </Button>
        <span style={{ flex: 1 }} />
        <Button
          variant="ghost"
          size="sm"
          rightIcon={<Icon name="arrowUpRight" size={14} />}
          onClick={onOpen}
        >
          Open
        </Button>
      </div>
    </div>
  );
}
