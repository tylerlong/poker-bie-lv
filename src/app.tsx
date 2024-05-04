import React from 'react';
import { Alert, Button, Divider, Space, Typography } from 'antd';
import { auto } from 'manate/react';

import type Game from './game';
import Card from './card';

const { Title } = Typography;

const App = (props: { game: Game }) => {
  const { game } = props;
  const youPlayer = game.findPlayer('You');
  const aiPlayer = game.findPlayer('AI');
  const isYourTurn = game.currentTurnPlayer === youPlayer;
  const cardBackImage = Card.backImage();
  const render = () => (
    <>
      <Title>憋驴</Title>
      <Space direction="vertical">
        <Button onClick={() => game.moveOn()}>Move on</Button>
        <Title level={2}>AI</Title>
        <div>
          {aiPlayer.hand.map((card) => (
            <img key={`${card.suit}-${card.rank}`} src={cardBackImage} width="128px" />
          ))}
        </div>
        <Divider />
        <Alert message={isYourTurn ? "It's your turn." : "It's AI's turn."} type={isYourTurn ? 'success' : 'error'} />
        <Divider />
        <Title level={2}>You</Title>
        <div>
          {youPlayer.hand.map((card) => (
            <img key={`${card.suit}-${card.rank}`} src={card.image} width="128px" />
          ))}
        </div>
      </Space>
    </>
  );
  return auto(render, props);
};

export default App;
