import React from 'react';
import { ContentModule } from '../../types/content';

interface SettingsProps {
  modules: ContentModule[];
  selectedModules: string[];
  pageCount: number;
  onModuleToggle: (moduleId: string) => void;
  onPageCountChange: (count: number) => void;
  onGenerate: () => void;
  onPrint: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  modules,
  selectedModules,
  pageCount,
  onModuleToggle,
  onPageCountChange,
  onGenerate,
  onPrint
}) => {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      <h2 style={{ marginBottom: '20px' }}>設定</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>学習コンテンツ選択</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {modules.map(module => (
            <label
              key={module.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 12px',
                backgroundColor: selectedModules.includes(module.id) ? '#4CAF50' : 'white',
                color: selectedModules.includes(module.id) ? 'white' : 'black',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              <input
                type="checkbox"
                checked={selectedModules.includes(module.id)}
                onChange={() => onModuleToggle(module.id)}
                style={{ marginRight: '8px' }}
              />
              {module.displayName}
            </label>
          ))}
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          <span style={{ marginRight: '10px' }}>印刷枚数:</span>
          <input
            type="number"
            min="1"
            max="10"
            value={pageCount}
            onChange={(e) => onPageCountChange(Number(e.target.value))}
            style={{
              padding: '5px 10px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              width: '80px'
            }}
          />
          <span style={{ marginLeft: '10px' }}>枚</span>
        </label>
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={onGenerate}
          disabled={selectedModules.length === 0}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: selectedModules.length > 0 ? '#2196F3' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedModules.length > 0 ? 'pointer' : 'not-allowed'
          }}
        >
          プリント生成
        </button>
        
        <button
          onClick={onPrint}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          印刷
        </button>
      </div>
    </div>
  );
};