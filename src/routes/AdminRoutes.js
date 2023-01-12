// react
import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography, Stack, Button, FormControl, OutlinedInput, TextField, InputAdornment, IconButton, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// assets
import Image1 from 'assets/images/kantor_dprd_bandung.jpg';
import Logo from 'assets/images/logo_dprd.png';

// project import
import AnimateButton from 'ui-components/AnimateButton';

export default function Login() {
  const theme = useTheme();

  // show password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // login
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Grid container>
      {/* left side */}
      <Grid
        item
        md={7}
        sx={{
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: '100vw',
            height: '100%',
            backgroundImage: `url(${Image1})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            transform: 'translateX(-22%)',
          }}
        ></Box>
      </Grid>
      {/* right side */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          overflow: 'hidden',
        }}
      >
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', p: 2 }}>
          <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item>
                <Box component={'img'} src={Logo} width={100}></Box>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="row" alignItems="center" justifyContent="center">
                  <Grid item>
                    <Stack alignItems="center" justifyContent="center" spacing={1}>
                      <Typography
                        variant="h6"
                        color={theme.palette.primary.dark}
                        sx={{ fontWeight: '700', textTransform: 'uppercase', textAlign: 'justify' }}
                      >
                        Sistem pengolahan data kunjungan kerja
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} mt={{ lg: 2 }}>
                <form noValidate>
                  <Stack spacing={2}>
                    <FormControl fullWidth>
                      {/* email */}
                      <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-email-login"
                        value={form.email}
                        defaultValue={form.email}
                        onChange={handleChange}
                        type="email"
                        name="email"
                        label="Email"
                        inputProps={{}}
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      {/* password */}
                      <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password-login"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={form.password}
                        defaultValue={form.password}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end" size="large">
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        inputProps={{}}
                      />
                    </FormControl>
                  </Stack>

                  <Box sx={{ mt: 4 }}>
                    <AnimateButton>
                      <LoadingButton
                        disableElevation
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        sx={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1rem', backgroundColor: theme.palette.primary.dark }}
                      >
                        Login
                      </LoadingButton>
                    </AnimateButton>
                  </Box>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
