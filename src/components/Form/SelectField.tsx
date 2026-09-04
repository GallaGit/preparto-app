import type { SelectHTMLAttributes } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import { formFieldClassName } from '@/utils/formHelpers';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

export function SelectField({
  id,
  label,
  options,
  placeholder,
  error,
  className = '',
  ...props
}: SelectFieldProps) {
  const { t } = useI18n();
  const placeholderText = placeholder ?? t('common.selectPlaceholder');
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-on-surface">
        {label}
      </label>
      <select
        id={id}
        className={[formFieldClassName, className].filter(Boolean).join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        <option value="">{placeholderText}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${id}-error`} className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
