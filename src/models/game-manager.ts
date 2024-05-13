import type { Managed, ManateEvent } from 'manate/models';

import type Game from './game';
import type Player from './player';

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
    // nobody can play
    if (this.game.deckEmpty && this.game.players.every((player) => !player.canPlay(this.game))) {
      this.game.over = true;
      const map = new Map<number, Player>();
      for (const player of this.game.players) {
        map.set(
          player.hand.reduce((acc, card) => acc + card.weight, 0),
          player,
        );
      }
      this.game.winner = map.size <= 1 ? undefined : map.get(Math.min(...map.keys()));
    }
  }
}

export default GameManager;
