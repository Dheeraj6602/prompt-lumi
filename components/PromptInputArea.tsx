
import React from 'react';
import { PromptCategory, CategoryOption } from '../types';
import { CATEGORIES } from '../constants';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { TextArea } from './ui/TextArea';
import { Card } from './ui/Card';

interface PromptInputAreaProps {
  originalPrompt: string;
  setOriginalPrompt: (value: string) => void;
  selectedCategory: PromptCategory;
  setSelectedCategory: (value: PromptCategory) => void;
  onEnhance: () => void;
  isLoading: boolean;
}

export const PromptInputArea: React.FC<PromptInputAreaProps> = ({
  originalPrompt,
  setOriginalPrompt,
  selectedCategory,
  setSelectedCategory,
  onEnhance,
  isLoading,
}) => {
  const categoryOptions = CATEGORIES.map(cat => ({ value: cat.id, label: cat.name }));

  return (
    <Card>
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-textlight dark:text-textdark">Craft Your Prompt</h2>
        
        <div>
          <label htmlFor="prompt-idea" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Your Basic Idea
          </label>
          <TextArea
            id="prompt-idea"
            value={originalPrompt}
            onChange={(e) => setOriginalPrompt(e.target.value)}
            placeholder="e.g., A blog post about sustainable travel..."
            rows={5}
            disabled={isLoading}
          />
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Describe what you want the AI to generate.</p>
        </div>

        <div>
          <label htmlFor="prompt-category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Select Category
          </label>
          <Select
            id="prompt-category"
            options={categoryOptions}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as PromptCategory)}
            disabled={isLoading}
          />
           <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {CATEGORIES.find(cat => cat.id === selectedCategory)?.description}
          </p>
        </div>

        <Button onClick={onEnhance} disabled={isLoading || !originalPrompt.trim()} className="w-full">
          {isLoading ? 'Enhancing...' : 'Enhance Prompt'}
        </Button>
      </div>
    </Card>
  );
};
    