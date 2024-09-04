import { auto } from 'manate/react';
import React from 'react';
import { Button, NoticeBar, Result, Space } from 'antd-mobile';

import type Game from '../models/game';
import CardComponent from './card';

const You = auto((props: { game: Game }) => {
  const { game } = props;
  const youPlayer = game.findPlayer('You');
  const actions = [];
  if (game.over) {
    actions.push(<NoticeBar key="notice-game-over" content="Game Over!" color="info" />);
    if (game.winner === undefined) {
      actions.push(<Result key="result-tie" status="info" title="Tie!" />);
    } else if (game.winner === youPlayer) {
      actions.push(<Result key="result-win" status="success" title="You Win!" />);
    } else {
      actions.push(<Result key="result-lose" status="error" title="You Lose!" />);
    }
    actions.push(
      <Button color="success" key="button-restart" block size="large" onClick={() => game.restart()}>
        Restart
      </Button>,
    );
  } else {
    if (game.deckEmpty) {
      actions.push(
        <Button
          key="button-pass"
          block
          size="large"
          onClick={() => game.moveOn()}
          color="warning"
          disabled={!youPlayer.isCurrent(game)}
        >
          Pass
        </Button>,
      );
    } else {
      actions.push(
        <Button
          color="primary"
          key="button-draw-card"
          block
          size="large"
          onClick={() => {
            youPlayer.hand.push(game.deck.pop());
          }}
          disabled={!youPlayer.isCurrent(game)}
        >
          Draw
        </Button>,
      );
    }
  }
  return (
    <Space direction="vertical" block>
      {actions}
      <Space wrap block justify="center">
        {youPlayer.hand.map((card) => (
          <CardComponent key={`${card.suit}-${card.rank}`} game={game} player={youPlayer} card={card} />
        ))}
      </Space>
    </Space>
  );
});

export default You;
