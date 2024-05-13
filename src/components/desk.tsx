import { auto } from 'manate/react';
import React from 'react';
import _ from 'lodash';
import { Space, Divider } from 'antd-mobile';

import type Game from '../models/game';
import Card from '../models/card';

const Desk = (props: { game: Game }) => {
  const { game } = props;
  const render = () => {
    return (
      <>
        <Space block justify="center">
          <div>
            <Divider>Primary Card</Divider>
            <img className="card-img" src={game.primaryCard.image} style={{ display: 'block', margin: '0 auto' }} />
          </div>
          <>
            <Divider>Current Suit</Divider>
            <img
              className="card-img"
              src={Card.suiteImage(game.currentSuit)}
              style={{ display: 'block', margin: '0 auto' }}
            />
          </>
          <>
            <Divider>{`Deck(${game.deck.cards.length} cards)`}</Divider>
            <img
              src={game.deckEmpty ? Card.blankImage : Card.backImage}
              className="card-img"
              style={{ display: 'block', margin: '0 auto' }}
            />
          </>
        </Space>
        <Divider>Played Cards</Divider>
        {game.playedCards.length === 0 && <img src={Card.blankImage} className="card-img" />}
        <Space wrap block justify="center">
          {_.takeRight(game.playedCards, 5).map((card) => (
            <img
              className={`card-img ${card === _.last(game.playedCards) ? 'highlighted-gold' : ''}`}
              key={`${card.suit}-${card.rank}`}
              src={card.image}
            />
          ))}
        </Space>
      </>
    );
  };
  return auto(render, props);
};

export default Desk;
