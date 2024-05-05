import { auto } from 'manate/react';
import React from 'react';
import _ from 'lodash';

import type Game from '../models/game';

const Desk = (props: { game: Game }) => {
  const { game } = props;
  const render = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>主牌</th>
            <th>已经出的牌</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img className="card-img" src={game.primaryCard.image} width="96px" />
            </td>
            <td>
              {_.reverse(_.takeRight(game.playedCards, 8)).map((card) => (
                <img className="card-img" key={`${card.suit}-${card.rank}`} src={card.image} width="96px" />
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };
  return auto(render, props);
};

export default Desk;
