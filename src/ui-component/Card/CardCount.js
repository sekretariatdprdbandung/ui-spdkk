import React from 'react';

// material-ui
import { useTheme } from '@mui/system';
import { Grid, Box, Stack, Card, CardContent, Typography, IconButton, Button, Tooltip, ButtonBase } from '@mui/material';

function CardCount({ count, title }) {
  const theme = useTheme();

  return (
    <Card variant="outlined" sx={{ width: '25%', height: 'fit-content', backgroundColor: theme.palette.primary.main }}>
      <CardContent align="center">
        <Typography variant="h2" color={theme.palette.text.paper}>
          {count}
        </Typography>
        <Typography variant="h6" color={theme.palette.text.paper}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardCount;
