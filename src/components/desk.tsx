import { auto } from 'manate/react';
import React from 'react';
import _ from 'lodash';
import { Space, Card as CardComponent } from 'antd-mobile';

import type Game from '../models/game';
import Card from '../models/card';

const Desk = (props: { game: Game }) => {
  const { game } = props;
  const render = () => {
    return (
      <Space>
        <CardComponent title="Primary Card">
          <img className="card-img highlighted-gold" src={game.primaryCard.image} width="128px" />
        </CardComponent>
        <CardComponent title="Current Suit">
          <img className="card-img highlighted" src={Card.suiteImage(game.currentSuit)} width="128px" />
        </CardComponent>
        <CardComponent title="Deck" extra={`${game.deck.cards.length} Cards`}>
          <img className="card-img" src={Card.backImage} width="128px" />
        </CardComponent>
        <CardComponent title="Played Cards">
          {game.playedCards.length === 0 && <img className="card-img" src={Card.blankImage} width="128px" />}
          <div className="cards-queue">
            {_.reverse(_.takeRight(game.playedCards, 6)).map((card, index) => (
              <img
                className={`card-img ${index === 0 ? 'highlighted' : ''}`}
                key={`${card.suit}-${card.rank}`}
                src={card.image}
                width="128px"
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
