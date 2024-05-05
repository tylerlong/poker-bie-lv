import { auto } from 'manate/react';
import React from 'react';

import type Game from './game';
import Card from './card';

const AI = (props: { game: Game }) => {
  const { game } = props;
  const render = () => {
    const aiPlayer = game.findPlayer('AI');
    return (
      <div className="cards-queue">
        {aiPlayer.hand.map((card) => (
          <img className="card-img" key={`${card.suit}-${card.rank}`} src={Card.backImage()} width="96px" />
        ))}
      </div>
    );
  };
  return auto(render, props);
};

export default AI;
