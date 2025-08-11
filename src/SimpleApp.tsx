import React, { useState } from 'react';
import { DotLineSimple } from './components/DotLineSimple';
import './styles/print-simple.css';

function SimpleApp() {
  const [selectedModules, setSelectedModules] = useState<string[]>(['dotline']);
  const [pageCount, setPageCount] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = () => {
    console.log('プリント生成', { selectedModules, pageCount });
    setShowPreview(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="no-print" style={{ 
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px'
      }}>
        {/* ヘッダー */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1>子供向け学習プリント生成</h1>
        </div>

        {/* 設定エリア */}
        <div style={{
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
        <h2 style={{ marginBottom: '20px', fontSize: '18px' }}>設定</h2>
        
        {/* 学習コンテンツ選択 */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>学習コンテンツ選択</h3>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
            width: 'fit-content'
          }}>
            <input
              type="checkbox"
              checked={selectedModules.includes('dotline')}
              onChange={() => {}} // 後で実装
              style={{ marginRight: '8px' }}
            />
            ドットライン
          </label>
        </div>

        {/* 印刷枚数 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block' }}>
            <span style={{ marginRight: '10px' }}>印刷枚数:</span>
            <input
              type="number"
              min="1"
              max="10"
              value={pageCount}
              onChange={(e) => setPageCount(Number(e.target.value))}
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

          {/* ボタン */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleGenerate}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              プリント生成
            </button>
            
            {showPreview && (
              <button
                onClick={handlePrint}
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
            )}
          </div>
        </div>
      </div>

      {/* プレビューエリア */}
      {!showPreview && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          border: '2px dashed #ddd'
        }}>
          <p>プリントのプレビューがここに表示されます</p>
        </div>
      )}
      
      {/* A4印刷プレビュー */}
      {showPreview && (
        <div className="print-preview">
          <div className="print-page">
            <div className="print-grid">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="print-item">
                  <DotLineSimple size={3} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SimpleApp;