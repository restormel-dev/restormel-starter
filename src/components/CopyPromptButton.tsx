'use client';

import { useState, useCallback } from 'react';

interface CopyPromptButtonProps {
  text: string;
  className?: string;
}

export function CopyPromptButton({ text, className = '' }: CopyPromptButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={
        className ||
        'rounded border border-zinc-300 bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:focus:ring-zinc-500'
      }
      aria-label={copied ? 'Copied to clipboard' : 'Copy prompt to clipboard'}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
