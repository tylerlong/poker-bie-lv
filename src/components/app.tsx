import React from 'react';
import { auto } from 'manate/react';
import { Divider, Space } from 'antd-mobile';

import type Game from '../models/game';
import You from './you';
import Opponent from './opponent';
import Desk from './desk';

const App = (props: { game: Game }) => {
  const { game } = props;
  const render = () => {
    return (
      <Space direction="vertical">
        <Divider contentPosition="left">AI</Divider>
        <Opponent game={game} />
        <Divider contentPosition="left">Desk</Divider>
        <Desk game={game} />
        <Divider contentPosition="left">You</Divider>
        <You game={game} />
      </Space>
    );
  };
  return auto(render, props);
};

export default App;
