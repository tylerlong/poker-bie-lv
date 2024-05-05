import { auto } from 'manate/react';
import React, { useEffect } from 'react';
import { message } from 'antd';
import waitFor from 'wait-for-async';
import _ from 'lodash';

import type Game from './game';
import Card from './card';

const AI = (props: { game: Game }) => {
  const { game } = props;
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const aiPlayer = game.findPlayer('AI');
    if (game.currentTurnPlayer !== game.findPlayer('AI')) {
      return;
    }
    (async () => {
      messageApi.info('AI正在思考');
      await waitFor({ interval: 1000 });
      const playableCards = aiPlayer.hand.filter((card) => game.canPlayCard(card));
      if (playableCards.length === 0 && game.deck.cards.length > 0) {
        aiPlayer.hand.push(game.deck.pop());
        while (!game.canPlayCard(_.last(aiPlayer.hand)) && game.deck.cards.length > 0) {
          messageApi.info('AI正在摸牌');
          await waitFor({ interval: 1000 });
          aiPlayer.hand.push(game.deck.pop());
        }
        if (game.canPlayCard(_.last(aiPlayer.hand))) {
          playableCards.push(_.last(aiPlayer.hand));
        }
      }
      const card = _.sample(playableCards);
      if (card) {
        messageApi.info('AI正在出牌');
        await waitFor({ interval: 1000 });
        game.playCard(card);
      } else {
        messageApi.info('AI选择跳过');
        await waitFor({ interval: 1000 });
      }
      game.moveOn();
      messageApi.info('该你啦!');
    })();
  }, [game.currentTurnPlayer]);
  const render = () => {
    const aiPlayer = game.findPlayer('AI');
    return (
      <>
        {contextHolder}
        <div className="cards-queue">
          {aiPlayer.hand.map((card) => (
            <img className="card-img" key={`${card.suit}-${card.rank}`} src={Card.backImage()} width="96px" />
          ))}
        </div>
      </>
    );
  };
  return auto(render, props);
};

export default AI;
