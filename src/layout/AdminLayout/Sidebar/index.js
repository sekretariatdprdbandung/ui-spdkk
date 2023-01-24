import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// context
import { AuthContext } from 'context/AuthContext';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText, Stack, Box, Avatar, Typography } from '@mui/material';

// alert
import Swal from 'sweetalert2';

// assets
import Logo from 'assets/images/logo_dprd.png';

// project imports
import AdminMenu from 'menu-items/AdminMenu';
import SuperAdminMenu from 'menu-items/SuperAdminMenu';
import SvgIcons from 'assets/images/menu';

export default function Sidebar() {
  const theme = useTheme();
  let navigate = useNavigate();

  // context
  const [state, dispatch] = useContext(AuthContext);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (state.user.role === 0) {
      setMenu(SuperAdminMenu);
    } else {
      setMenu(AdminMenu);
    }
  }, []);

  // handle logout
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <Box component="nav" sx={{ backgroundColor: theme.palette.primary.main, position: 'relative', height: '100vh' }}>
      <Stack p={2} spacing={2} sx={{ height: '100%' }}>
        <Stack spacing={8} justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
          <Stack spacing={3} mt={3} alignItems="center">
            <Avatar
              alt={state?.user.name}
              src={Logo}
              sx={{ width: { md: '8rem', lg: '10rem' }, height: 'auto', cursor: 'pointer', backgroundColor: 'red' }}
              onClick={() => navigate('/')}
            />
            <Stack justifyContent="center" alignItems="center" spacing={1}>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { sm: '1.4rem', md: '1.5rem', lg: '1.6rem' },
                  fontWeight: '600',
                  color: theme.palette.text.paper,
                  textTransform: 'uppercase',
                }}
              >
                {state?.user.name}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { sm: '1.1rem', md: '1.2rem', lg: '1.3rem' },
                  fontWeight: '400',
                  color: theme.palette.text.paper,
                  textTransform: 'uppercase',
                }}
              >
                {state?.user.role === 0 ? 'Super Admin' : 'Admin'}
              </Typography>
            </Stack>
          </Stack>
          {/* menu  */}
          <Box sx={{ width: '100%', height: '100%' }} display="flex" flexDirection="column" justifyContent="space-between">
            <Box sx={{ width: '100%' }}>
              <List sx={{ width: '100%' }}>
                {menu.map((item, key) => (
                  <ListItemButton
                    key={key}
                    onClick={() => {
                      navigate(item.url);
                    }}
                  >
                    <ListItemIcon sx={{ my: 'auto', minWidth: { sm: 20, md: 30 } }}>{item.icon({ size: 20, color: 'inherit' })}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant={'menu'}
                          color="inherit"
                          pl={{ sm: 1, lg: 2 }}
                          sx={{
                            fontSize: { sm: '0.8rem', md: '1.1rem', lg: '1.3rem' },
                          }}
                        >
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
                    icon: 'question',
                    title: 'Konfirmasi',
                    text: 'Anda yakin ingin keluar?',
                    showCancelButton: true,
                    confirmButtonText: 'Iya',
                    cancelButtonText: 'Tidak',
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      handleLogout();
                    }
                  })
                }
              >
                <ListItemIcon sx={{ my: 'auto', minWidth: { sm: 20, md: 30 } }}>{SvgIcons.LogoutSVG({ size: 20, color: 'inherit' })}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant={'menu'}
                      color="inherit"
                      pl={{ sm: 1, lg: 2 }}
                      sx={{
                        fontSize: { sm: '0.8rem', md: '1.1rem', lg: '1.3rem' },
                      }}
                    >
                      Keluar
                    </Typography>
                  }
                />
              </ListItemButton>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
