import { auto } from 'manate/react';
import React from 'react';
import { Alert, Button, Popover, Space } from 'antd';

import type Card from '../models/card';
import type Game from '../models/game';
import type Player from '../models/player';

const CardComponent = (props: { game: Game; player: Player; card: Card }) => {
  const { game, player, card } = props;
  const render = () => {
    let content;
    if (game.over) {
      content = <Alert message="游戏结束" type="info" />;
    } else {
      if (player !== game.currentTurnPlayer) {
        content = <Alert message="等待对方出牌" type="info" />;
      } else {
        if (game.canPlayCard(card)) {
          if (game.canChangeSuit(card)) {
            content = (
              <Space direction="vertical">
                <Button
                  style={{ width: '8rem' }}
                  onClick={() => {
                    game.playCard(card);
                    game.changeSuit('♣️');
                    game.moveOn();
                  }}
                >
                  ♣️
                </Button>
                <Button
                  style={{ width: '8rem', color: 'red' }}
                  onClick={() => {
                    game.playCard(card);
                    game.changeSuit('♦️');
                    game.moveOn();
                  }}
                >
                  ♦️
                </Button>
                <Button
                  style={{ width: '8rem', color: 'red' }}
                  onClick={() => {
                    game.playCard(card);
                    game.changeSuit('♥️');
                    game.moveOn();
                  }}
                >
                  ♥️
                </Button>
                <Button
                  style={{ width: '8rem' }}
                  onClick={() => {
                    game.playCard(card);
                    game.changeSuit('♠️');
                    game.moveOn();
                  }}
                >
                  ♠️
                </Button>
              </Space>
            );
          } else {
            content = (
              <Button
                style={{ width: '8rem' }}
                onClick={() => {
                  game.playCard(card);
                  game.moveOn();
                }}
              >
                出牌
              </Button>
            );
          }
        } else {
          content = <Alert message="不能出这张牌" type="info" />;
        }
      }
    }
    return (
      <Popover key={`${card.suit}-${card.rank}`} content={content} trigger="click" placement="bottom">
        <img className="card-img" src={card.image} width="96px" />
      </Popover>
    );
  };
  return auto(render, props);
};

export default CardComponent;
