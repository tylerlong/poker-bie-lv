import _ from 'lodash';

import Card from './card';
import type { RankType, SuitType } from './types';

class Deck {
  public cards: Card[];

  public constructor() {
    this.cards = [];
    for (const suit of ['♣️', '♦️', '♥️', '♠️']) {
      for (let rank = 1; rank <= 13; rank++) {
        this.cards.push(new Card(suit as SuitType, rank as RankType));
      }
    }
    this.cards.push(new Card('🃏', 1));
    this.cards.push(new Card('🃏', 2));
    this.shuffle();
  }

  public shuffle(): void {
    this.cards = _.shuffle(this.cards);
  }
}

export default Deck;
