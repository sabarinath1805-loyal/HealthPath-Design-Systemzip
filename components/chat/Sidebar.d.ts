export interface SidebarCase {
  id: string;
  title: string;
  meta?: string;
  status?: "open" | "waiting";
  /** Bucket for grouping. Defaults to "recent". */
  bucket?: "open" | "recent" | "earlier";
}

export interface SidebarUser {
  name: string;
  meta?: string;
  initials?: string;
  avatar?: string;
}

export interface SidebarProps {
  cases?: SidebarCase[];
  activeId?: string;
  onSelectCase?: (id: string) => void;
  onNewCase?: () => void;
  user?: SidebarUser;
  /** When provided, renders a close button — for the mobile drawer. */
  onClose?: () => void;
}

/** Past-cases sidebar. Brand mark + New case + grouped list + user footer. */
export declare function Sidebar(props: SidebarProps): JSX.Element;
