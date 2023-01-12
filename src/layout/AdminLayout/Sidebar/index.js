import React from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText, Stack, Box, Avatar, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// alert
import Swal from 'sweetalert2';

// assets
import Logo from 'assets/images/logo_dprd.png';

// project imports
import AdminMenu from 'menu-items/AdminMenu';

export default function Sidebar() {
  const theme = useTheme();
  let navigate = useNavigate();

  return (
    <Box sx={{ height: '100vh', backgroundColor: theme.palette.primary.main }}>
      <Stack p={2} spacing={2}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Avatar alt="Remy Sharp" src={Logo} sx={{ width: { lg: '6rem' }, height: 'auto', cursor: 'pointer' }} onClick={() => navigate('/')} />
          <Stack justifyContent="center" alignItems="center">
            <Typography variant="h5" sx={{ fontSize: '1.5rem', fontWeight: '400', color: theme.palette.text.paper, textTransform: 'uppercase' }}>
              Teresa
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: '400', color: theme.palette.text.paper, textTransform: 'uppercase' }}>
              Admin
            </Typography>
          </Stack>
          {/* menu  */}
          <Box sx={{ width: '100%' }}>
            <List sx={{ width: '100%' }}>
              {AdminMenu.map((item) => (
                <ListItemButton
                  onClick={() => {
                    navigate(item.url);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: theme.palette.text.paper,
                      px: 1,
                    }}
                  >
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="menu" pl={2}>
                        {item.title}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
          {/* logout */}
          <Box sx={{ width: '100%' }}>
            <ListItemButton
              onClick={() =>
                Swal.fire({
                  title: 'Do you want to save the changes?',
                  showCancelButton: true,
                  confirmButtonText: 'Yes',
                  cancelButtonText: 'No',
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    Swal.fire('Saved!', '', 'success');
                  }
                })
              }
            >
              <ListItemIcon sx={{ color: theme.palette.text.paper, p: 0 }}>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="menu" pl={2}>
                    Logout
                  </Typography>
                }
              />
            </ListItemButton>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
