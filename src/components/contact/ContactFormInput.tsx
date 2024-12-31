import React from 'react';

interface ContactFormInputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'textarea';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
}

export function ContactFormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  disabled = false,
  required = true,
  rows = 4
}: ContactFormInputProps) {
  const baseClassName = "w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm focus:outline-none focus:border-white transition-colors";
  
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className={baseClassName}
          required={required}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={baseClassName}
          required={required}
          disabled={disabled}
        />
      )}
    </div>
  );
}