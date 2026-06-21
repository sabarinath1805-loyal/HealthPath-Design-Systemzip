import React, { useEffect, useState } from "react";
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
}) {
  const [open, setOpen] = useState(false);

  // Escape to close + body scroll lock while modal is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

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
          onClick={() => setOpen(true)}
          disabled={!preview}
        >
          Open
        </Button>
      </div>

      {open && preview && (
        <div
          className="hp-doc-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — full text`}
          onClick={(e) => {
            // close when clicking the scrim (but not the panel itself)
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="hp-doc-modal__panel">
            <div className="hp-doc-modal__head">
              <div className="hp-doc-modal__title">{title}</div>
              <div className="hp-doc-modal__sub">
                {language && <span>{language}</span>}
                <Badge tone="brand">{status}</Badge>
              </div>
              <button
                type="button"
                className="hp-doc-modal__close"
                aria-label="Close"
                onClick={() => setOpen(false)}
              >
                <Icon name="x" size={18} />
              </button>
            </div>
            <div className="hp-doc-modal__body">
              {typeof preview === "string" ? (
                preview.split("\n\n").map((p, i) => <p key={i}>{p}</p>)
              ) : (
                preview
              )}
            </div>
            <div className="hp-doc-modal__actions">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Icon name="copy" size={14} />}
                onClick={onCopy}
              >
                Copy text
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Icon name="download" size={14} />}
                onClick={onDownload}
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
