import _ from 'lodash';

import type Card from './card';
import Deck from './deck';
import Player from './player';
import type { SuitType } from '../types/types';

class Game {
  public players: Player[] = [];
  public deck = new Deck();
  public playedCards: Card[] = [];
  public primaryCard: Card;
  public currentSuit: SuitType;
  public over = false;
  public winner: Player = undefined;

  private playerIndex = 0;

  public constructor() {
    this.primaryCard = _.sample(this.deck.cards);
    while (this.primaryCard.suit === '🃏') {
      this.primaryCard = _.sample(this.deck.cards);
    }
    this.currentSuit = this.primaryCard.suit;
  }

  public addPlayer(name: string): void {
    const player = new Player(name);
    this.players.push(player);
  }

  public get currentPlayer(): Player {
    return this.players[this.playerIndex];
  }

  // move on to the next player
  public moveOn(): void {
    if (this.over) {
      return;
    }
    this.playerIndex = (this.playerIndex + 1) % this.players.length;
    while (this.currentPlayer.won) {
      this.playerIndex = (this.playerIndex + 1) % this.players.length;
    }
  }

  public findPlayer(name: string): Player | undefined {
    return this.players.find((player) => player.name === name);
  }

  public playCard(card: Card): void {
    this.currentPlayer.play(card);
    this.playedCards.push(card);
  }

  public get currentRank() {
    for (let i = this.playedCards.length - 1; i >= 0; i--) {
      if (this.playedCards[i].suit !== '🃏') {
        return this.playedCards[i].rank;
      }
    }
    return this.primaryCard.rank;
  }

  public canPlayCard(card: Card): boolean {
    return (
      card.suit === this.currentSuit ||
      card.rank === this.currentRank ||
      card.suit === '🃏' ||
      card.rank === this.primaryCard.rank
    );
  }

  public canChangeSuit(card: Card): boolean {
    return card.suit !== '🃏' && (card.rank === this.primaryCard.rank || card.rank === this.currentRank);
  }

  public restart(): void {
    this.deck = new Deck();
    this.playedCards = [];
    this.primaryCard = _.sample(this.deck.cards);
    while (this.primaryCard.suit === '🃏') {
      this.primaryCard = _.sample(this.deck.cards);
    }
    this.currentSuit = this.primaryCard.suit;
    this.players.forEach((player) => {
      player.hand = [];
      for (let i = 0; i < 5; i++) {
        player.hand.push(this.deck.pop());
      }
    });
    this.playerIndex = 0;
    this.over = false;
    this.winner = undefined;
  }

  public changeSuit(suit: SuitType): void {
    this.currentSuit = suit;
  }

  public get deckEmpty() {
    return this.deck.cards.length === 0;
  }
}

export default Game;
