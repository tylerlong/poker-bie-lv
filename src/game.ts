import Deck from './deck';
import Player from './player';

class Game {
  public players: Player[] = [];
  public deck = new Deck();

  private playerIndex = 0;

  public addPlayer(name: string): void {
    const player = new Player(name);
    this.players.push(player);
  }

  public get currentPlayer(): Player {
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
    while (this.currentPlayer.won) {
      this.playerIndex = (this.playerIndex + 1) % this.players.length;
    }
  }
}

export default Game;
