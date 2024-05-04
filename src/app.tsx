import React from 'react';
import { Alert, Button, Divider, Space, Typography } from 'antd';
import { auto } from 'manate/react';

import type Game from './game';
import Card from './card';

const { Title } = Typography;
const cardBackImage = Card.backImage();

const App = (props: { game: Game }) => {
  const { game } = props;
  const render = () => {
    const youPlayer = game.findPlayer('You');
    const aiPlayer = game.findPlayer('AI');
    const isYourTurn = game.currentTurnPlayer === youPlayer;
    return (
      <>
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
              <img className="card-img" key={`${card.suit}-${card.rank}`} src={card.image} width="128px" />
            ))}
          </div>
        </Space>
      </>
    );
  };
  return auto(render, props);
};

export default App;
