import React from 'react';
import { Space, Typography } from 'antd';
import { auto } from 'manate/react';

import type Game from '../models/game';
import You from './you';
import Opponent from './opponent';
import Desk from './desk';

const { Title } = Typography;

const App = (props: { game: Game }) => {
  const { game } = props;
  const render = () => {
    return (
      <>
        <Title>Bie Lv</Title>
        <Space direction="vertical">
          <Title level={2}>AI</Title>
          <Opponent game={game} />
          <Title level={2}>Desk</Title>
          <Desk game={game} />
          <Title level={2}>You</Title>
          <You game={game} />
        </Space>
      </>
    );
  };
  return auto(render, props);
};

export default App;
