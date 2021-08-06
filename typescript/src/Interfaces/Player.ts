export enum PlayerSymbol {
  X = 'X',
  Y = 'Y',
}

export interface Player {
  playerSymbol: PlayerSymbol;
  score: number;
}
