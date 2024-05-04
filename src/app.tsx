import React, { useEffect } from 'react';
import { Alert, Button, Divider, Popover, Space, Typography, message } from 'antd';
import { auto } from 'manate/react';
import _ from 'lodash';

import type Game from './game';
import Card from './card';

const { Title } = Typography;
const cardBackImage = Card.backImage();

const App = (props: { game: Game }) => {
  const { game } = props;
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const aiPlayer = game.findPlayer('AI');
    if (game.currentTurnPlayer !== game.findPlayer('AI')) {
      return;
    }
    messageApi.info('AI is thinking...');
    setTimeout(() => {
      const playableCards = aiPlayer.hand.filter((card) => game.canPlayCard(card));
      if (playableCards.length === 0 && game.deck.cards.length > 0) {
        aiPlayer.hand.push(game.deck.pop());
        while (!game.canPlayCard(_.last(aiPlayer.hand)) && game.deck.cards.length > 0) {
          aiPlayer.hand.push(game.deck.pop());
        }
        if (game.canPlayCard(_.last(aiPlayer.hand))) {
          playableCards.push(_.last(aiPlayer.hand));
        }
      }
      const card = _.sample(playableCards);
      if (card) {
        game.playCard(card);
      }
      game.moveOn();
      messageApi.info('It is your turn.');
    }, 3000);
  }, [game.currentTurnPlayer]);
  const render = () => {
    const youPlayer = game.findPlayer('You');
    const aiPlayer = game.findPlayer('AI');
    const isYourTurn = game.currentTurnPlayer === youPlayer;
    return (
      <>
        {contextHolder}
        <Title>憋驴</Title>
        <Space direction="vertical">
          <Title level={2}>主牌</Title>
          <img src={game.primaryCard.image} width="96px" />
          <Title level={2}>AI</Title>
          <div className="cards-queue">
            {aiPlayer.hand.map((card) => (
              <img className="card-img" key={`${card.suit}-${card.rank}`} src={cardBackImage} width="96px" />
            ))}
          </div>
          <Divider />
          <div>
            {_.reverse(_.takeRight(game.playedCards, 8)).map((card, index) => (
              <img
                className="card-img"
                key={`${card.suit}-${card.rank}`}
                src={card.image}
                width={`${96 - index * 8}px`}
              />
            ))}
          </div>
          <Divider />
          <Title level={2}>你</Title>
          {isYourTurn && (
            <>
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
            </>
          )}
          {isYourTurn && game.deck.cards.length === 0 && (
            <Button block size="large" onClick={() => game.moveOn()}>
              跳过
            </Button>
          )}
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
        </Space>
      </>
    );
  };
  return auto(render, props);
};

export default App;
