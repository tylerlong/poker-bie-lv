import { auto } from 'manate/react';
import React from 'react';
import { Space } from 'antd-mobile';

import type Game from '../models/game';
import Card from '../models/card';

const Opponent = (props: { game: Game }) => {
  const { game } = props;
  const render = () => {
    const aiPlayer = game.findPlayer('AI');
    return (
      <Space wrap block justify="center">
        {aiPlayer.hand.map((card) => (
          <img key={`${card.suit}-${card.rank}`} src={game.over ? card.image : Card.backImage} className="card-img" />
        ))}
      </Space>
    );
  };
  return auto(render, props);
};

export default Opponent;
