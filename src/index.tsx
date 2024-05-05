import React from 'react';
import { createRoot } from 'react-dom/client';
import { manage } from 'manate';

import App from './app';
import Game from './game';
import type { ManateEvent } from 'manate/models';
import { message } from 'antd';
import waitFor from 'wait-for-async';
import _ from 'lodash';

const game = manage(new Game());
game.addPlayer('You');
game.addPlayer('AI');
for (let i = 0; i < 5; i++) {
  game.players.forEach((player) => player.hand.push(game.deck.pop()));
}

// begin of AI
game.$e.on((event: ManateEvent) => {
  if (event.name !== 'set' || event.pathString !== 'playerIndex') {
    return;
  }
  if (game.findPlayer('AI') !== game.currentTurnPlayer) {
    return;
  }
  const aiPlayer = game.findPlayer('AI');
  if (game.currentTurnPlayer !== game.findPlayer('AI')) {
    return;
  }
  (async () => {
    message.info('AI正在思考');
    await waitFor({ interval: 1000 });
    const playableCards = aiPlayer.hand.filter((card) => game.canPlayCard(card));
    if (playableCards.length === 0 && game.deck.cards.length > 0) {
      aiPlayer.hand.push(game.deck.pop());
      while (!game.canPlayCard(_.last(aiPlayer.hand)) && game.deck.cards.length > 0) {
        message.info('AI正在摸牌');
        await waitFor({ interval: 1000 });
        aiPlayer.hand.push(game.deck.pop());
      }
      if (game.canPlayCard(_.last(aiPlayer.hand))) {
        playableCards.push(_.last(aiPlayer.hand));
      }
    }
    const card = _.sample(playableCards);
    if (card) {
      message.info('AI正在出牌');
      await waitFor({ interval: 1000 });
      game.playCard(card);
    } else {
      message.info('AI选择跳过');
      await waitFor({ interval: 1000 });
    }
    game.moveOn();
    message.info('该你啦!');
  })();
});
// end of AI

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App game={game} />);
