import React from 'react';
import { auto } from 'manate/react';
import { Space } from 'antd-mobile';

import type Game from '../models/game';
import You from './you';
import Opponent from './opponent';
import Desk from './desk';

const App = auto((props: { game: Game }) => {
  const { game } = props;
  return (
    <Space direction="vertical" block>
      <Opponent game={game} />
      <Desk game={game} />
      <You game={game} />
    </Space>
  );
});

export default App;
