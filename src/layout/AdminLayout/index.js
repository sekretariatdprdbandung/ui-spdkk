import React from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Box } from '@mui/material';

// project imports
import Sidebar from './Sidebar';

export default function AdminLayout() {
  const theme = useTheme();

  return (
    <Grid container>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      {/* content */}
      <Grid item xs={9}>
        <Box sx={{ height: '100vh', backgroundColor: theme.palette.background.paper, p: 3, boxSizing: 'border-box' }}>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
}
