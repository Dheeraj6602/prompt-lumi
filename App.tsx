
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInputArea } from './components/PromptInputArea';
import { PromptOutputDisplay } from './components/PromptOutputDisplay';
import { HistoryPanel } from './components/HistoryPanel';
import { enhancePromptWithGemini } from './services/geminiService';
import { PromptCategory, PromptHistoryItem } from './types';
import { useDarkMode } from './hooks/useDarkMode';
import { useLocalStorage } from './hooks/useLocalStorage';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { Alert } from './components/ui/Alert';
import { CATEGORIES } from './constants';

const App: React.FC = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [originalPrompt, setOriginalPrompt] = useState<string>('');
  const [enhancedPrompt, setEnhancedPrompt] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory>(CATEGORIES[0].id);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [promptHistory, setPromptHistory] = useLocalStorage<PromptHistoryItem[]>('promptHistory', []);

  const handleEnhancePrompt = useCallback(async () => {
    if (!originalPrompt.trim()) {
      setError('Please enter a prompt idea.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEnhancedPrompt('');

    try {
      const result = await enhancePromptWithGemini(originalPrompt, selectedCategory);
      setEnhancedPrompt(result);
      const newHistoryItem: PromptHistoryItem = {
        id: Date.now().toString(),
        originalPrompt,
        enhancedPrompt: result,
        category: selectedCategory,
        timestamp: Date.now(),
      };
      setPromptHistory(prevHistory => [newHistoryItem, ...prevHistory.slice(0, 19)]); // Keep last 20 items
    } catch (err) {
      console.error('Error enhancing prompt:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [originalPrompt, selectedCategory, setPromptHistory]);

  const handleLoadFromHistory = useCallback((item: PromptHistoryItem) => {
    setOriginalPrompt(item.originalPrompt);
    setEnhancedPrompt(item.enhancedPrompt);
    setSelectedCategory(item.category);
    setError(null); // Clear any existing error when loading from history
  }, []);

  const handleDeleteHistoryItem = useCallback((id: string) => {
    setPromptHistory(prevHistory => prevHistory.filter(item => item.id !== id));
  }, [setPromptHistory]);

  const handleClearHistory = useCallback(() => {
    setPromptHistory([]);
  }, [setPromptHistory]);

  return (
    <div className="min-h-screen flex flex-col bg-bglight dark:bg-bgdark text-textlight dark:text-textdark font-sans transition-colors duration-300 ease-in-out">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {error && (
          <Alert type="error" message={error} onClose={() => setError(null)} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PromptInputArea
              originalPrompt={originalPrompt}
              setOriginalPrompt={setOriginalPrompt}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onEnhance={handleEnhancePrompt}
              isLoading={isLoading}
            />
            {isLoading && (
              <div className="flex justify-center items-center p-6 bg-surfacelight dark:bg-surfacedark rounded-lg shadow-custom-lg dark:shadow-custom-lg-dark animate-fadeInDown transition-colors duration-300 ease-in-out">
                <LoadingSpinner />
                <p className="ml-3 text-lg">Enhancing your prompt...</p>
              </div>
            )}
            {((enhancedPrompt || (!isLoading && !error && originalPrompt))) && !isLoading && (
              <div className="animate-fadeInDown">
                <PromptOutputDisplay
                  originalPrompt={originalPrompt}
                  enhancedPrompt={enhancedPrompt}
                />
              </div>
            )}
          </div>
          
          <HistoryPanel
            history={promptHistory}
            onLoadItem={handleLoadFromHistory}
            onDeleteItem={handleDeleteHistoryItem}
            onClearHistory={handleClearHistory}
          />
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-slate-500 dark:text-slate-400 border-t border-borderlight dark:border-borderdark transition-colors duration-300 ease-in-out">
        Prompt Lumi &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
