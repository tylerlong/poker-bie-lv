import cardImages from '../assets/images/cards/**/*.svg';
import backImage from '../assets/images/cards/back.svg';
import blankImage from '../assets/images/cards/blank.svg';
import type { RankType, SuitType } from '../types/types';

class Card {
  public static get backImage(): string {
    return backImage;
  }

  public static get blankImage(): string {
    return blankImage;
  }

  public static suiteImage(suit: SuitType): string {
    return cardImages[suit][0];
  }

  public suit: SuitType;
  public rank: RankType;

  public constructor(suit: SuitType, rank: RankType) {
    this.suit = suit;
    this.rank = rank;
  }

  public get image(): string {
    return cardImages[this.suit][this.rank];
  }

  public get weight(): number {
    if (this.suit === '🃏') {
      return 0;
    }
    if (this.rank < 11) {
      return this.rank;
    }
    return 0.5; // face cards
  }
}

export default Card;
