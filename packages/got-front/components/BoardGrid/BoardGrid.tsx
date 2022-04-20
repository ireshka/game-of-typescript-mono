import { Box } from '@mui/material';
import { Board } from '@l22-got-monorepo/got-core';
import { BoardCell } from '../BoardCell/index';

type BoardGridProps = {
  board: Board;
  onCellClick: (rowIndex: number, cellIndex: number) => void;
};

export const BoardGrid = ({ board, onCellClick }: BoardGridProps) => {
  const columnNumber = board[0].length;
  return (
    <Box
      display="grid"
      sx={{
        gridTemplateColumns: `repeat(${columnNumber}, minMax(0, 1fr))`,
        width: '70vh',
        margin: '0 auto',
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          const keyValue = `${rowIndex} ${cellIndex}`;
          return (
            <BoardCell key={keyValue}  rowIndex={rowIndex} cellIndex={cellIndex} cellValue={cell} onCellClick={onCellClick}/>
          );
        })
      )}
    </Box>
  );
};
