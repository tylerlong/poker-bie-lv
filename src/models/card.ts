import cardImages from '../assets/images/cards/**/*.svg';
import backImage from '../assets/images/cards/back.svg';
import blankImage from '../assets/images/cards/blank.svg';
import type { RankType, SuitType } from '../types/types';

class Card {
  public static backImage(): string {
    return backImage;
  }

  public static blankImage(): string {
    return blankImage;
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
}

export default Card;
