Round user avatar (or rounded-square `brand` avatar for the assistant). Fallback to two-letter initials when no `src`.

```jsx
<Avatar initials="MR" />
<Avatar src="/me.jpg" alt="Maria" size="lg" />
<Avatar brand /> {/* assistant — pair with <Icon name="sparkles" /> inside */}
```
