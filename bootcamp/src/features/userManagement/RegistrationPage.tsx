import * as React from 'react';
import Box from '@mui/material/Box';
import Item from '../shared/PaperWrapper'
import Grid from '@mui/material/Unstable_Grid2';
import { Counter } from '../counter/Counter';
import RegistrationForm from './RegistrationForm';


export function RegistrationPage() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={12}>
            <RegistrationForm/>
          </Grid>
        </Grid>
      </Box>
    );
  }
  