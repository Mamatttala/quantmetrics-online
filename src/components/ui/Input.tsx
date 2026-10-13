"use client";

import { useId } from "react";
import type { ChangeEventHandler, ReactNode } from "react";

import {
  FieldShell,
  controlClasses,
  fieldMessageId,
  type ControlSize,
  type ControlVariant,
  type FieldState,
} from "@/components/ui/Field";
import { cn } from "@/lib/utils";

export interface InputProps {
  id?: string;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  success?: ReactNode;
  required?: boolean;
  type?: "text" | "email" | "search" | "password" | "number";
  variant?: ControlVariant;
  size?: ControlSize;
  state?: FieldState;
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  fieldClassName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

function resolveState(state: FieldState | undefined, error: ReactNode, success: ReactNode): FieldState {
  if (state) {
    return state;
  }
  if (error) {
    return "error";
  }
  if (success) {
    return "success";
  }
  return "default";
}

export function Input({
  id,
  label,
  hint,
  error,
  success,
  required,
  type = "text",
  variant = "default",
  size = "default",
  state,
  name,
  value,
  defaultValue,
  placeholder,
  autoComplete,
  disabled,
  readOnly,
  className,
  fieldClassName,
  onChange,
}: InputProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const resolved = resolveState(state, error, success);
  const describedBy = error || success || hint ? fieldMessageId(fieldId) : undefined;

  return (
    <FieldShell
      id={fieldId}
      label={label}
      hint={hint}
      error={error}
      success={success}
      required={required}
      className={fieldClassName}
    >
      <input
        id={fieldId}
        name={name}
        type={type}
        className={controlClasses({ state: resolved, variant, size, className })}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        aria-invalid={resolved === "error" || undefined}
        aria-describedby={describedBy}
        onChange={onChange}
      />
    </FieldShell>
  );
}

export interface TextareaProps {
  id?: string;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  success?: ReactNode;
  required?: boolean;
  state?: FieldState;
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
  fieldClassName?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

export function Textarea({
  id,
  label,
  hint,
  error,
  success,
  required,
  state,
  name,
  value,
  defaultValue,
  placeholder,
  rows = 4,
  disabled,
  className,
  fieldClassName,
  onChange,
}: TextareaProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const resolved = resolveState(state, error, success);
  const describedBy = error || success || hint ? fieldMessageId(fieldId) : undefined;

  return (
    <FieldShell
      id={fieldId}
      label={label}
      hint={hint}
      error={error}
      success={success}
      required={required}
      className={fieldClassName}
    >
      <textarea
        id={fieldId}
        name={name}
        rows={rows}
        className={controlClasses({
          state: resolved,
          fixedHeight: false,
          className: cn("min-h-12 resize-y px-2.5 py-2", className),
        })}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={resolved === "error" || undefined}
        aria-describedby={describedBy}
        onChange={onChange}
      />
    </FieldShell>
  );
}

export interface SelectProps {
  id?: string;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  success?: ReactNode;
  required?: boolean;
  state?: FieldState;
  size?: ControlSize;
  name?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  placeholderOption?: string;
  className?: string;
  fieldClassName?: string;
  children: ReactNode;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

export function Select({
  id,
  label,
  hint,
  error,
  success,
  required,
  state,
  size = "default",
  name,
  value,
  defaultValue,
  disabled,
  placeholderOption,
  className,
  fieldClassName,
  children,
  onChange,
}: SelectProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const resolved = resolveState(state, error, success);
  const describedBy = error || success || hint ? fieldMessageId(fieldId) : undefined;

  return (
    <FieldShell
      id={fieldId}
      label={label}
      hint={hint}
      error={error}
      success={success}
      required={required}
      className={fieldClassName}
    >
      <span className="relative block">
        <select
          id={fieldId}
          name={name}
          className={controlClasses({
            state: resolved,
            size,
            className: cn("appearance-none pr-6", className),
          })}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          required={required}
          aria-invalid={resolved === "error" || undefined}
          aria-describedby={describedBy}
          onChange={onChange}
        >
          {placeholderOption ? <option value="">{placeholderOption}</option> : null}
          {children}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-text-dim"
        >
          <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 4.5 6 8l3.5-3.5" />
          </svg>
        </span>
      </span>
    </FieldShell>
  );
}