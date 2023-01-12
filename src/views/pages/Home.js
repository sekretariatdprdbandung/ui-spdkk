// material-ui
import { Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Home() {
  const theme = useTheme();

  return (
    <Grid container sx={{ boxSizing: 'border-box' }}>
      <Grid item xs={12}>
        <Stack justifyContent="center" align="center" sx={{ height: '93vh' }} spacing={3}>
          <Typography variant="h2">Selamat Datang di Aplikasi</Typography>
          <Typography variant="h1">Sistem Pengolahan Data Kunjungan Kerja</Typography>
          <Typography variant="h1">(SPDKK)</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
