import React from 'react';
import { ContentModule, ContentData, ModuleSettings } from '../../types/content';
import { generateDotLineData } from './generator';
import { DotLineContent } from './DotLineContent';

export const DotLineModule: ContentModule = {
  id: 'dotline',
  name: 'DotLine',
  displayName: 'ドットライン',
  
  generate(settings?: ModuleSettings): ContentData {
    const difficulty = settings?.difficulty || 'easy';
    const data = generateDotLineData(difficulty as 'easy' | 'medium' | 'hard');
    
    return {
      id: `dotline-${Date.now()}-${Math.random()}`,
      type: 'dotline',
      data
    };
  },
  
  render(content: ContentData): React.ReactElement {
    return React.createElement(DotLineContent, { data: content.data });
  },
  
  defaultSettings: {
    difficulty: 'easy'
  }
};