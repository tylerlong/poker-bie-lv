import images from './assets/images/cards/**/*.svg';

class Card {
  public suit: '♣️' | '♦️' | '♥️' | '♠️' | '🃏';
  public rank: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  public get image(): string {
    return images[this.suit][this.rank];
  }
}

export default Card;
