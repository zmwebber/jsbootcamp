import * as React from 'react';
import Box from '@mui/material/Box';
import Item from '../shared/PaperWrapper'
import Grid from '@mui/material/Unstable_Grid2';
import { Counter } from '../counter/Counter';
import RegistrationForm from './RegistrationForm';
import Typography from '@mui/material/Typography';
import UserGrid from './UserGrid';

export function UserManagementPage() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={12}>
          <Item><Typography>Manage Users Data Grid:</Typography>
            <UserGrid></UserGrid>
          </Item>
          </Grid>
        </Grid>
      </Box>
    );
  }
  