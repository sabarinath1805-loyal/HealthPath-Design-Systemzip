The bottom message bar. Includes the textarea (auto-grows to ~160px), attachment + mic + send buttons, and the persistent disclaimer line. Place once per chat screen.

```jsx
<Composer
  onSend={(text) => sendMessage(text)}
  onAttach={openFilePicker}
  onMicToggle={() => setRec((r) => !r)}
  isRecording={rec}
/>
```

Voice input is critical to this product — many users have limited literacy. The mic button is always visible, never hidden behind a menu.
