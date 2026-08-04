import type { InputHTMLAttributes } from 'react';
import { TextField } from '@/components/Form/TextField';

interface DateTimeFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: string;
  error?: string;
}

export function DateTimeField({
  id,
  label,
  error,
  ...props
}: DateTimeFieldProps) {
  return (
    <TextField
      id={id}
      label={label}
      type="datetime-local"
      error={error}
      {...props}
    />
  );
}
