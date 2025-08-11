import { CalculationData, Problem } from './types';

export function generateCalculationData(
  difficulty: 'easy' | 'medium' | 'hard' = 'easy'
): CalculationData {
  const problemCount = 6;
  const problems: Problem[] = [];
  
  const maxNumber = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 50;
  const type = difficulty === 'hard' ? 'mixed' : 'addition';
  
  for (let i = 0; i < problemCount; i++) {
    const operator = type === 'mixed' && Math.random() > 0.5 ? '-' : '+';
    let first = Math.floor(Math.random() * maxNumber) + 1;
    let second = Math.floor(Math.random() * maxNumber) + 1;
    
    // 引き算の場合、答えが負にならないように調整
    if (operator === '-' && second > first) {
      [first, second] = [second, first];
    }
    
    problems.push({
      id: `problem-${i}`,
      first,
      second,
      operator
    });
  }
  
  return {
    problems,
    type: type as 'addition' | 'subtraction' | 'mixed'
  };
}