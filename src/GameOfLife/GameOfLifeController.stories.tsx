import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { GameOfLifeController } from './GameOfLifeController';

const Story = () => {
  const [counter, setCounter] = useState<number>(0);

  return (
    <div>
      <button
        onClick={() => {
          setCounter((c) => (c += 1));
        }}
      >
        Trigger controller rerender
      </button>
      <GameOfLifeController columns={40} rows={40} pleaseRerender={counter} />
    </div>
  );
};

storiesOf('GameOfLife', module).add('Default', () => <Story />);
