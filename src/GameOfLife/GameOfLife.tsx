import React from 'react';
import styled from 'styled-components';
import { Grid } from './gameOfLifeHelpers';

type GameOfLifeProps = {
  grid: Grid;
  cellSize: number; // width and height of a square cell, as a percentage of viewport width
  onCellClick(rowIndex: number, columnIndex: number): void;
  isSimulationRunning: boolean;
  onSimulationStartClick(): void;
  onSimulationStopClick(): void;
};

const Cell = styled.div<{ size: number; isAlive: boolean }>`
  width: ${({ size }) => size}vw;
  height: ${({ size }) => size}vw;
  background-color: ${({ isAlive }) => (isAlive ? 'green' : 'transparent')};
`;

const Row = styled.div`
  display: flex;
`;

export const GameOfLife: React.FC<GameOfLifeProps> = ({
  grid,
  cellSize,
  onCellClick,
  onSimulationStartClick,
  onSimulationStopClick,
  isSimulationRunning,
}) => {
  return (
    <div>
      <div>
        {isSimulationRunning ? (
          <button onClick={onSimulationStopClick}>stop</button>
        ) : (
          <button onClick={onSimulationStartClick}>start</button>
        )}
      </div>
      <div>
        {grid.map((row, rowIndex) => (
          <Row key={`${rowIndex}__row`}>
            {row.map((columnValue, columnIndex) => (
              <Cell
                onClick={() => {
                  onCellClick(rowIndex, columnIndex);
                }}
                size={cellSize}
                key={`${columnIndex}__column`}
                isAlive={columnValue === 1}
              >
                {columnValue}
              </Cell>
            ))}
          </Row>
        ))}
      </div>
    </div>
  );
};
