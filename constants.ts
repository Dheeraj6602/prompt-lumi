
import { PromptCategory, CategoryOption } from './types';

export const CATEGORIES: CategoryOption[] = [
  { id: PromptCategory.GENERAL, name: 'General Purpose', description: 'For any kind of prompt.' },
  { id: PromptCategory.CODING, name: 'Coding Assistance', description: 'Generate code snippets, debug, or explain concepts.' },
  { id: PromptCategory.EMAIL_WRITING, name: 'Email Writing', description: 'Craft professional or casual emails.' },
  { id: PromptCategory.ESSAY, name: 'Essay Writing', description: 'Structure outlines, generate content for essays.' },
  { id: PromptCategory.IMAGE_GENERATION, name: 'Image Generation', description: 'Create detailed prompts for image AI models.' },
  { id: PromptCategory.MARKETING_COPY, name: 'Marketing Copy', description: 'Develop engaging ad copy, product descriptions, etc.' },
];

export const getCategoryName = (categoryId: PromptCategory): string => {
  const category = CATEGORIES.find(cat => cat.id === categoryId);
  return category ? category.name : 'Unknown Category';
};
    