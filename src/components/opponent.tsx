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
      <Space wrap>
        {game.over
          ? aiPlayer.hand.map((card) => <img key={`${card.suit}-${card.rank}`} src={card.image} width="64px" />)
          : aiPlayer.hand.map((card) => <img key={`${card.suit}-${card.rank}`} src={Card.backImage} width="64px" />)}
      </Space>
    );
  };
  return auto(render, props);
};

export default Opponent;
