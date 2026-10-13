"use client";

import { useId } from "react";
import type { ChangeEventHandler, ReactNode } from "react";

import { fieldMessageId, type FieldState } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

export interface CheckboxProps {
  id?: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  success?: ReactNode;
  state?: FieldState;
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  /** 12px muted supporting text, as in the sign-up panel. */
  description?: ReactNode;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

/** Native checkbox tinted through `accent-color`, so it stays keyboard-safe. */
export function Checkbox({
  id,
  label,
  hint,
  error,
  success,
  state,
  name,
  value,
  checked,
  defaultChecked,
  disabled,
  description,
  className,
  onChange,
}: CheckboxProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const resolved: FieldState = state ?? (error ? "error" : success ? "success" : "default");
  const message = error ?? success ?? hint;

  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <label htmlFor={fieldId} className="flex cursor-pointer items-start gap-1">
        <input
          id={fieldId}
          name={name}
          value={value}
          type="checkbox"
          className={cn(
            "mt-0.5 size-2 shrink-0 accent-text disabled:cursor-not-allowed disabled:opacity-40",
            resolved === "error" && "ring-1 ring-negative",
            resolved === "success" && "ring-1 ring-positive",
          )}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-invalid={resolved === "error" || undefined}
          aria-describedby={message ? fieldMessageId(fieldId) : undefined}
          onChange={onChange}
        />
        <span className="text-meta">
          <span className="text-text">{label}</span>
          {description ? <span className="text-text-dim"> {description}</span> : null}
        </span>
      </label>

      {message ? (
        <p id={fieldMessageId(fieldId)} className="text-meta pl-3">
          <span className={cn(error ? "text-negative" : success ? "text-positive" : "text-text-dim")}>{message}</span>
        </p>
      ) : null}
    </div>
  );
}