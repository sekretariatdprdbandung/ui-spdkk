import React from 'react';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Box } from '@mui/material';

// project imports
import Sidebar from './Sidebar';

export default function AdminLayout() {
  const theme = useTheme();

  return (
    <Grid container>
      <Grid item sm={3} md={3} lg={2.2}>
        <Sidebar />
      </Grid>
      {/* content */}
      <Grid item sm={9} md={9} lg={9.8} sx={{ backgroundColor: '#fff' }}>
        <PerfectScrollbar
          style={{
            height: '100vh',
            paddingLeft: '8px',
            paddingRight: '10px',
          }}
        >
          <Box sx={{ heigth: '100vh', p: 3, boxSizing: 'border-box' }}>
            <Outlet />
          </Box>
        </PerfectScrollbar>
      </Grid>
    </Grid>
  );
}
