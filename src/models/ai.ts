import { Toast } from 'antd-mobile';
import waitFor from 'wait-for-async';
import _ from 'lodash';
import type { Managed, ManateEvent } from 'manate/models';

import type Game from './game';
import type Player from './player';
import type { SuitType } from '../types/types';

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
      if (this.game.over || !this.player.isCurrent(game)) {
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
    if (this.game.over || !this.player.isCurrent(this.game)) {
      return;
    }
    Toast.show({ content: 'AI is thinking...' });
    await waitFor({ interval: 1000 });
    const playableCards = this.player.playableCards(this.game);
    if (playableCards.length === 0 && !this.game.deckEmpty) {
      this.player.hand.push(this.game.deck.pop());
      while (!this.game.canPlayCard(_.last(this.player.hand)) && !this.game.deckEmpty) {
        Toast.show({ content: 'AI is drawing...' });
        await waitFor({ interval: 1000 });
        this.player.hand.push(this.game.deck.pop());
      }
      if (this.game.canPlayCard(_.last(this.player.hand))) {
        playableCards.push(_.last(this.player.hand));
      }
    }
    const card = _.sample(playableCards);
    if (card) {
      Toast.show({ content: 'AI is playing...' });
      await waitFor({ interval: 1000 });
      const canChangeSuit = this.game.canChangeSuit(card);
      this.game.playCard(card);
      if (canChangeSuit) {
        const counter = _.countBy(
          this.player.hand.filter((card) => card.suit !== '🃏'),
          'suit',
        );
        const mostFrequentSuit = _.maxBy(_.keys(counter), (suit) => counter[suit]);
        if (mostFrequentSuit) {
          Toast.show({ content: 'AI is changing suit...' });
          this.game.changeSuit(mostFrequentSuit as SuitType);
        }
      }
    } else {
      Toast.show({ content: 'AI is passing...' });
      await waitFor({ interval: 1000 });
    }
    this.game.moveOn();
    Toast.show({ content: 'It is your turn.' });
  }
}

export default AI;
