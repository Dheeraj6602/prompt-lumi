
export enum PromptCategory {
  CODING = 'CODING',
  EMAIL_WRITING = 'EMAIL_WRITING',
  ESSAY = 'ESSAY',
  IMAGE_GENERATION = 'IMAGE_GENERATION',
  MARKETING_COPY = 'MARKETING_COPY',
  GENERAL = 'GENERAL',
}

export interface CategoryOption {
  id: PromptCategory;
  name: string;
  description: string;
}

export interface PromptHistoryItem {
  id: string;
  originalPrompt: string;
  enhancedPrompt: string;
  category: PromptCategory;
  timestamp: number;
}
    