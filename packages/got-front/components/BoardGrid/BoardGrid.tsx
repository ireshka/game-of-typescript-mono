import { Box } from '@mui/material';
import { Board } from '@l22-got-monorepo/got-core';

type BoardGridProps = {
  board: Board;
};

export const BoardGrid = ({ board }: BoardGridProps) => {
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
          const cellColor = cell ? 'blue' : 'lightgray';
          return (
            <Box
              key={keyValue}
              sx={{ aspectRatio: '1/1', backgroundColor: cellColor }}
            >
              {cell}
            </Box>
          );
        })
      )}
    </Box>
  );
};
