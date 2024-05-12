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
      <>
        <Space>
          <CardComponent title="Primary Card">
            <img className="highlighted-gold" src={game.primaryCard.image} />
          </CardComponent>
          <CardComponent title="Current Suit">
            <img className="highlighted" src={Card.suiteImage(game.currentSuit)} />
          </CardComponent>
          <CardComponent title="Deck" extra={`${game.deck.cards.length} Cards`}>
            <img src={Card.backImage} className="card-img" />
          </CardComponent>
        </Space>
        <CardComponent title="Played Cards">
          {game.playedCards.length === 0 && <img src={Card.blankImage} className="card-img" />}
          <Space wrap>
            {_.reverse(_.takeRight(game.playedCards, 5)).map((card, index) => (
              <img
                className={`card-img ${index === 0 ? 'highlighted' : ''}`}
                key={`${card.suit}-${card.rank}`}
                src={card.image}
              />
            ))}
          </Space>
        </CardComponent>
      </>
    );
  };
  return auto(render, props);
};

export default Desk;
