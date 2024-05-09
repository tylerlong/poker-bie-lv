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
        <CardComponent title="Primary Card">
          <img className="card-img highlighted-gold" src={game.primaryCard.image} width="96px" />
        </CardComponent>
        <CardComponent title="Current Suit">
          <img className="card-img highlighted" src={Card.suiteImage(game.currentSuit)} width="96px" />
        </CardComponent>
        <CardComponent title="Deck" extra={`${game.deck.cards.length} Cards`}>
          <img className="card-img" src={Card.backImage} width="96px" />
        </CardComponent>
        <CardComponent title="Played Cards">
          {game.playedCards.length === 0 && <img className="card-img" src={Card.blankImage} width="96px" />}
          <div className="cards-queue">
            {_.reverse(_.takeRight(game.playedCards, 6)).map((card, index) => (
              <img
                className={`card-img ${index === 0 ? 'highlighted' : ''}`}
                key={`${card.suit}-${card.rank}`}
                src={card.image}
                width="96px"
              />
            ))}
          </div>
        </CardComponent>
      </Space>
    );
  };
  return auto(render, props);
};

export default Desk;
