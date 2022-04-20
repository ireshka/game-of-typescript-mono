import { Box, Container, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { BoardWidget } from '../components/BoardWidget';

const Home: NextPage = () => {
  return (
    <Container maxWidth="md">
      <Typography
        variant="h3"
        component="h1"
        textAlign="center"
        sx={{ p: '2rem 2rem' }}
      >
        Game of Typescript Life
      </Typography>
      <Box sx={{ width: '100%' }}>
        <BoardWidget />
      </Box>
    </Container>
  );
};

export default Home;
