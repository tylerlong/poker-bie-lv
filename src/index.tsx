import React from 'react';
import { createRoot } from 'react-dom/client';
import { manage } from 'manate';
import { Dialog, Divider, Footer, SafeArea } from 'antd-mobile';

import App from './components/app';
import Game from './models/game';
import AI from './models/ai';
import GameManager from './models/game-manager';

const game = manage(new Game());
game.addPlayer('You');
game.addPlayer('AI');
for (let i = 0; i < 5; i++) {
  game.players.forEach((player) => player.hand.push(game.deck.pop()));
}
const gameManager = new GameManager(game);
gameManager.start();

// begin of AI
const ai = new AI(game, game.findPlayer('AI'));
ai.start();
// end of AI

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(
  <>
    <div>
      <SafeArea position="top" />
    </div>
    <App game={game} />
    <Divider />
    <Footer
      chips={[{ text: 'Rules', type: 'link' }]}
      onChipClick={() => {
        Dialog.show({
          content: (
            <>
              <Divider>How to start?</Divider>
              <div>
                Shuffle the deck and randomly choose a primary card(and put it back into the deck). The primary card's
                suit will be used as the current suit. Each player draw 5 cards.
              </div>
              <Divider>How to win?</Divider>
              <div>Be the first to get rid of all your cards.</div>
              <Divider>How to play?</Divider>
              <div>
                On your turn, play a card and optionally change the current suit. If you can't play a card, draw from
                the deck until you can. If the deck is empty, pass your turn.
              </div>
              <Divider>What cards are playable?</Divider>
              <div>
                You can play a card if it matches the following conditions: 1. Its suit matches the current suit. 2. Its
                rank matches the current rank. 3. Its rank matches the primary card's rank. 4. It's a Joker card.
              </div>
              <Divider>What is the current rank?</Divider>
              <div>The current rank is always the last played card's rank (unless it's a Joker card).</div>
              <Divider>How to change the current suit?</Divider>
              <div>
                You can change the suit if you play a card that matches the following conditions: 1. Its rank matches
                the primary card's rank. 2. Its rank matches the current rank.
              </div>
              <Divider>Anything special about Joker cards?</Divider>
              <div>
                Joker cards can be played no matter what is the current suit and rank. It doesn't change the current
                suit or rank.
              </div>
            </>
          ),
          closeOnMaskClick: true,
          closeOnAction: true,
          actions: [
            {
              key: 'close',
              text: 'Got it',
            },
          ],
        });
      }}
    ></Footer>
    <div>
      <SafeArea position="bottom" />
    </div>
  </>,
);

// below is for debugging
(window as any).game = game;
