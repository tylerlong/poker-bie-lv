import { auto } from 'manate/react';
import React from 'react';
import { Button, NoticeBar, Result, Space } from 'antd-mobile';

import type Game from '../models/game';
import CardComponent from './card';

const You = (props: { game: Game }) => {
  const { game } = props;
  const render = () => {
    const youPlayer = game.findPlayer('You');
    const isYourTurn = game.currentTurnPlayer === youPlayer;
    const actions = [];
    if (game.over || game.draw) {
      actions.push(<NoticeBar content="Game Over!" color="info" />);
      if (game.draw) {
        actions.push(<Result status="info" title="Draw!" />);
      } else if (game.findPlayer('You').won) {
        actions.push(<Result status="success" title="You Win!" />);
      } else {
        actions.push(<Result status="error" title="You Lose!" />);
      }
      actions.push(
        <Button color="success" key="button-restart" block size="large" onClick={() => game.restart()}>
          Restart
        </Button>,
      );
    } else if (isYourTurn) {
      actions.push(
        <Button
          color="primary"
          key="button-draw-card"
          block
          size="large"
          onClick={() => {
            youPlayer.hand.push(game.deck.pop());
          }}
          disabled={game.deck.cards.length === 0}
        >
          Draw
        </Button>,
      );
      if (game.deck.cards.length === 0) {
        actions.push(
          <Button key="button-pass" block size="large" onClick={() => game.moveOn()} color="warning">
            Pass
          </Button>,
        );
      }
    }
    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        <div className="cards-queue">
          {youPlayer.hand.map((card) => (
            <CardComponent key={`${card.suit}-${card.rank}`} game={game} player={youPlayer} card={card} />
          ))}
        </div>
        {actions}
      </Space>
    );
  };
  return auto(render, props);
};

export default You;
