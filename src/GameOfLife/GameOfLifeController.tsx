import React, { useState } from 'react';
import produce from 'immer';
import useInterval from 'use-interval';
import { GameOfLife } from './GameOfLife';
import { calculateNextGridState } from './calculateNextGridState';

type GameOfLifeProps = {
  rows: number;
  columns: number;
};

export type CellValue = 0 | 1;

export type Grid = CellValue[][];

function initialGridState(rows: number, columns: number) {
  const row = new Array(columns).fill(0);

  return new Array(rows).fill(row);
}

function calculateCellSize(columns: number) {
  return parseFloat((100 / columns).toFixed(2));
}

export const GameOfLifeController: React.FC<GameOfLifeProps> = ({
  rows,
  columns,
}) => {
  const [grid, setGrid] = useState<Grid>(initialGridState(rows, columns));
  const [isSimulationRunning, setIsSimulationRunning] = useState<boolean>(
    false,
  );

  const manuallyToggleCell = function(rowIndex: number, columnIndex: number) {
    setGrid((gridState) => {
      return produce(gridState, (gridDraft) => {
        gridDraft[rowIndex][columnIndex] =
          gridDraft[rowIndex][columnIndex] === 0 ? 1 : 0;
      });
    });
  };

  const handleSimulationStartClick = function() {
    setIsSimulationRunning(true);
  };

  const handleSimulationStopClick = function() {
    setIsSimulationRunning(false);
  };

  useInterval(
    () => {
      if (!isSimulationRunning) return;

      setGrid((grid) => calculateNextGridState(grid));
    },
    isSimulationRunning ? 1000 : null,
  );

  return (
    <>
      <GameOfLife
        grid={grid}
        cellSize={calculateCellSize(columns)}
        isSimulationRunning={isSimulationRunning}
        onSimulationStartClick={handleSimulationStartClick}
        onSimulationStopClick={handleSimulationStopClick}
        onCellClick={manuallyToggleCell}
      />
    </>
  );
};
