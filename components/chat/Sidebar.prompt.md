The left sidebar. Holds the brand mark, the "New case" action, the grouped list of past cases ("Open now" / "Last 7 days" / "Earlier"), and the signed-in user footer.

```jsx
<Sidebar
  cases={cases}
  activeId={current}
  onSelectCase={setCurrent}
  onNewCase={createCase}
  user={{ name: "María R.", meta: "Bogotá", initials: "MR" }}
/>
```

On mobile, pass `onClose` and wrap the parent with `.hp--mobile.hp--drawer-open` to display as a slide-in drawer with scrim.
