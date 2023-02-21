import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Counter } from '../counter/Counter';
import Item from '../shared/PaperWrapper'


export function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <Item><Counter />    </Item>
        </Grid>
        <Grid xs={12} md={6}>
          <Item><Counter /></Item>
        </Grid>
        <Grid xs={12} md={12}>
          <Item></Item>
        </Grid>
        <Grid xs={6} md={8}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid xs={2} md={2}>
          <Item>xs=2 md=2</Item>
        </Grid>
        <Grid xs={2} md={2}>
          <Item>xs=2 md=2</Item>
        </Grid>
        <Grid xs={2} md={2}>
          <Item>xs=2 md=2</Item>
        </Grid>
        <Grid xs={2} md={2}>
          <Item>xs=2 md=2</Item>
        </Grid>
        <Grid xs={2} md={2}>
          <Item>xs=2 md=2</Item>
        </Grid>
        <Grid xs={1} md={1}>
          <Item>xs=1 md=1</Item>
        </Grid>
        <Grid xs={2} md={2}>
          <Item>xs=2 md=2</Item>
        </Grid>
        <Grid xs={3} md={3}>
          <Item>xs=3 md=3</Item>
        </Grid>
        <Grid xs={4} md={4}>
          <Item>xs=4 md=4</Item>
        </Grid>
        <Grid xs={5} md={5}>
          <Item>xs=5 md=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
