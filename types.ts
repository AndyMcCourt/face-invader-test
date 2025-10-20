
export interface Position {
  x: number;
  y: number;
}

export interface GameObject extends Position {
  id: string;
  width: number;
  height: number;
}

export enum GameStatus {
  Start,
  Playing,
  GameOver,
}
