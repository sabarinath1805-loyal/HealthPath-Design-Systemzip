export interface DocumentCardProps {
  /** Human-readable filename / subject line. Sentence case. */
  title: string;
  /** Reference / claim id; rendered in Geist Mono. */
  caseId?: string;
  /** Plain-language language label e.g. "Spanish · formal". */
  language?: string;
  /** Defaults to "Draft". */
  status?: string;
  /** A short preview of the letter body. Plain string with double-newline paragraphs OR a node. */
  preview?: string | React.ReactNode;
  onDownload?: () => void;
  onCopy?: () => void;
  onOpen?: () => void;
}

/**
 * A generated complaint/claim letter rendered inline in chat.
 * Visually distinct from a plain bubble — has its own card chrome,
 * a 6-line fade-out preview, and clear Download / Copy actions.
 *
 * @startingPoint section="Cards" subtitle="Generated complaint / claim letter card" viewport="700x320"
 */
export declare function DocumentCard(props: DocumentCardProps): JSX.Element;
