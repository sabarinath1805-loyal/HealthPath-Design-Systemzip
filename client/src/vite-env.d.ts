/// <reference types="vite/client" />

// The HealthPath design-system components are authored in plain JS/JSX.
// Treat them as untyped modules so consumers don't fight inferred prop types.
declare module "@/components/*";
