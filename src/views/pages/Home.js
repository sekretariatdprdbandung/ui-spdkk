// material-ui
import { Grid, Stack, Typography } from '@mui/material';

export default function Home() {
  return (
    <Grid container sx={{ boxSizing: 'border-box' }}>
      <Grid item xs={12} sx={{ minHeight: '93vh' }}>
        <Stack justifyContent="center" align="center" spacing={3} sx={{ height: '100%' }}>
          <Typography variant="h2" sx={{ fontSize: { sm: '1.5rem', md: '1.8rem', lg: '2.5rem' } }}>
            Selamat Datang di Aplikasi
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { sm: '2rem', md: '2.5rem', lg: '3.5rem' } }}>
            Sistem Pengolahan Data Kunjungan Kerja
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { sm: '2rem', md: '2.5rem', lg: '3.5rem' } }}>
            (SPDKK)
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
