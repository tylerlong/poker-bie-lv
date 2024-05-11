import { auto } from 'manate/react';
import React from 'react';

import type Game from '../models/game';
import Card from '../models/card';

const Opponent = (props: { game: Game }) => {
  const { game } = props;
  const render = () => {
    const aiPlayer = game.findPlayer('AI');
    return (
      <div className="cards-queue">
        {game.over
          ? aiPlayer.hand.map((card) => (
              <img className="card-img" key={`${card.suit}-${card.rank}`} src={card.image} width="128px" />
            ))
          : aiPlayer.hand.map((card) => (
              <img className="card-img" key={`${card.suit}-${card.rank}`} src={Card.backImage} width="128px" />
            ))}
      </div>
    );
  };
  return auto(render, props);
};

export default Opponent;
