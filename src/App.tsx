import React, { useState, useMemo } from 'react';
import { PrintLayout } from './components/Print/PrintLayout';
import { Settings } from './components/Settings/Settings';
import { ContentGenerator } from './services/generator/contentGenerator';
import { ContentData } from './types/content';
import { DotLineModule } from './modules/DotLine';
import { CalculationModule } from './modules/Calculation';
import './App.css';

const ITEMS_PER_PAGE = 12;

function App() {
  const [selectedModules, setSelectedModules] = useState<string[]>(['dotline', 'calculation']);
  const [pageCount, setPageCount] = useState(1);
  const [generatedPages, setGeneratedPages] = useState<ContentData[][]>([]);
  
  const modules = useMemo(() => [
    DotLineModule,
    CalculationModule
  ], []);
  
  const generator = useMemo(() => new ContentGenerator(modules), [modules]);
  
  const handleModuleToggle = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };
  
  const handleGenerate = () => {
    const pages = generator.generatePages(pageCount, ITEMS_PER_PAGE, selectedModules);
    setGeneratedPages(pages);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const renderContent = (content: ContentData) => {
    const module = generator.getModule(content.type);
    if (!module) {
      return <div>Unknown content type</div>;
    }
    return module.render(content);
  };
  
  return (
    <div className="app">
      <div className="no-print">
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
          子供向け学習プリント生成
        </h1>
        
        <Settings
          modules={modules}
          selectedModules={selectedModules}
          pageCount={pageCount}
          onModuleToggle={handleModuleToggle}
          onPageCountChange={setPageCount}
          onGenerate={handleGenerate}
          onPrint={handlePrint}
        />
      </div>
      
      {generatedPages.length > 0 && (
        <PrintLayout
          pages={generatedPages}
          renderContent={renderContent}
        />
      )}
    </div>
  );
}

export default App
