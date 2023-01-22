// material-ui
import { Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Home() {
  const theme = useTheme();

  return (
    <Grid container sx={{ boxSizing: 'border-box' }}>
      <Grid item xs={12} sx={{ minHeight: '93vh' }}>
        <Stack justifyContent="center" align="center" spacing={3} sx={{ height: '100%' }}>
          <Typography variant="h2">Selamat Datang di Aplikasi</Typography>
          <Typography variant="h1">Sistem Pengolahan Data Kunjungan Kerja</Typography>
          <Typography variant="h1">(SPDKK)</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
