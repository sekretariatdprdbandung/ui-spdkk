// material-ui
import { Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Home() {
  const theme = useTheme();

  return (
    <Grid container sx={{ boxSizing: 'border-box' }}>
      <Grid item xs={12}>
        <Stack justifyContent="center" align="center" sx={{ height: '93vh' }} spacing={3}>
          <Typography variant="h3" sx={{ color: theme.palette.primary.dark }}>
            Selamat Datang di Aplikasi
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 600, color: theme.palette.primary.dark }}>
            Sistem Pengolahan Data Kunjungan Kerja
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 600, color: theme.palette.primary.dark }}>
            (SPDKK)
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
