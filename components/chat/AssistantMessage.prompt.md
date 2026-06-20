One assistant turn. Avatar + a vertical column for one or more text paragraphs and/or cards.

```jsx
<AssistantMessage>
  <AssistantText>I can draft that letter for you. Here it is.</AssistantText>
  <DocumentCard title="Solicitud de medicamento" {...docProps} />
</AssistantMessage>
```

Use `thinking` for the streaming state before the first token arrives.
