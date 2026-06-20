/* @ds-bundle: {"format":3,"namespace":"HealthPathDesignSystem_54b6fa","components":[{"name":"AssistantMessage","sourcePath":"components/chat/AssistantMessage.jsx"},{"name":"AssistantText","sourcePath":"components/chat/AssistantMessage.jsx"},{"name":"BrandLogo","sourcePath":"components/chat/BrandLogo.jsx"},{"name":"Composer","sourcePath":"components/chat/Composer.jsx"},{"name":"ConversationItem","sourcePath":"components/chat/ConversationItem.jsx"},{"name":"DocumentCard","sourcePath":"components/chat/DocumentCard.jsx"},{"name":"EscalationCard","sourcePath":"components/chat/EscalationCard.jsx"},{"name":"Sidebar","sourcePath":"components/chat/Sidebar.jsx"},{"name":"UserBubble","sourcePath":"components/chat/UserBubble.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Disclaimer","sourcePath":"components/core/Disclaimer.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Field","sourcePath":"components/core/Input.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Textarea","sourcePath":"components/core/Input.jsx"}],"sourceHashes":{"components/chat/AssistantMessage.jsx":"5a8a29ef8009","components/chat/BrandLogo.jsx":"400261f056af","components/chat/Composer.jsx":"63208600fda0","components/chat/ConversationItem.jsx":"772ccad8f24c","components/chat/DocumentCard.jsx":"7815f240eb49","components/chat/EscalationCard.jsx":"d469226319cd","components/chat/Sidebar.jsx":"8af0eb0d89c7","components/chat/UserBubble.jsx":"eccfcdd2d6a7","components/core/Avatar.jsx":"d57f9cb3bef7","components/core/Badge.jsx":"e73f1b476033","components/core/Button.jsx":"ee2c7026ae7d","components/core/Disclaimer.jsx":"bc5ec6be9e44","components/core/Icon.jsx":"a247e5628444","components/core/IconButton.jsx":"f3d431796aea","components/core/Input.jsx":"fd7b983ed9ab","ui_kits/healthpath/screens.jsx":"5410aa29021a"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HealthPathDesignSystem_54b6fa = window.HealthPathDesignSystem_54b6fa || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/chat/ConversationItem.jsx
try { (() => {
const STATUS_DOT = {
  open: "hp-conv__dot",
  waiting: "hp-conv__dot hp-conv__dot--amber"
};
function ConversationItem({
  title,
  meta,
  status,
  active = false,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hp-conv",
    "aria-current": active ? "true" : undefined,
    onClick: onClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-conv__title"
  }, title), (meta || status) && /*#__PURE__*/React.createElement("span", {
    className: "hp-conv__meta"
  }, status && /*#__PURE__*/React.createElement("span", {
    className: STATUS_DOT[status],
    "aria-hidden": "true"
  }), meta));
}
Object.assign(__ds_scope, { ConversationItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chat/ConversationItem.jsx", error: String((e && e.message) || e) }); }

// components/chat/UserBubble.jsx
try { (() => {
function UserBubble({
  children,
  attachments
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hp-msg hp-msg--user",
    "data-role": "user"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-msg__user-col"
  }, attachments && /*#__PURE__*/React.createElement("div", {
    className: "hp-msg__attachments"
  }, attachments), /*#__PURE__*/React.createElement("div", {
    className: "hp-msg__bubble"
  }, children)));
}
Object.assign(__ds_scope, { UserBubble });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chat/UserBubble.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function Avatar({
  src,
  alt = "",
  initials,
  size = "md",
  brand = false,
  className = ""
}) {
  const cls = ["hp-avatar", brand && "hp-avatar--brand", size === "sm" && "hp-avatar--sm", size === "lg" && "hp-avatar--lg", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", {
    className: cls
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt
  }) : initials ? initials.slice(0, 2).toUpperCase() : null);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function Badge({
  tone = "neutral",
  icon,
  children,
  className = ""
}) {
  const cls = ["hp-badge", tone === "brand" && "hp-badge--brand", tone === "info" && "hp-badge--info", tone === "warn" && "hp-badge--warn", tone === "solid" && "hp-badge--solid", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", {
    className: cls
  }, icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Primary button with size + variant. */
function Button({
  variant = "primary",
  size = "md",
  block = false,
  leftIcon,
  rightIcon,
  className = "",
  children,
  ...rest
}) {
  const cls = ["hp-button", `hp-button--${variant}`, size === "sm" && "hp-button--sm", size === "lg" && "hp-button--lg", block && "hp-button--block", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls
  }, rest), leftIcon, children, rightIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Icon — inline Lucide SVG paths (1.75 default stroke).
// Subset HealthPath actually uses; expand when needed.
// Kept hidden (no Icon.d.ts) — internal helper.

const PATHS = {
  // primary actions
  mic: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "2",
    width: "6",
    height: "12",
    rx: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 10v2a7 7 0 0 1-14 0v-2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 19v3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 22h8"
  })),
  paperclip: /*#__PURE__*/React.createElement("path", {
    d: "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 17.99 8.83l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
  }),
  send: /*#__PURE__*/React.createElement("path", {
    d: "m22 2-7 20-4-9-9-4Z"
  }),
  arrowUp: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 19V5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m5 12 7-7 7 7"
  })),
  arrowLeft: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m12 19-7-7 7-7"
  })),
  arrowUpRight: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M7 7h10v10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 17 17 7"
  })),
  cornerDownRight: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "m15 10 5 5-5 5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 4v7a4 4 0 0 0 4 4h12"
  })),
  // chrome
  penSquare: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"
  })),
  plus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14"
  })),
  messageSquare: /*#__PURE__*/React.createElement("path", {
    d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
  }),
  search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })),
  more: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "12",
    r: "1"
  })),
  menu: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 12h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 18h18"
  })),
  trash: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  })),
  // content
  fileText: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 2v6h6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 13H8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 17H8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 9H8"
  })),
  download: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m7 10 5 5 5-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 15V3"
  })),
  copy: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "13",
    height: "13",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
  })),
  clock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 6v6l4 2"
  })),
  // auth
  mail: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "4",
    width: "20",
    height: "16",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m22 6-10 7L2 6"
  })),
  lock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11V7a5 5 0 0 1 10 0v4"
  })),
  eye: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  })),
  // status
  info: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 16v-4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8h.01"
  })),
  alertCircle: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 16h.01"
  })),
  sparkles: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l1.6 4.8a2 2 0 0 0 1.3 1.3L19.7 11l-4.8 1.6a2 2 0 0 0-1.3 1.3L12 19l-1.6-4.8a2 2 0 0 0-1.3-1.3L4.3 11l4.8-1.6a2 2 0 0 0 1.3-1.3z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 3v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5h4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 17v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17 19h4"
  })),
  // user
  user: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 21v-1a7 7 0 0 1 14 0v1"
  })),
  check: /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })
};
function Icon({
  name,
  size = 18,
  strokeWidth = 1.75,
  className,
  style,
  ...rest
}) {
  const d = PATHS[name];
  if (!d) return null;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
    className: className,
    style: style
  }, rest), d);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/chat/AssistantMessage.jsx
