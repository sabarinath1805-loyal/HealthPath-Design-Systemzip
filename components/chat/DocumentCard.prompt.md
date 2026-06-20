A generated document (complaint letter, claim form, formal request) rendered inline in chat. Distinct from a plain bubble: its own card chrome, file icon, preview with fade, and clear Download/Copy actions.

```jsx
<DocumentCard
  title="Solicitud formal de medicamento"
  caseId="CASE-2026-04812"
  language="Spanish · formal"
  preview={"Estimado/a Director/a:\n\nLe escribo para solicitar..."}
  onDownload={() => save(letter)}
  onCopy={() => navigator.clipboard.writeText(letter)}
  onOpen={() => open(letter)}
/>
```

Always lives inside an `<AssistantMessage>`. Never raise it to a full-screen artifact; the user just wants the text.
