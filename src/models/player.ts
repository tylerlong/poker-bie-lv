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
    return game.currentTurnPlayer.uuid === this.uuid;
  }

  public play(card: Card) {
    this.hand = this.hand.filter((c) => c !== card);
  }
}

export default Player;
