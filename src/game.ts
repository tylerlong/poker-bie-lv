import _ from 'lodash';

import type Card from './card';
import Deck from './deck';
import Player from './player';

class Game {
  public players: Player[] = [];
  public deck = new Deck();
  public playedCards: Card[] = [];
  public primaryCard: Card;

  private playerIndex = 0;

  public constructor() {
    this.primaryCard = _.sample(this.deck.cards);
    while (this.primaryCard.suit === '🃏') {
      this.primaryCard = _.sample(this.deck.cards);
    }
  }

  public addPlayer(name: string): void {
    const player = new Player(name);
    this.players.push(player);
  }

  public get currentTurnPlayer(): Player {
    return this.players[this.playerIndex];
  }

  // only one player not won
  public get gameOver() {
    return this.players.filter((player) => !player.won).length <= 1;
  }

  // move on to the next player
  public moveOn(): void {
    if (this.gameOver) {
      return;
    }
    this.playerIndex = (this.playerIndex + 1) % this.players.length;
    while (this.currentTurnPlayer.won) {
      this.playerIndex = (this.playerIndex + 1) % this.players.length;
    }
  }

  public findPlayer(name: string): Player | undefined {
    return this.players.find((player) => player.name === name);
  }

  public playCard(card: Card): void {
    this.currentTurnPlayer.play(card);
    this.playedCards.push(card);
  }

  public get currentCard() {
    for (let i = this.playedCards.length - 1; i >= 0; i--) {
      if (this.playedCards[i].suit !== '🃏') {
        return this.playedCards[i];
      }
    }
    return this.primaryCard;
  }

  public canPlayCard(card: Card): boolean {
    return (
      card.suit === this.currentCard.suit ||
      card.rank === this.currentCard.rank ||
      card.suit === '🃏' ||
      card.rank === this.primaryCard.rank
    );
  }

  public canChangeSuit(card: Card): boolean {
    return card.rank === this.primaryCard.rank || card.rank === this.currentCard.rank;
  }
}

export default Game;
