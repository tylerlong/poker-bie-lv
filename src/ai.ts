import { message } from 'antd';
import waitFor from 'wait-for-async';
import _ from 'lodash';
import type { Managed, ManateEvent } from 'manate/models';

import type Game from './game';
import type Player from './player';

class AI {
  public game: Managed<Game>;
  public player: Player;
  private listener: Function;

  public constructor(game: Managed<Game>, player: Player) {
    this.game = game;
    this.player = player;
    this.listener = (event: ManateEvent) => {
      if (event.name !== 'set' || event.pathString !== 'playerIndex') {
        return;
      }
      if (game.findPlayer('AI') !== player) {
        return;
      }
      this.play();
    };
  }

  public start() {
    this.game.$e.on(this.listener);
  }

  public stop() {
    this.game.$e.off(this.listener);
  }

  public async play() {
    if (this.game.currentTurnPlayer !== this.player) {
      console.log('Not AI turn.');
      return;
    }
    message.info('AI正在思考');
    await waitFor({ interval: 1000 });
    const playableCards = this.player.hand.filter((card) => this.game.canPlayCard(card));
    if (playableCards.length === 0 && this.game.deck.cards.length > 0) {
      this.player.hand.push(this.game.deck.pop());
      while (!this.game.canPlayCard(_.last(this.player.hand)) && this.game.deck.cards.length > 0) {
        message.info('AI正在摸牌');
        await waitFor({ interval: 1000 });
        this.player.hand.push(this.game.deck.pop());
      }
      if (this.game.canPlayCard(_.last(this.player.hand))) {
        playableCards.push(_.last(this.player.hand));
      }
    }
    const card = _.sample(playableCards);
    if (card) {
      message.info('AI正在出牌');
      await waitFor({ interval: 1000 });
      this.game.playCard(card);
    } else {
      message.info('AI选择跳过');
      await waitFor({ interval: 1000 });
    }
    this.game.moveOn();
    message.info('该你啦!');
  }
}

export default AI;
