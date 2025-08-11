import React from 'react';
import { ContentModule, ContentData, ModuleSettings } from '../../types/content';
import { generateCalculationData } from './generator';
import { CalculationContent } from './CalculationContent';

export const CalculationModule: ContentModule = {
  id: 'calculation',
  name: 'Calculation',
  displayName: '計算問題',
  
  generate(settings?: ModuleSettings): ContentData {
    const difficulty = settings?.difficulty || 'easy';
    const data = generateCalculationData(difficulty as 'easy' | 'medium' | 'hard');
    
    return {
      id: `calculation-${Date.now()}-${Math.random()}`,
      type: 'calculation',
      data
    };
  },
  
  render(content: ContentData): React.ReactElement {
    return React.createElement(CalculationContent, { data: content.data });
  },
  
  defaultSettings: {
    difficulty: 'easy'
  }
};