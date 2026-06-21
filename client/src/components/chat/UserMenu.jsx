import React, { useEffect, useRef, useState } from "react";
import { IconButton } from "../core/IconButton";
import { Icon } from "../core/Icon";
import { useAuth } from "@/hooks/use-auth";

/**
 * Small kebab-style user menu for the sidebar footer.
 * - Click trigger to open
 * - Click outside / Escape to close
 * - "Account" is a placeholder (no settings page yet)
 * - "Sign out" calls the same logoutMutation as the header button
 */
export function UserMenu({ user }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const { logoutMutation } = useAuth();

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function handleSignOut() {
    setOpen(false);
    logoutMutation.mutate();
  }

  return (
    <div className="hp-usermenu" ref={wrapperRef}>
      <IconButton
        label="Account options"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Icon name="more" size={16} />
      </IconButton>

      {open && (
        <div className="hp-usermenu__panel" role="menu">
          {user && (
            <div className="hp-usermenu__header">
              <div className="hp-usermenu__name">{user.name}</div>
              {user.meta && (
                <div className="hp-usermenu__meta">{user.meta}</div>
              )}
            </div>
          )}
          <div className="hp-usermenu__divider" aria-hidden="true" />
          <button
            type="button"
            className="hp-usermenu__item hp-usermenu__item--disabled"
            role="menuitem"
            disabled
            title="Coming soon"
          >
            <Icon name="user" size={14} />
            <span>Account settings</span>
          </button>
          <button
            type="button"
            className="hp-usermenu__item"
            role="menuitem"
            onClick={handleSignOut}
            disabled={logoutMutation.isPending}
          >
            <Icon name="logOut" size={14} />
            <span>{logoutMutation.isPending ? "Signing out…" : "Sign out"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
