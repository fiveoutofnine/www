'use client';

import { useEffect, useState } from 'react';

import { IconButton, Select, toast } from '..';
import { codeBlockActionsVariants } from './styles';
import type { CodeBlockActionsProps } from './types';
import { Check, Copy } from 'lucide-react';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CodeBlockActions: React.FC<CodeBlockActionsProps> = ({ code, switcher, inHeader }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  const isTouchscreen = mounted ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) : false;

  const copyToClipboard = () => {
    if (!copied) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    navigator.clipboard.writeText(code);
    toast({ title: 'Copied to clipboard!', intent: 'success', hasCloseButton: true });
  };

  return (
    <div
      className={codeBlockActionsVariants({
        inHeader: Boolean(inHeader),
        showOnHover: !isTouchscreen,
      })}
    >
      {switcher && switcher.options.length > 1 ? (
        <Select
          className="backdrop-blur"
          size="sm"
          variant="outline"
          value={switcher.value}
          onChange={(e) => switcher.onChange(e.target.value)}
          aria-label="Select a language for the code block."
        >
          {switcher.options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </Select>
      ) : null}
      <IconButton
        className="backdrop-blur"
        size="sm"
        variant="outline"
        title="Copy to clipboard"
        onClick={copyToClipboard}
        type="button"
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <Check className="duration-300 animate-in fade-in zoom-in" />
        ) : (
          <Copy className="duration-300 animate-in fade-in" />
        )}
      </IconButton>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

CodeBlockActions.displayName = 'CodeBlockActions';

export default CodeBlockActions;
