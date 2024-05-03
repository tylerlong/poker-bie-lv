import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { manage } from 'manate';

import App from './app';
import Game from './game';

const game = new Game();
game.addPlayer('me');
game.addPlayer('bot');
const gameProp = manage(game);

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(
  <StrictMode>
    <App game={gameProp} />
  </StrictMode>,
);
