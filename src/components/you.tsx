import { auto } from 'manate/react';
import React from 'react';
import { Button, Space } from 'antd';

import type Game from '../models/game';
import CardComponent from './card';

const You = (props: { game: Game }) => {
  const { game } = props;
  const render = () => {
    const youPlayer = game.findPlayer('You');
    const isYourTurn = game.currentTurnPlayer === youPlayer;
    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        <div className="cards-queue">
          {youPlayer.hand.map((card) => (
            <CardComponent key={`${card.suit}-${card.rank}`} game={game} player={youPlayer} card={card} />
          ))}
        </div>
        {isYourTurn && (
          <Button
            block
            size="large"
            onClick={() => {
              youPlayer.hand.push(game.deck.pop());
            }}
            disabled={game.deck.cards.length === 0}
          >
            摸牌
          </Button>
        )}
        {isYourTurn && game.deck.cards.length === 0 && (
          <Button block size="large" onClick={() => game.moveOn()}>
            跳过
          </Button>
        )}
      </Space>
    );
  };
  return auto(render, props);
};

export default You;
