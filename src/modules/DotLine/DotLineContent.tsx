import React from 'react';
import { DotLineData } from './types';

interface DotLineContentProps {
  data: DotLineData;
}

export const DotLineContent: React.FC<DotLineContentProps> = ({ data }) => {
  const cellSize = 100 / data.width;
  
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h3 style={{ 
        fontSize: '14px', 
        marginBottom: '10px',
        textAlign: 'center'
      }}>
        同じマークを線でつなげよう
      </h3>
      
      <div style={{
        width: '90%',
        aspectRatio: '1',
        position: 'relative',
        border: '2px solid #333',
        backgroundColor: '#fafafa'
      }}>
        {/* グリッド線 */}
        {Array.from({ length: data.width + 1 }).map((_, i) => (
          <React.Fragment key={`grid-${i}`}>
            <div
              style={{
                position: 'absolute',
                left: `${i * cellSize}%`,
                top: 0,
                bottom: 0,
                width: '1px',
                backgroundColor: '#e0e0e0'
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: `${i * cellSize}%`,
                left: 0,
                right: 0,
                height: '1px',
                backgroundColor: '#e0e0e0'
              }}
            />
          </React.Fragment>
        ))}
        
        {/* ドットペア */}
        {data.pairs.map(pair => (
          <React.Fragment key={pair.id}>
            {pair.positions.map((pos, index) => (
              <div
                key={`${pair.id}-${index}`}
                style={{
                  position: 'absolute',
                  left: `${(pos.x + 0.5) * cellSize}%`,
                  top: `${(pos.y + 0.5) * cellSize}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  border: `2px solid ${pair.color}`,
                  borderRadius: '50%',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: pair.color
                }}
              >
                {pair.symbol}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};