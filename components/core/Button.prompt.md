HealthPath's primary button. Use for CTAs in dialogs, the auth screen, and inline chat actions.

```jsx
<Button variant="primary" onClick={onSend}>Send draft</Button>
<Button variant="secondary" leftIcon={<Icon name="download" size={16} />}>Download</Button>
<Button variant="ghost" size="sm">Skip</Button>
```

Variants: `primary` (teal fill, sole hero CTA per screen), `secondary` (bordered, white fill), `ghost` (transparent), `danger` (only truly destructive). Sizes: `sm` 32, `md` 40 (default), `lg` 48 (mobile-friendly).
