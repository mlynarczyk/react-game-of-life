import React from 'react';
import { storiesOf } from '@storybook/react';
import { GameOfLifeController } from './GameOfLifeController';

storiesOf('GameOfLife', module).add('Default', () => (
  <div>
    <GameOfLifeController columns={40} rows={40} />
  </div>
));
