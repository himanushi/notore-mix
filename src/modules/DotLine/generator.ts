import { DotLineData, DotPair, Position } from './types';

const SYMBOLS = ['●', '■', '▲', '★', '♦', '♥', '♣', '♠', '○', '□'];
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];

export function generateDotLineData(difficulty: 'easy' | 'medium' | 'hard' = 'easy'): DotLineData {
  const gridSize = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 5 : 6;
  const pairCount = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
  
  const positions = generateGridPositions(gridSize);
  const shuffledPositions = shuffle([...positions]);
  const pairs: DotPair[] = [];
  
  for (let i = 0; i < pairCount && i < SYMBOLS.length; i++) {
    const pos1 = shuffledPositions[i * 2];
    const pos2 = shuffledPositions[i * 2 + 1];
    
    if (pos1 && pos2) {
      pairs.push({
        id: `pair-${i}`,
        symbol: SYMBOLS[i],
        positions: [pos1, pos2],
        color: COLORS[i % COLORS.length]
      });
    }
  }
  
  return {
    width: gridSize,
    height: gridSize,
    pairs
  };
}

function generateGridPositions(size: number): Position[] {
  const positions: Position[] = [];
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      positions.push({ x, y });
    }
  }
  return positions;
}

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}