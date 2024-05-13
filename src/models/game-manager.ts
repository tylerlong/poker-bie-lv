import type { Managed, ManateEvent } from 'manate/models';

import type Game from './game';

class GameManager {
  public game: Managed<Game>;
  private listener: Function;

  public constructor(game: Managed<Game>) {
    this.game = game;
    this.listener = (event: ManateEvent) => {
      if (event.name !== 'set' || event.pathString !== 'playerIndex') {
        return;
      }
      this.update();
    };
  }

  public start() {
    this.game.$e.on(this.listener);
  }

  public stop() {
    this.game.$e.off(this.listener);
  }

  public update() {
    for (const player of this.game.players) {
      if (player.won) {
        this.game.over = true;
        this.game.winner = player;
        return;
      }
    }
    if (this.game.deckEmpty && this.game.players.every((player) => !player.canPlay(this.game))) {
      this.game.over = true;
      this.game.winner = undefined;
      // todo: compare the players' hands and find the winner
    }
  }
}

export default GameManager;
