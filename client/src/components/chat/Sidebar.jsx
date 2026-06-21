import React from "react";
import { Icon } from "../core/Icon";
import { IconButton } from "../core/IconButton";
import { Avatar } from "../core/Avatar";
import { BrandLogo } from "./BrandLogo";
import { ConversationItem } from "./ConversationItem";
import { UserMenu } from "./UserMenu";

export function Sidebar({
  cases = [],
  activeId,
  onSelectCase,
  onNewCase,
  user,
  onClose, // mobile-only — pass to close the drawer
}) {
  // Group by recency bucket
  const groups = groupCases(cases);

  return (
    <aside className="hp-sidebar" aria-label="Cases">
      <div className="hp-sidebar__header">
        <BrandLogo />
        {onClose && (
          <IconButton label="Close menu" onClick={onClose}>
            <Icon name="arrowLeft" size={18} />
          </IconButton>
        )}
      </div>

      <div className="hp-sidebar__actions">
        <button
          type="button"
          className="hp-sidebar__action"
          onClick={onNewCase}
        >
          <Icon name="penSquare" size={16} />
          <span>New case</span>
        </button>
      </div>

      <nav className="hp-sidebar__list" aria-label="Past cases">
        {groups.map((g) =>
          g.items.length === 0 ? null : (
            <React.Fragment key={g.label}>
              <div className="hp-sidebar__section-label">{g.label}</div>
              {g.items.map((c) => (
                <ConversationItem
                  key={c.id}
                  title={c.title}
                  meta={c.meta}
                  status={c.status}
                  active={c.id === activeId}
                  onClick={() => onSelectCase?.(c.id)}
                />
              ))}
            </React.Fragment>
          )
        )}
      </nav>

      {user && (
        <div className="hp-sidebar__footer">
          <Avatar initials={user.initials} src={user.avatar} />
          <div className="hp-sidebar__user">
            <span className="hp-sidebar__user-name">{user.name}</span>
            {user.meta && <span className="hp-sidebar__user-meta">{user.meta}</span>}
          </div>
          <UserMenu user={user} />
        </div>
      )}
    </aside>
  );
}

function groupCases(cases) {
  const open = [];
  const recent = [];
  const earlier = [];
  for (const c of cases) {
    if (c.bucket === "open") open.push(c);
    else if (c.bucket === "earlier") earlier.push(c);
    else recent.push(c);
  }
  return [
    { label: "Open now", items: open },
    { label: "Last 7 days", items: recent },
    { label: "Earlier", items: earlier },
  ];
}
