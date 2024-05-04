import React from 'react';
import { Button, Space, Typography } from 'antd';
import { auto } from 'manate/react';

import type Game from './game';

const { Title, Text } = Typography;

const App = (props: { game: Game }) => {
  const { game } = props;
  const youPlayer = game.findPlayer('Tyler');
  const aiPlayer = game.findPlayer('AI');
  const render = () => (
    <>
      <Title>憋驴</Title>
      <Space direction="vertical">
        <Text>It's {game.currentTurnPlayer.name}'s turn.</Text>
        <Button onClick={() => game.moveOn()}>Move on</Button>
        AI's Cards:
        <div>
          {aiPlayer.hand.map((card) => (
            <img key={`${card.suit}-${card.rank}`} src={card.image} width="128px" />
          ))}
        </div>
        Your Cards:
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
