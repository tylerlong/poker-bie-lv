import { auto } from 'manate/react';
import React from 'react';
import _ from 'lodash';
import { Card as CardComponent, Space } from 'antd';

import type Game from '../models/game';
import Card from '../models/card';

const Desk = (props: { game: Game }) => {
  const { game } = props;
  const render = () => {
    return (
      <Space>
        <CardComponent title="主牌">
          <img className="card-img" src={game.primaryCard.image} width="96px" />
        </CardComponent>
        <CardComponent title="未发牌" extra={`${game.deck.cards.length} 张`}>
          <img className="card-img" src={Card.backImage()} width="96px" />
        </CardComponent>
        <CardComponent title="已出牌">
          <div className="cards-queue">
            {_.reverse(_.takeRight(game.playedCards, 6)).map((card) => (
              <img className="card-img" key={`${card.suit}-${card.rank}`} src={card.image} width="96px" />
            ))}
          </div>
        </CardComponent>
      </Space>
    );
  };
  return auto(render, props);
};

export default Desk;