import { auto } from 'manate/react';
import React from 'react';
import { Alert, Button, Space, Typography } from 'antd';

import type Game from '../models/game';
import CardComponent from './card';

const { Title } = Typography;

const You = (props: { game: Game }) => {
  const { game } = props;
  const render = () => {
    const youPlayer = game.findPlayer('You');
    const isYourTurn = game.currentTurnPlayer === youPlayer;
    const actions = [];
    if (game.over || game.draw) {
      actions.push(<Title key="title-game-over">Game Over!</Title>);
      if (game.draw) {
        actions.push(<Alert key="alert-draw" message="Draw!" type="warning" />);
      } else if (game.findPlayer('You').won) {
        actions.push(<Alert key="alert-you-win" message="You Win!" type="success" />);
      } else {
        actions.push(<Alert key="alert-you-lose" message="You Lose!" type="error" />);
      }
      actions.push(
        <Button key="button-restart" block size="large" onClick={() => game.restart()}>
          Restart
        </Button>,
      );
    } else if (isYourTurn) {
      actions.push(
        <Button
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
          <Button key="button-pass" block size="large" onClick={() => game.moveOn()}>
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
