import React, { useState } from 'react';

// Minimalist modern input field (single-file React + Tailwind)
// Usage examples are at the bottom of this file.

export default function MinimalInput({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  helper = '',
  clearable = false,
  className = '',
  leftIcon = null,
  rightIcon = null,
  autoFocus = false,
  ...rest
}) {
  const [internalType, setInternalType] = useState(type);

  const showPasswordToggle = type === 'password';

  function handleClear() {
    if (onChange) onChange({ target: { value: '' } });
  }

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div
        className={`relative flex items-center rounded-xl border transition-shadow focus-within:ring-2 focus-within:ring-indigo-400 ${
          error
            ? 'border-red-300 shadow-[0_0_0_3px_rgba(239,68,68,0.06)]'
            : 'border-gray-200 shadow-sm'
        } bg-white/60 backdrop-blur-sm`}
      >
        {/* left icon slot */}
        {leftIcon && (
          <div className="pl-3 pr-2 flex items-center pointer-events-none text-gray-400">{leftIcon}</div>
        )}

        <input
          id={id}
          type={internalType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : helper ? `${id}-help` : undefined}
          className={`w-full bg-transparent px-4 py-2 text-sm outline-none placeholder-gray-400 transition-colors caret-indigo-600 ${
            leftIcon ? 'pl-0' : ''
          }`}
          {...rest}
        />

        {/* clear button */}
        {clearable && value && (
          <button
            type="button"
            onClick={handleClear}
            className="p-2 mr-1 rounded-md hover:bg-gray-100 active:scale-95"
            aria-label="Clear input"
          >
            {/* simple X icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 8.586L15.293 3.293a1 1 0 011.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707A1 1 0 014.707 3.293L10 8.586z" clipRule="evenodd" />
            </svg>
          </button>
        )}

        {/* password toggle */}
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setInternalType((t) => (t === 'password' ? 'text' : 'password'))}
            className="p-2 mr-2 rounded-md hover:bg-gray-100 active:scale-95"
            aria-label="Toggle password visibility"
          >
            {internalType === 'password' ? (
              // eye closed
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7 1.027-2.13 2.702-3.985 4.805-5.29" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" />
              </svg>
            ) : (
              // eye open
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}

        {/* right custom icon */}
        {rightIcon && <div className="pr-3 pl-1">{rightIcon}</div>}
      </div>

      {/* helper / error text */}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : helper ? (
        <p id={`${id}-help`} className="mt-2 text-sm text-gray-500">
          {helper}
        </p>
      ) : null}
    </div>
  );
}

// ----------------------
// Usage examples (copy below into a parent component)
// ----------------------
/*
import React, { useState } from 'react';
import MinimalInput from './MinimalInput';

export function Demo() {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="max-w-md mx-auto space-y-6 p-6">
      <MinimalInput
        id="name"
        label="Full name"
        placeholder="Your full name"
        value={text}
        onChange={(e) => setText(e.target.value)}
        clearable
        helper="Tell us your full name"
      />

      <MinimalInput
        id="pwd"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        clearable
      />

      <button className="w-full rounded-xl py-2 bg-indigo-600 text-white font-medium shadow-sm hover:brightness-95">
        Submit
      </button>
    </div>
  );
}
*/
