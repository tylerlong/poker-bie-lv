import { auto } from 'manate/react';
import React from 'react';
import type { ActionSheetProps } from 'antd-mobile';
import { ActionSheet } from 'antd-mobile';
import type { ActionSheetShowHandler } from 'antd-mobile/es/components/action-sheet';

import type Card from '../models/card';
import type Game from '../models/game';
import type Player from '../models/player';

const CardComponent = auto((props: { game: Game; player: Player; card: Card }) => {
  const { game, player, card } = props;
  const actionSheetProps: Omit<ActionSheetProps, 'destroyOnClose' | 'forceRender' | 'visible'> = {
    actions: [],
    cancelText: 'Cancel',
  };
  let actionSheetShowHandler: ActionSheetShowHandler;
  if (game.over) {
    actionSheetProps.extra = 'Game is over';
  } else {
    if (!player.isCurrent(game)) {
      actionSheetProps.extra = 'Not your turn';
    } else {
      if (game.canPlayCard(card)) {
        if (game.canChangeSuit(card)) {
          actionSheetProps.extra = 'Play a card and change suit to:';
          actionSheetProps.actions.push({
            text: '♣️',
            key: '♣️',
            onClick: () => {
              game.playCard(card);
              game.changeSuit('♣️');
              game.moveOn();
              actionSheetShowHandler.close();
            },
          });
          actionSheetProps.actions.push({
            text: <span style={{ color: 'red' }}>♦️</span>,
            key: '♦️',
            onClick: () => {
              game.playCard(card);
              game.changeSuit('♦️');
              game.moveOn();
              actionSheetShowHandler.close();
            },
          });
          actionSheetProps.actions.push({
            text: <span style={{ color: 'red' }}>♥️</span>,
            key: '♥️',
            onClick: () => {
              game.playCard(card);
              game.changeSuit('♥️');
              game.moveOn();
              actionSheetShowHandler.close();
            },
          });
          actionSheetProps.actions.push({
            text: '♠️',
            key: '♠️',
            onClick: () => {
              game.playCard(card);
              game.changeSuit('♠️');
              game.moveOn();
              actionSheetShowHandler.close();
            },
          });
        } else {
          actionSheetProps.extra = 'Play a card:';
          actionSheetProps.actions.push({
            text: 'Play',
            key: 'play',
            onClick: () => {
              game.playCard(card);
              game.moveOn();
              actionSheetShowHandler.close();
            },
          });
        }
      } else {
        actionSheetProps.extra = 'Cannot play this card';
      }
    }
  }
  return (
    <img
      className={`card-img ${player.isCurrent(game) && game.canPlayCard(card) ? 'highlighted' : ''}`}
      src={card.image}
      onClick={() => {
        actionSheetShowHandler = ActionSheet.show(actionSheetProps);
      }}
    />
  );
});

export default CardComponent;
