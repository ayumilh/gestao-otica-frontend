'use client';
import React from 'react';
import { tv } from 'tailwind-variants';

const inputStyles = tv({
  base: `peer w-full px-3 py-2 border rounded-lg font-medium
           bg-white text-neutral-600 placeholder-gray-400 border-gray-300
           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
           transition-all duration-300 ease-out
           
           dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-600 
           dark:placeholder-neutral-400 dark:focus:ring-blue-500 
           dark:focus:ring-offset-gray-900 dark:backdrop-blur-sm dark:shadow-md`,
  variants: {
    error: {
      true: `outline-none ring-2 ring-red-500 focus:ring-red-500`,
    },
  },
});


export default function InputField({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  required = false,
  maxLength,
  minLength,
  className = '',
}) {
  // Formata telefone para exibição
  const formatPhone = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 10) {
      return digits
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d{1,4})$/, '$1-$2');
    }
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
  };

  // Formata CPF para exibição
  const formatCpf = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    return digits
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2');
  };

  // Formata valor monetário para exibição
  const formatMoney = (val) => {
    const raw = String(val || '').replace(/\D/g, '');
    const floatVal = (parseFloat(raw) / 100).toFixed(2);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(floatVal);
  };


  // Manipula mudança de campos mascarados
  const handleMaskedChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    if (name === 'cli_telefone') {
      onChange({ target: { name, value: raw } });
    } else if (name === 'cli_cpf') {
      onChange({ target: { name, value: raw } });
    } else if (['preco', 'sinal', 'a_pagar'].includes(name)) {
      const floatValue = (parseFloat(raw) / 100).toFixed(2);
      onChange({ target: { name, value: floatValue } });
    }
  };

  // Valor formatado para exibição
  const formattedValue = () => {
    if (name === 'cli_telefone') return formatPhone(value || '');
    if (name === 'cli_cpf') return formatCpf(value || '');
    if (['preco', 'sinal', 'a_pagar'].includes(name)) return formatMoney(value || '0');
    return value;
  };

  const isMasked = ['cli_telefone', 'cli_cpf', 'preco', 'sinal', 'a_pagar'].includes(name);

  return (
    <div className="w-full mt-3 mb-4 px-3">
      {label && (
        <label
          htmlFor={name}
          className="block font-medium text-sm text-neutral-700 dark:text-neutral-300"
        >
          {label} {required && <span className="text-red-600 dark:text-red-600">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type === 'money' ? 'text' : type}
        placeholder={placeholder}
        value={formattedValue()}
        onChange={isMasked ? handleMaskedChange : onChange}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        className={`${inputStyles({ error: !!error })} ${className}`}
        inputMode={['preco', 'sinal', 'a_pagar'].includes(name) ? 'numeric' : 'text'}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
