import type { TextareaHTMLAttributes } from 'react';
import { formFieldClassName } from '@/utils/formHelpers';

interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
}

export function TextAreaField({
  id,
  label,
  error,
  className = '',
  rows = 3,
  ...props
}: TextAreaFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-on-surface">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className={[formFieldClassName, 'min-h-24', className]
          .filter(Boolean)
          .join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
