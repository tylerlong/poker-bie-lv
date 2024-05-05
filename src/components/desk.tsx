import { auto } from 'manate/react';
import React from 'react';
import _ from 'lodash';

import type Game from '../models/game';

const Desk = (props: { game: Game }) => {
  const { game } = props;
  const render = () => {
    return (
      <div>
        {_.reverse(_.takeRight(game.playedCards, 8)).map((card, index) => (
          <img className="card-img" key={`${card.suit}-${card.rank}`} src={card.image} width={`${96 - index * 8}px`} />
        ))}
      </div>
    );
  };
  return auto(render, props);
};

export default Desk;
