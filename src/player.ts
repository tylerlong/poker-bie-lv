import hyperid from 'hyperid';

import type Game from './game';

const uuid = hyperid();

class Player {
  public name: string;
  public won = false;
  public rank = -1;
  public uuid: string;

  public constructor(name: string) {
    this.name = name;
    this.uuid = uuid();
  }

  public win(game: Game): void {
    this.won = true;
    this.rank = game.players.filter((player) => player.won).length;
  }

  public isCurrent(game: Game): boolean {
    return game.currentPlayer.uuid === this.uuid;
  }
}

export default Player;
