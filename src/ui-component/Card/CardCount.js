import React from 'react';

// material-ui
import { useTheme } from '@mui/system';
import { Stack, Card, CardContent, Typography } from '@mui/material';

function CardCount({ count, title }) {
  const theme = useTheme();

  return (
    <Card variant="outlined" sx={{ width: { sm: '35%', md: '30%', lg: '25%' }, height: 'fit-content', backgroundColor: theme.palette.primary.main }}>
      <CardContent align="center">
        <Stack spacing={2}>
          <Typography variant="h2" color={theme.palette.text.paper}>
            {count}
          </Typography>
          <Typography variant="h4" color={theme.palette.text.paper}>
            {title}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CardCount;
