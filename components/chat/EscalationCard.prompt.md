A recommended next step when the user has been stuck (waiting too long, dead-ended). The visually distinct card type: amber accent + thick left border + icon. Lives inside an `<AssistantMessage>`.

```jsx
<EscalationCard
  label="Next step"
  title="Your case has been open for 18 days. Time to send a formal reminder."
  description="The office has 30 working days to respond. A written reminder restarts the clock and creates a paper trail."
  primaryAction={{ label: "Draft a reminder", onClick: openLetter }}
  secondaryAction={{ label: "Who do I call?", onClick: openDir }}
/>
```

Use sparingly — one escalation per turn at most. Title should be a complete sentence answering "what should I do now?"
