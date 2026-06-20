import React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "ref"> {
  /** Optional icon node rendered inside the input on the left. */
  leftIcon?: React.ReactNode;
}

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "ref"> {}

export interface FieldProps {
  label?: React.ReactNode;
  /** Hint text shown below the input. */
  help?: React.ReactNode;
  /** Error message — replaces `help` when present and uses --danger. */
  error?: React.ReactNode;
  htmlFor?: string;
  children: React.ReactNode;
}

/** Single-line input. */
export declare function Input(props: InputProps): JSX.Element;
/** Multi-line input. Composer uses its own implementation; this is for forms. */
export declare function Textarea(props: TextareaProps): JSX.Element;
/** Label/help/error wrapper. Wrap an Input or Textarea inside. */
export declare function Field(props: FieldProps): JSX.Element;
