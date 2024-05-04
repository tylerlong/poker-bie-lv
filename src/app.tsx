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
      const card = _.sample(aiPlayer.hand);
      if (card) {
        game.playCard(card);
        game.moveOn();
      }
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
          <Title level={2}>AI</Title>
          <div>
            {aiPlayer.hand.map((card) => (
              <img className="card-img" key={`${card.suit}-${card.rank}`} src={cardBackImage} width="128px" />
            ))}
          </div>
          <Divider />
          <Alert message={isYourTurn ? "It's your turn." : "It's AI's turn."} type={isYourTurn ? 'success' : 'error'} />
          <div>
            {_.reverse(_.takeRight(game.playedCards, 6)).map((card, index) => (
              <img key={`${card.suit}-${card.rank}`} src={card.image} width={`${128 - index * 16}px`} />
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
          <div>
            {youPlayer.hand.map((card) => (
              <Popover
                key={`${card.suit}-${card.rank}`}
                content={
                  <Space direction="vertical">
                    <Button
                      style={{ width: '8rem' }}
                      onClick={() => {
                        game.playCard(card);
                        game.moveOn();
                      }}
                    >
                      出牌
                    </Button>
                  </Space>
                }
                trigger="click"
                placement="bottom"
              >
                <img className="card-img" src={card.image} width="128px" />
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
