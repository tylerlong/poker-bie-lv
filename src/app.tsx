import React from 'react';
import { Button, Space, Typography } from 'antd';
import { auto } from 'manate/react';

import type Game from './game';

const { Title, Text } = Typography;

const App = (props: { game: Game }) => {
  const { game } = props;
  const render = () => (
    <>
      <Title>Untitled App</Title>
      <Space direction="vertical">
        <Text>It's {game.currentPlayer.name}'s turn.</Text>
        <Button onClick={() => game.moveOn()}>Move on</Button>
        <div>
          {game.deck.cards.map((card) => (
            <img src={card.image} width="32px" />
          ))}
        </div>
      </Space>
    </>
  );
  return auto(render, props);
};

export default App;
