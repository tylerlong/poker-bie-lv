import { auto } from 'manate/react';
import React from 'react';

import type Game from '../models/game';
import { Alert, Button, Popover, Space } from 'antd';

const You = (props: { game: Game }) => {
  const { game } = props;
  const render = () => {
    const youPlayer = game.findPlayer('You');
    const isYourTurn = game.currentTurnPlayer === youPlayer;
    return (
      <Space direction="vertical">
        <div className="cards-queue">
          {youPlayer.hand.map((card) => (
            <Popover
              key={`${card.suit}-${card.rank}`}
              content={
                <Space direction="vertical">
                  {game.canPlayCard(card) ? (
                    <Button
                      style={{ width: '8rem' }}
                      onClick={() => {
                        game.playCard(card);
                        game.moveOn();
                      }}
                    >
                      出牌
                    </Button>
                  ) : (
                    <Alert message="不能出这张牌" type="info" />
                  )}
                </Space>
              }
              trigger="click"
              placement="bottom"
            >
              <img className="card-img" src={card.image} width="96px" />
            </Popover>
          ))}
        </div>
        {isYourTurn && (
          <Button
            block
            size="large"
            onClick={() => {
              youPlayer.hand.push(game.deck.pop());
            }}
            disabled={game.deck.cards.length === 0}
          >
            摸牌
          </Button>
        )}
        {isYourTurn && game.deck.cards.length === 0 && (
          <Button block size="large" onClick={() => game.moveOn()}>
            跳过
          </Button>
        )}
      </Space>
    );
  };
  return auto(render, props);
};

export default You;
