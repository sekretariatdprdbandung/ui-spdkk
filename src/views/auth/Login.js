// react
import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { NotificationManager } from 'react-notifications';

// API
import { API } from 'config/API';

// context
import { AuthContext } from 'context/AuthContext';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography, Stack, Alert, FormControl, OutlinedInput, InputAdornment, IconButton, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';

// assets
import Image1 from 'assets/images/kantor_dprd_bandung.jpg';
import Logo from 'assets/images/logo_dprd.png';

// project import
import AnimateButton from 'ui-component/button/AnimateButton';

export default function Login() {
  const theme = useTheme();

  // context
  const [state, dispatch] = useContext(AuthContext);

  // show password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // login
  const [loading, setLoading] = useState(false);
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

  // handle submit
  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();
    if (form.email === '' || form.password === '') {
      setLoading(false);
      const alert = (
        <Alert variant="filled" severity="error" sx={{ alignContent: 'center', justifyContent: 'center' }}>
          Silahkan masukkan Email dan Password yang benar
        </Alert>
      );
      setMessage(alert);
    } else {
      try {
        // config
        const config = {
          headers: {
            'content-type': 'application/json',
          },
        };

        // data
        const body = JSON.stringify(form);

        // API login
        const response = await API.post('/auth/login', body, config);

        if (response.data.status === 'Success') {
          setLoading(false);

          // send data to auth context
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: response.data.data,
          });

          // notif
          NotificationManager.success('Login Berhasil', 'Sukses', 5000);

          // set form
          setForm({
            email: '',
            password: '',
          });
        } else {
          setLoading(false);
          const alert = (
            <Alert variant="filled" severity="error" sx={{ alignContent: 'center', justifyContent: 'center' }}>
              {response.data.message}
            </Alert>
          );
          setMessage(alert);
        }
      } catch (error) {
        setLoading(false);
        const alert = (
          <Alert variant="filled" severity="error" sx={{ alignContent: 'center', justifyContent: 'center' }}>
            Server Error
          </Alert>
        );
        setMessage(alert);
        console.log(error);
      }
    }
  });

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
                <Stack spacing={4}>
                  {/* alert */}
                  {message}
                  <form noValidate onSubmit={(e) => handleSubmit.mutate(e)}>
                    <Stack spacing={2}>
                      <FormControl fullWidth>
                        {/* email */}
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                          id="email"
                          value={form.email}
                          onChange={handleChange}
                          name="email"
                          label="Email"
                          type="email"
                          inputProps={{}}
                          required
                          autoComplete="off"
                        />
                      </FormControl>

                      <FormControl fullWidth>
                        {/* password */}
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={form.password}
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
                          loading={loading}
                          loadingPosition="end"
                          endIcon={<LoginIcon />}
                          size="large"
                          type="submit"
                          variant="contained"
                          sx={{
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1rem',
                            backgroundColor: theme.palette.primary.main,
                          }}
                        >
                          Login
                        </LoadingButton>
                      </AnimateButton>
                    </Box>
                  </form>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
