import images from './assets/images/cards/**/*.svg';
import type { RankType, SuitType } from './types';

class Card {
  public suit: SuitType;
  public rank: RankType;

  public constructor(suit: SuitType, rank: RankType) {
    this.suit = suit;
    this.rank = rank;
  }

  public get image(): string {
    return images[this.suit][this.rank];
  }
}

export default Card;
