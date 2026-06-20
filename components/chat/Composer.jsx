import React, { useEffect, useRef, useState } from "react";
import { Icon } from "../core/Icon";
import { IconButton } from "../core/IconButton";
import { Disclaimer } from "../core/Disclaimer";

/**
 * Bottom composer. Self-contains the textarea, mic, attachment, send,
 * and the persistent disclaimer line.
 */
export function Composer({
  value: controlledValue,
  onChange,
  onSend,
  onAttach,
  onMicToggle,
  isRecording = false,
  placeholder = "Tell me what's going on…",
  disabled = false,
  disclaimer,
  autoFocus = false,
}) {
  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const setValue = (v) => {
    if (controlledValue === undefined) setInternalValue(v);
    onChange?.(v);
  };

  const textareaRef = useRef(null);

  // Auto-resize
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  }, [value]);

  useEffect(() => {
    if (autoFocus) textareaRef.current?.focus();
  }, [autoFocus]);

  const canSend = !disabled && value.trim().length > 0;

  const handleSend = () => {
    if (!canSend) return;
    onSend?.(value.trim());
    setValue("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="hp-composer-wrap">
      <div className="hp-composer">
        <textarea
          ref={textareaRef}
          className="hp-composer__textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          aria-label="Message HealthPath"
        />
        <div className="hp-composer__row">
          <IconButton label="Attach photo or document" size="md" onClick={onAttach}>
            <Icon name="paperclip" size={18} />
          </IconButton>
          <IconButton
            label={isRecording ? "Stop recording" : "Voice input"}
            size="md"
            className={isRecording ? "hp-composer__mic--recording" : ""}
            onClick={onMicToggle}
          >
            <Icon name="mic" size={18} />
          </IconButton>
          <span className="hp-composer__spacer" />
          <button
            type="button"
            className="hp-composer__send"
            aria-label="Send"
            disabled={!canSend}
            onClick={handleSend}
          >
            <Icon name="arrowUp" size={18} strokeWidth={2.25} />
          </button>
        </div>
      </div>
      <Disclaimer text={disclaimer} />
    </div>
  );
}
