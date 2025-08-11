export interface CalculationData {
  problems: Problem[];
  type: 'addition' | 'subtraction' | 'mixed';
}

export interface Problem {
  id: string;
  first: number;
  second: number;
  operator: '+' | '-';
  answer?: number;
}