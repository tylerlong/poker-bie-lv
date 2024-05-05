import React from 'react';
import { Space, Typography } from 'antd';
import { auto } from 'manate/react';
import _ from 'lodash';

import type Game from './game';
import You from './you';
import AI from './ai';

const { Title } = Typography;

const App = (props: { game: Game }) => {
  const { game } = props;
  const render = () => {
    return (
      <>
        <Title>憋驴</Title>
        <Space direction="vertical">
          <Title level={2}>主牌</Title>
          <img src={game.primaryCard.image} width="96px" />
          <Title level={2}>AI</Title>
          <AI game={game} />
          <Title level={2}>牌桌</Title>
          <div>
            {_.reverse(_.takeRight(game.playedCards, 8)).map((card, index) => (
              <img
                className="card-img"
                key={`${card.suit}-${card.rank}`}
                src={card.image}
                width={`${96 - index * 8}px`}
              />
            ))}
          </div>
          <Title level={2}>你</Title>
          <You game={game} />
        </Space>
      </>
    );
  };
  return auto(render, props);
};

export default App;
