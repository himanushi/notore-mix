export interface DotLineData {
  width: number;
  height: number;
  pairs: DotPair[];
}

export interface DotPair {
  id: string;
  symbol: string;
  positions: [Position, Position];
  color?: string;
}

export interface Position {
  x: number;
  y: number;
}