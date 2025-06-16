import React, { useState, useCallback } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { ClipboardCopyIcon, CheckCircleIcon } from './ui/Icons';

interface PromptOutputDisplayProps {
  originalPrompt: string;
  enhancedPrompt: string;
}

export const PromptOutputDisplay: React.FC<PromptOutputDisplayProps> = ({ originalPrompt, enhancedPrompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (enhancedPrompt) {
      navigator.clipboard.writeText(enhancedPrompt)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => console.error('Failed to copy text: ', err));
    }
  }, [enhancedPrompt]);

  if (!originalPrompt && !enhancedPrompt) {
    return null; // Don't render if there's nothing to show yet
  }
  
  // Only render the component if there's an original prompt or an enhanced one.
  // This prevents an empty card from showing before any interaction.
  if (!originalPrompt && !enhancedPrompt) {
    // Or, more specifically, if we want to show it once an original prompt is entered, even if not yet enhanced:
    // if (!originalPrompt) return null; 
    // This depends on desired UX, for now, let's keep it as is.
  }


  return (
    <Card className="animate-fadeInDown">
      <div className="p-6 space-y-6">
        {originalPrompt && (
          <div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">Original Idea</h3>
            <div className="p-3 bg-contentbglight dark:bg-contentbgdark rounded-md whitespace-pre-wrap text-sm">
              {originalPrompt}
            </div>
          </div>
        )}

        {enhancedPrompt && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Enhanced Prompt</h3>
              <Button
                onClick={handleCopy}
                variant="secondary"
                size="sm"
                className="flex items-center"
              >
                {copied ? (
                  <>
                    <CheckCircleIcon className="w-4 h-4 mr-1.5 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <ClipboardCopyIcon className="w-4 h-4 mr-1.5" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <div className="p-4 bg-primary-light/10 dark:bg-primary-dark/20 border border-primary-light dark:border-primary-dark rounded-md whitespace-pre-wrap text-sm leading-relaxed">
              {enhancedPrompt}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};