try { (() => {
function AssistantMessage({
  children,
  thinking = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hp-msg hp-msg--assistant",
    "data-role": "assistant"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-msg__avatar",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "cornerDownRight",
    size: 14,
    strokeWidth: 2
  })), /*#__PURE__*/React.createElement("div", {
    className: "hp-msg__column"
  }, thinking ? /*#__PURE__*/React.createElement("span", {
    className: "hp-msg__thinking",
    "aria-label": "Thinking"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)) : children));
}

/** A plain-text reply paragraph; lives inside <AssistantMessage>. */
function AssistantText({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hp-msg__text"
  }, children);
}
Object.assign(__ds_scope, { AssistantMessage, AssistantText });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chat/AssistantMessage.jsx", error: String((e && e.message) || e) }); }

// components/chat/BrandLogo.jsx
try { (() => {
function BrandLogo({
  size = "md",
  showWord = true,
  href
}) {
  const cls = `hp-brand ${size === "lg" ? "hp-brand--lg" : ""}`.trim();
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "hp-brand__mark",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "cornerDownRight",
    size: size === "lg" ? 22 : 16,
    strokeWidth: 2
  })), showWord && /*#__PURE__*/React.createElement("span", {
    className: "hp-brand__word"
  }, "Health", /*#__PURE__*/React.createElement("em", null, "Path")));
  if (href) {
    return /*#__PURE__*/React.createElement("a", {
      className: cls,
      href: href,
      "aria-label": "HealthPath home"
    }, inner);
  }
  return /*#__PURE__*/React.createElement("span", {
    className: cls
  }, inner);
}
Object.assign(__ds_scope, { BrandLogo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chat/BrandLogo.jsx", error: String((e && e.message) || e) }); }

// components/chat/DocumentCard.jsx
try { (() => {
function DocumentCard({
  title,
  caseId,
  language,
  status = "Draft",
  preview,
  onDownload,
  onCopy,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hp-doc",
    role: "group",
    "aria-label": `Document: ${title}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-doc__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-doc__icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "fileText",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    className: "hp-doc__meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-doc__title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "hp-doc__sub"
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "brand"
  }, status), caseId && /*#__PURE__*/React.createElement("code", null, caseId), language && /*#__PURE__*/React.createElement("span", null, language)))), preview && /*#__PURE__*/React.createElement("div", {
    className: "hp-doc__preview"
  }, typeof preview === "string" ? preview.split("\n\n").map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i
  }, p)) : preview), /*#__PURE__*/React.createElement("div", {
    className: "hp-doc__actions"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    size: "sm",
    leftIcon: /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "download",
      size: 14
    }),
    onClick: onDownload
  }, "Download"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "sm",
    leftIcon: /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "copy",
      size: 14
    }),
    onClick: onCopy
  }, "Copy text"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "sm",
    rightIcon: /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "arrowUpRight",
      size: 14
    }),
    onClick: onOpen
  }, "Open")));
}
Object.assign(__ds_scope, { DocumentCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chat/DocumentCard.jsx", error: String((e && e.message) || e) }); }

// components/chat/EscalationCard.jsx
try { (() => {
const DEFAULT_ICON = "alertCircle";
function EscalationCard({
  label = "Next step",
  title,
  description,
  icon = DEFAULT_ICON,
  primaryAction,
  secondaryAction
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hp-esc",
    role: "group",
    "aria-label": `Escalation: ${title}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-esc__icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    className: "hp-esc__body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-esc__label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "hp-esc__title"
  }, title), description && /*#__PURE__*/React.createElement("div", {
    className: "hp-esc__desc"
  }, description), (primaryAction || secondaryAction) && /*#__PURE__*/React.createElement("div", {
    className: "hp-esc__actions"
  }, primaryAction && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hp-esc__action hp-esc__action--primary",
    onClick: primaryAction.onClick
  }, primaryAction.icon, primaryAction.label), secondaryAction && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hp-esc__action",
    onClick: secondaryAction.onClick
  }, secondaryAction.icon, secondaryAction.label))));
}
Object.assign(__ds_scope, { EscalationCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chat/EscalationCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Disclaimer.jsx
try { (() => {
const DEFAULT_TEXT = "I help with access and paperwork, not medical advice.";
function Disclaimer({
  text = DEFAULT_TEXT,
  showIcon = true,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("p", {
    className: `hp-disclaimer ${className}`.trim()
  }, showIcon && /*#__PURE__*/React.createElement("span", {
    className: "hp-disclaimer__icon"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "info",
    size: 13
  })), /*#__PURE__*/React.createElement("span", null, text));
}
Object.assign(__ds_scope, { Disclaimer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Disclaimer.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  size = "md",
  variant = "ghost",
  round = false,
  className = "",
  children,
  label,
  ...rest
}) {
  const cls = ["hp-icon-button", variant === "brand" && "hp-icon-button--brand", round && "hp-icon-button--round", size === "sm" && "hp-icon-button--sm", size === "lg" && "hp-icon-button--lg", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    "aria-label": label,
    title: label
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/chat/Composer.jsx
try { (() => {
const {
  useEffect,
  useRef,
  useState
} = React;
/**
 * Bottom composer. Self-contains the textarea, mic, attachment, send,
 * and the persistent disclaimer line.
 */
function Composer({
  value: controlledValue,
  onChange,
  onSend,
  onAttach,
  onMicToggle,
  isRecording = false,
  placeholder = "Tell me what's going on…",
  disabled = false,
  disclaimer,
  autoFocus = false
}) {
  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const setValue = v => {
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
  const handleKey = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "hp-composer-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-composer"
  }, /*#__PURE__*/React.createElement("textarea", {
    ref: textareaRef,
    className: "hp-composer__textarea",
    value: value,
    onChange: e => setValue(e.target.value),
    onKeyDown: handleKey,
    placeholder: placeholder,
    disabled: disabled,
    rows: 1,
    "aria-label": "Message HealthPath"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hp-composer__row"
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Attach photo or document",
    size: "md",
    onClick: onAttach
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "paperclip",
    size: 18
  })), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: isRecording ? "Stop recording" : "Voice input",
    size: "md",
    className: isRecording ? "hp-composer__mic--recording" : "",
    onClick: onMicToggle
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "mic",
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    className: "hp-composer__spacer"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hp-composer__send",
    "aria-label": "Send",
    disabled: !canSend,
    onClick: handleSend
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrowUp",
    size: 18,
    strokeWidth: 2.25
  })))), /*#__PURE__*/React.createElement(__ds_scope.Disclaimer, {
    text: disclaimer
  }));
}
Object.assign(__ds_scope, { Composer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chat/Composer.jsx", error: String((e && e.message) || e) }); }

// components/chat/Sidebar.jsx
try { (() => {
function Sidebar({
  cases = [],
  activeId,
  onSelectCase,
  onNewCase,
  user,
  onClose // mobile-only — pass to close the drawer
}) {
  // Group by recency bucket
  const groups = groupCases(cases);
  return /*#__PURE__*/React.createElement("aside", {
    className: "hp-sidebar",
    "aria-label": "Cases"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-sidebar__header"
  }, /*#__PURE__*/React.createElement(__ds_scope.BrandLogo, null), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Close menu",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrowLeft",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hp-sidebar__actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hp-sidebar__action",
    onClick: onNewCase
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "penSquare",
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, "New case"))), /*#__PURE__*/React.createElement("nav", {
    className: "hp-sidebar__list",
    "aria-label": "Past cases"
  }, groups.map(g => g.items.length === 0 ? null : /*#__PURE__*/React.createElement(React.Fragment, {
    key: g.label
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-sidebar__section-label"
  }, g.label), g.items.map(c => /*#__PURE__*/React.createElement(__ds_scope.ConversationItem, {
    key: c.id,
    title: c.title,
    meta: c.meta,
    status: c.status,
    active: c.id === activeId,
    onClick: () => onSelectCase?.(c.id)
  }))))), user && /*#__PURE__*/React.createElement("div", {
    className: "hp-sidebar__footer"
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    initials: user.initials,
    src: user.avatar
  }), /*#__PURE__*/React.createElement("div", {
    className: "hp-sidebar__user"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hp-sidebar__user-name"
  }, user.name), user.meta && /*#__PURE__*/React.createElement("span", {
    className: "hp-sidebar__user-meta"
  }, user.meta)), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    label: "Account options"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "more",
    size: 16
  }))));
}
function groupCases(cases) {
  const open = [];
  const recent = [];
  const earlier = [];
  for (const c of cases) {
    if (c.bucket === "open") open.push(c);else if (c.bucket === "earlier") earlier.push(c);else recent.push(c);
  }
  return [{
    label: "Open now",
    items: open
  }, {
    label: "Last 7 days",
    items: recent
  }, {
    label: "Earlier",
    items: earlier
  }];
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chat/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Field({
  label,
  help,
  error,
  children,
  htmlFor
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: "hp-field",
    htmlFor: htmlFor
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "hp-field__label"
  }, label), children, error ? /*#__PURE__*/React.createElement("span", {
    className: "hp-field__error",
    role: "alert"
  }, error) : help ? /*#__PURE__*/React.createElement("span", {
    className: "hp-field__help"
  }, help) : null);
}
function Input({
  leftIcon,
  className = "",
  ...rest
}) {
  if (!leftIcon) {
    return /*#__PURE__*/React.createElement("input", _extends({
      className: `hp-input ${className}`.trim()
    }, rest));
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--text-muted)",
      display: "inline-flex"
    }
  }, leftIcon), /*#__PURE__*/React.createElement("input", _extends({
    className: `hp-input ${className}`.trim(),
    style: {
      paddingLeft: 38
    }
  }, rest)));
}
function Textarea({
  className = "",
  rows = 3,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("textarea", _extends({
    className: `hp-textarea ${className}`.trim(),
    rows: rows
  }, rest));
}
Object.assign(__ds_scope, { Field, Input, Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// ui_kits/healthpath/screens.jsx
try { (() => {
// ============================================================
// HealthPath — application screens
//
// These compose the components in components/core + components/chat.
// Copy-paste-ready for engineering. Each Screen is a self-contained
// React component with mock data; swap in real backend handlers.
// ============================================================

/* global React */
const {
  useState,
  useMemo,
  useRef,
  useEffect
} = React;

// Pulled from the design-system bundle (window.<Namespace>.<Name>)
const NS = window.HealthPathDesignSystem_54b6fa;
const {
  Icon,
  Button,
  IconButton,
  Input,
  Textarea,
  Field,
  Avatar,
  Badge,
  Disclaimer,
  BrandLogo,
  UserBubble,
  AssistantMessage,
  AssistantText,
  DocumentCard,
  EscalationCard,
  Composer,
  ConversationItem,
  Sidebar
} = NS;

// ---- Mock data --------------------------------------------------

const MOCK_CASES = [{
  id: "c1",
  title: "Medication denied by EPS",
  meta: "Today · waiting on EPS",
  status: "waiting",
  bucket: "open"
}, {
  id: "c2",
  title: "Hospital bill — wrong copay",
  meta: "2 days ago · draft sent",
  status: "open",
  bucket: "recent"
}, {
  id: "c3",
  title: "Appointment reassignment",
  meta: "5 days ago",
  bucket: "recent"
}, {
  id: "c4",
  title: "Vaccination record request",
  meta: "Last month",
  bucket: "earlier"
}, {
  id: "c5",
  title: "Insurance card replacement",
  meta: "Last month",
  bucket: "earlier"
}];
const USER = {
  name: "María R.",
  meta: "Bogotá",
  initials: "MR"
};
const SAMPLE_LETTER = `Bogotá, 20 de junio de 2026

Estimado/a Director/a de Atención al Usuario:

Mediante la presente solicito formalmente la entrega del medicamento Atorvastatina 40 mg, prescrito por mi médico tratante el 4 de junio de 2026 (orden adjunta), que mi EPS ha negado sin justificación escrita.

Conforme al artículo 10 de la Resolución 1604 de 2013, agradeceré una respuesta escrita en un plazo máximo de diez (10) días hábiles, indicando si el medicamento será entregado o las razones formales de su negación.

Atentamente,
María R.
CC. 1.020.…
Caso CASE-2026-04812`;

// ============================================================
// 1. LOGIN screen
// ============================================================

function LoginScreen({
  onSignedIn
}) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const submit = e => {
    e.preventDefault();
    onSignedIn?.({
      email,
      name: name || "María R."
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "hp hp-auth"
  }, /*#__PURE__*/React.createElement("form", {
    className: "hp-auth__card",
    onSubmit: submit,
    noValidate: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-auth__brand"
  }, /*#__PURE__*/React.createElement(BrandLogo, {
    size: "lg"
  }), /*#__PURE__*/React.createElement("h1", {
    className: "hp-auth__title"
  }, mode === "login" ? "Welcome back." : "Let's get started."), /*#__PURE__*/React.createElement("p", {
    className: "hp-auth__sub"
  }, mode === "login" ? "I'll pick up your cases where we left off." : "One small step. Nothing here is medical advice — I help with paperwork and access.")), mode === "register" && /*#__PURE__*/React.createElement(Field, {
    label: "Your name",
    htmlFor: "name"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "name",
    type: "text",
    autoComplete: "name",
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "What should I call you?"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    htmlFor: "email"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "email",
    type: "email",
    autoComplete: "email",
    required: true,
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 16
    }),
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "you@example.com"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Password",
    htmlFor: "password",
    help: mode === "register" ? "At least 8 characters." : undefined
  }, /*#__PURE__*/React.createElement(Input, {
    id: "password",
    type: "password",
    autoComplete: mode === "login" ? "current-password" : "new-password",
    required: true,
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 16
    }),
    value: password,
    onChange: e => setPassword(e.target.value),
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    block: true,
    type: "submit"
  }, mode === "login" ? "Sign in" : "Create account"), /*#__PURE__*/React.createElement("div", {
    className: "hp-auth__divider"
  }, "or"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    block: true,
    type: "button"
  }, "Continue as a guest"), /*#__PURE__*/React.createElement("p", {
    className: "hp-auth__foot"
  }, mode === "login" ? /*#__PURE__*/React.createElement(React.Fragment, null, "New here?", " ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      setMode("register");
    }
  }, "Create an account")) : /*#__PURE__*/React.createElement(React.Fragment, null, "Already have an account?", " ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      setMode("login");
    }
  }, "Sign in"))), /*#__PURE__*/React.createElement(Disclaimer, null)));
}

