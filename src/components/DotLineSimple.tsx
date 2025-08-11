import React from 'react';

interface DotLineSimpleProps {
  size?: number;
}

export const DotLineSimple: React.FC<DotLineSimpleProps> = ({ size = 4 }) => {
  // ランダムなドットラインデータを生成
  const generateRandomPairs = () => {
    const symbols = ['●', '■', '▲'];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1'];
    const availablePositions = [];
    
    // 利用可能な位置を生成
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        availablePositions.push({ x, y });
      }
    }
    
    // シャッフル
    for (let i = availablePositions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availablePositions[i], availablePositions[j]] = [availablePositions[j], availablePositions[i]];
    }
    
    const pairs = [];
    for (let i = 0; i < Math.min(3, symbols.length); i++) {
      if (availablePositions.length >= 2) {
        pairs.push({
          symbol: symbols[i],
          color: colors[i],
          positions: [
            availablePositions.pop(),
            availablePositions.pop()
          ]
        });
      }
    }
    return pairs;
  };
  
  const pairs = generateRandomPairs();

  const cellSize = 100 / size;
  
  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '8px'
    }}>
      <h4 style={{ 
        fontSize: '12px', 
        marginBottom: '8px',
        textAlign: 'center',
        margin: '0 0 8px 0'
      }}>
        同じマークを線でつなげよう
      </h4>
      
      <div style={{
        width: '90%',
        aspectRatio: '1',
        maxWidth: '120px',
        maxHeight: '120px',
        position: 'relative',
        border: '1px solid #333',
        backgroundColor: '#fafafa'
      }}>
        {/* グリッド線 */}
        {Array.from({ length: size + 1 }).map((_, i) => (
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
        
        {/* ドット */}
        {pairs.map((pair, pairIndex) => (
          <React.Fragment key={`pair-${pairIndex}`}>
            {pair.positions.map((pos, posIndex) => (
              <div
                key={`${pairIndex}-${posIndex}`}
                style={{
                  position: 'absolute',
                  left: `${(pos.x + 0.5) * cellSize}%`,
                  top: `${(pos.y + 0.5) * cellSize}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  border: `2px solid ${pair.color}`,
                  borderRadius: '50%',
                  fontSize: '14px',
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