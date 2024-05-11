import React from 'react';
import { auto } from 'manate/react';
import { Space } from 'antd-mobile';

import type Game from '../models/game';
import You from './you';
import Opponent from './opponent';
import Desk from './desk';

const App = (props: { game: Game }) => {
  const { game } = props;
  const render = () => {
    return (
      <Space direction="vertical">
        <Opponent game={game} />
        <Desk game={game} />
        <You game={game} />
      </Space>
    );
  };
  return auto(render, props);
};

export default App;
