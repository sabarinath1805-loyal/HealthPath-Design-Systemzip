export interface ComposerProps {
  /** Controlled value. Omit for uncontrolled. */
  value?: string;
  onChange?: (value: string) => void;
  /** Called on Enter (without shift) or send-button click. */
  onSend?: (value: string) => void;
  onAttach?: () => void;
  onMicToggle?: () => void;
  isRecording?: boolean;
  placeholder?: string;
  disabled?: boolean;
  /** Override the default "I help with access and paperwork…" line. */
  disclaimer?: string;
  autoFocus?: boolean;
}

/**
 * Bottom message-input bar. Auto-resizing textarea, attach + mic + send
 * row, persistent muted disclaimer below.
 *
 * @startingPoint section="Inputs" subtitle="Chat composer with mic + attachment + disclaimer" viewport="800x180"
 */
export declare function Composer(props: ComposerProps): JSX.Element;
