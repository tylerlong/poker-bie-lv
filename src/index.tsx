import React from 'react';
import { createRoot } from 'react-dom/client';
import { manage } from 'manate';

import App from './app';
import Game from './game';
import AI from './ai';

const game = manage(new Game());
game.addPlayer('You');
game.addPlayer('AI');
for (let i = 0; i < 5; i++) {
  game.players.forEach((player) => player.hand.push(game.deck.pop()));
}

// begin of AI
const ai = new AI(game, game.findPlayer('AI'));
ai.start();
// end of AI

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App game={game} />);
