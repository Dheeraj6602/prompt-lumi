import React from 'react';
import { PromptHistoryItem } from '../types';
import { getCategoryName } from '../constants';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { TrashIcon, EyeIcon } from './ui/Icons';

interface HistoryPanelProps {
  history: PromptHistoryItem[];
  onLoadItem: (item: PromptHistoryItem) => void;
  onDeleteItem: (id: string) => void;
  onClearHistory: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onLoadItem, onDeleteItem, onClearHistory }) => {
  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b border-borderlight dark:border-borderdark flex justify-between items-center">
        <h2 className="text-xl font-semibold text-textlight dark:text-textdark">History</h2>
        {history.length > 0 && (
          <Button onClick={onClearHistory} variant="danger" size="sm">
            Clear All
          </Button>
        )}
      </div>
      {history.length === 0 ? (
        <div className="p-6 text-center text-slate-500 dark:text-slate-400 flex-grow flex items-center justify-center">
          <p>No prompt history yet. Enhanced prompts will appear here.</p>
        </div>
      ) : (
        <div className="overflow-y-auto p-2 space-y-2 flex-grow max-h-[calc(100vh-300px)] md:max-h-[calc(100vh-250px)]"> {/* Adjust max-h for responsiveness */}
          {history.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-contentbglight dark:bg-contentbgdark rounded-md shadow-sm hover:shadow-lg dark:hover:bg-neutral-750 transition-all duration-200 ease-in-out animate-fadeIn"
            >
              <p className="text-sm font-medium truncate text-slate-700 dark:text-slate-200" title={item.originalPrompt}>
                {item.originalPrompt}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {getCategoryName(item.category)} - {new Date(item.timestamp).toLocaleDateString()}
              </p>
              <div className="mt-2 flex space-x-2">
                <Button onClick={() => onLoadItem(item)} variant="outline" size="xs" className="flex-1">
                   <EyeIcon className="w-3.5 h-3.5 mr-1" /> Load
                </Button>
                <Button onClick={() => onDeleteItem(item.id)} variant="danger_outline" size="xs" className="flex-1">
                  <TrashIcon className="w-3.5 h-3.5 mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};