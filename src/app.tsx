import React from 'react';
import { Button, Space, Typography } from 'antd';
import { auto } from 'manate/react';

import type Game from './game';

const { Title } = Typography;

const App = (props: { game: Game }) => {
  const { game } = props;
  const render = () => (
    <>
      <Title>Untitled App</Title>
      <Space>
        It's {game.currentPlayer.name}'s turn.
        <Button onClick={() => game.moveOn()}>Move on</Button>
        {game.deck.cards.map((card) => (
          <img src={card.image} width="32px" />
        ))}
      </Space>
    </>
  );
  return auto(render, props);
};

export default App;
