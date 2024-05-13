import hyperid from 'hyperid';

import type Game from './game';
import type Card from './card';

const uuid = hyperid();

class Player {
  public name: string;
  public uuid: string;
  public hand: Card[] = [];

  public constructor(name: string) {
    this.name = name;
    this.uuid = uuid();
  }

  public get won(): boolean {
    return this.hand.length === 0;
  }

  public isCurrent(game: Game): boolean {
    return game.currentPlayer.uuid === this.uuid;
  }

  public playableCards(game: Game): Card[] {
    return this.hand.filter((card) => game.canPlayCard(card));
  }

  public canPlay(game: Game): boolean {
    return this.playableCards(game).length > 0;
  }

  public play(card: Card) {
    this.hand = this.hand.filter((c) => c !== card);
  }
}

export default Player;
