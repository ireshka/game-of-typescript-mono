import * as React from 'react';
import { Stack, Button, Box } from '@mui/material';
import { BoardGrid } from '../BoardGrid/index';
import { Board, GameOfLife } from '@l22-got-monorepo/got-core';

const mockBoard: Board = [
  [0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

export const BoardWidget = () => {
  const [boardObject, setBoardObject] = React.useState<GameOfLife | null>(null);
  const [boardState, setBoardState] = React.useState<Board | null>(null);

  const initializeGame = async () => {
    setBoardState(mockBoard);
    const board = new GameOfLife(mockBoard);
    setBoardObject(board);
    setBoardState(board.getState());
  };

  const tickGame = async () => {
    setBoardState(boardObject.tick().getState());
  };

  const isGameLoaded = boardState !== null;

  return (
    <>
      <Stack direction="row" justifyContent="center">
        <Button
          variant="contained"
          onClick={isGameLoaded ? tickGame : initializeGame}
        >
          {isGameLoaded ? 'Next generation' : 'Start game'}
        </Button>
      </Stack>
      {isGameLoaded && (
        <Box sx={{ pt: '2rem' }}>
          <BoardGrid board={boardState} />
        </Box>
      )}
      {isGameLoaded && (
        <Stack direction="row" justifyContent="center" sx={{ pt: '0.5rem' }}>
          <Button variant="contained" onClick={initializeGame}>
            {'Restart game'}
          </Button>
        </Stack>
      )}
    </>
  );
};