// ============================================================
// 2. EMPTY state (first conversation)
// ============================================================

const STARTER_PROMPTS = ["My insurance denied a medicine I need", "Help me draft a complaint letter", "What's covered under my plan?", "I've been waiting 3 weeks for an answer", "Find a pharmacy that has my prescription"];
function EmptyState({
  onStart,
  userName
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hp-empty"
  }, /*#__PURE__*/React.createElement(BrandLogo, {
    size: "lg",
    showWord: false
  }), /*#__PURE__*/React.createElement("h1", {
    className: "hp-empty__title"
  }, "Hi", userName ? `, ${userName.split(" ")[0]}` : "", ". What's on your mind?"), /*#__PURE__*/React.createElement("p", {
    className: "hp-empty__sub"
  }, "Tell me what's going on, in your own words. I can explain insurance coverage, draft a complaint letter, or figure out who to ask next. Take your time."), /*#__PURE__*/React.createElement("div", {
    className: "hp-empty__chips"
  }, STARTER_PROMPTS.map(p => /*#__PURE__*/React.createElement("button", {
    key: p,
    type: "button",
    className: "hp-empty__chip",
    onClick: () => onStart?.(p)
  }, p))));
}

// ============================================================
// 3. Thread — a rendered list of messages, supports all 3 types
// ============================================================

function Thread({
  messages
}) {
  const scrollerRef = useRef(null);
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // Smoothly scroll to bottom without using scrollIntoView
    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth"
    });
  }, [messages.length]);
  return /*#__PURE__*/React.createElement("div", {
    className: "hp-thread",
    ref: scrollerRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-thread__inner"
  }, messages.map((m, i) => /*#__PURE__*/React.createElement(MessagePart, {
    key: i,
    message: m
  }))));
}
function MessagePart({
  message
}) {
  if (message.role === "user") {
    return /*#__PURE__*/React.createElement(UserBubble, null, message.text);
  }
  if (message.role === "assistant") {
    return /*#__PURE__*/React.createElement(AssistantMessage, {
      thinking: message.thinking
    }, message.text && /*#__PURE__*/React.createElement(AssistantText, null, message.text), message.kind === "document" && /*#__PURE__*/React.createElement(DocumentCard, {
      title: message.title,
      caseId: message.caseId,
      language: message.language,
      status: message.status || "Draft",
      preview: message.preview,
      onDownload: () => downloadText(message.title + ".txt", message.preview),
      onCopy: () => navigator.clipboard?.writeText(message.preview || ""),
      onOpen: () => alert("Open full document")
    }), message.kind === "escalation" && /*#__PURE__*/React.createElement(EscalationCard, {
      label: message.label,
      title: message.title,
      description: message.description,
      icon: message.icon,
      primaryAction: message.primaryAction,
      secondaryAction: message.secondaryAction
    }));
  }
  return null;
}
function downloadText(filename, text) {
  const blob = new Blob([text || ""], {
    type: "text/plain;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ============================================================
// 4. Main chat view (sidebar + main panel + composer)
// ============================================================

const SAMPLE_CONVERSATION = [{
  role: "user",
  text: "Mi EPS me negó la Atorvastatina que mi doctor recetó. La necesito para mi colesterol. ¿Qué puedo hacer?"
}, {
  role: "assistant",
  text: "Lamento que estés pasando por esto — pasa más de lo que debería, y hay un camino claro para resolverlo. Lo primero es pedir la negación por escrito. Tu EPS está obligada a entregártela. Después, presentamos una solicitud formal y, si no responden en 10 días hábiles, podemos avanzar.\n\nQuieres que prepare la solicitud formal ahora?"
}, {
  role: "user",
  text: "Sí, por favor. Hazlo en español formal."
}, {
  role: "assistant",
  text: "Aquí tienes el borrador. Lo dejé formal porque es lo que la oficina espera. Puedes copiarlo tal cual o cambiar lo que quieras antes de enviar.",
  kind: "document",
  title: "Solicitud formal de medicamento",
  caseId: "CASE-2026-04812",
  language: "Spanish · formal",
  status: "Draft",
  preview: SAMPLE_LETTER
}, {
  role: "assistant",
  kind: "escalation",
  label: "Heads up",
  title: "Tu caso lleva 18 días abierto sin respuesta.",
  description: "La EPS tiene 10 días hábiles para responder por escrito. Es momento de pedir una respuesta formal y dejar constancia.",
  icon: "clock",
  primaryAction: {
    label: "Redactar recordatorio",
    onClick: () => alert("Drafting reminder…")
  },
  secondaryAction: {
    label: "¿A quién llamo?",
    onClick: () => alert("Showing contacts…")
  }
}];
function MainChat({
  initialMessages,
  cases = MOCK_CASES,
  user = USER,
  mobile = false,
  onBackToShowcase
}) {
  const [activeId, setActiveId] = useState("c1");
  const [messages, setMessages] = useState(initialMessages || []);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const active = useMemo(() => cases.find(c => c.id === activeId), [cases, activeId]);
  const send = text => {
    if (!text) return;
    setMessages(m => [...m, {
      role: "user",
      text
    }]);
    // Mock assistant reply
    setTimeout(() => {
      setMessages(m => [...m, {
        role: "assistant",
        thinking: true
      }]);
      setTimeout(() => {
        setMessages(m => {
          const next = m.filter(x => !x.thinking);
          return [...next, {
            role: "assistant",
            text: "Got it. Let me pull up what your plan actually says about that — give me a moment."
          }];
        });
      }, 1200);
    }, 200);
  };
  const startFromPrompt = p => {
    setMessages([{
      role: "user",
      text: p
    }]);
    setTimeout(() => {
      setMessages(m => [...m, {
        role: "assistant",
        thinking: true
      }]);
      setTimeout(() => {
        setMessages(m => {
          const next = m.filter(x => !x.thinking);
          return [...next, {
            role: "assistant",
            text: "I can help with that. Tell me a little more — what's the medicine, who's the insurance, and what did they say when they denied it?"
          }];
        });
      }, 900);
    }, 200);
  };
  const newCase = () => {
    setMessages([]);
    setActiveId("new");
    if (mobile) setDrawerOpen(false);
  };
  const empty = messages.length === 0;
  const shellClass = ["hp hp-app", mobile && "hp--mobile", mobile && drawerOpen && "hp--drawer-open"].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: shellClass
  }, mobile && /*#__PURE__*/React.createElement("div", {
    className: "hp-sidebar-scrim",
    onClick: () => setDrawerOpen(false),
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement(Sidebar, {
    cases: cases,
    activeId: activeId,
    onSelectCase: id => {
      setActiveId(id);
      if (id === "c1") setMessages(SAMPLE_CONVERSATION);else setMessages([]);
      if (mobile) setDrawerOpen(false);
    },
    onNewCase: newCase,
    user: user,
    onClose: mobile ? () => setDrawerOpen(false) : undefined
  }), /*#__PURE__*/React.createElement("main", {
    className: "hp-main"
  }, /*#__PURE__*/React.createElement("header", {
    className: "hp-main__header"
  }, mobile && /*#__PURE__*/React.createElement(IconButton, {
    label: "Open menu",
    onClick: () => setDrawerOpen(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "menu",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    className: "hp-main__title"
  }, empty ? "New case" : active?.title || "Conversation"), active?.status && !empty && /*#__PURE__*/React.createElement(Badge, {
    tone: active.status === "waiting" ? "warn" : "brand"
  }, active.status === "waiting" ? "Waiting on reply" : "Open"), !mobile && /*#__PURE__*/React.createElement(IconButton, {
    label: "More options"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more",
    size: 18
  }))), empty ? /*#__PURE__*/React.createElement(EmptyState, {
    userName: user?.name,
    onStart: startFromPrompt
  }) : /*#__PURE__*/React.createElement(Thread, {
    messages: messages
  }), /*#__PURE__*/React.createElement(Composer, {
    onSend: send,
    onAttach: () => alert("Open file picker"),
    onMicToggle: () => setRecording(r => !r),
    isRecording: recording,
    autoFocus: !mobile
  })));
}

// ============================================================
// Showcase — switcher across screens (the wrapper this demo uses).
// In production, your router renders LoginScreen → MainChat directly.
// ============================================================

function Showcase() {
  const [screen, setScreen] = useState("chat-loaded"); // login | empty | chat-loaded | mobile-chat | mobile-empty
  const [user, setUser] = useState(USER);
  const screens = [{
    id: "chat-loaded",
    label: "Main chat"
  }, {
    id: "empty",
    label: "Empty state"
  }, {
    id: "login",
    label: "Sign in"
  }, {
    id: "mobile-chat",
    label: "Mobile · chat"
  }, {
    id: "mobile-empty",
    label: "Mobile · empty"
  }];
  let content;
  if (screen === "login") {
    content = /*#__PURE__*/React.createElement(LoginScreen, {
      onSignedIn: u => {
        setUser({
          ...USER,
          ...u
        });
        setScreen("chat-loaded");
      }
    });
  } else if (screen === "empty") {
    content = /*#__PURE__*/React.createElement(MainChat, {
      user: user,
      initialMessages: []
    });
  } else if (screen === "chat-loaded") {
    content = /*#__PURE__*/React.createElement(MainChat, {
      user: user,
      initialMessages: SAMPLE_CONVERSATION
    });
  } else if (screen === "mobile-chat") {
    content = /*#__PURE__*/React.createElement("div", {
      className: "hp-mobile-frame"
    }, /*#__PURE__*/React.createElement(MainChat, {
      user: user,
      initialMessages: SAMPLE_CONVERSATION,
      mobile: true
    }));
  } else if (screen === "mobile-empty") {
    content = /*#__PURE__*/React.createElement("div", {
      className: "hp-mobile-frame"
    }, /*#__PURE__*/React.createElement(MainChat, {
      user: user,
      initialMessages: [],
      mobile: true
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "showcase"
  }, /*#__PURE__*/React.createElement("div", {
    className: "showcase__bar"
  }, /*#__PURE__*/React.createElement(BrandLogo, null), /*#__PURE__*/React.createElement("span", {
    className: "showcase__sep"
  }), screens.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    type: "button",
    className: "showcase__tab" + (screen === s.id ? " is-active" : ""),
    onClick: () => setScreen(s.id)
  }, s.label)), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "showcase__meta"
  }, user.name)), /*#__PURE__*/React.createElement("div", {
    className: "showcase__stage"
  }, content));
}

// Mount
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(Showcase, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/healthpath/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AssistantMessage = __ds_scope.AssistantMessage;

__ds_ns.AssistantText = __ds_scope.AssistantText;

__ds_ns.BrandLogo = __ds_scope.BrandLogo;

__ds_ns.Composer = __ds_scope.Composer;

__ds_ns.ConversationItem = __ds_scope.ConversationItem;

__ds_ns.DocumentCard = __ds_scope.DocumentCard;

__ds_ns.EscalationCard = __ds_scope.EscalationCard;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.UserBubble = __ds_scope.UserBubble;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Disclaimer = __ds_scope.Disclaimer;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

})();
