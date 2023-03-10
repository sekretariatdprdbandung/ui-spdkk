import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

// context
import { AuthContextProvider } from 'context/AuthContext';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// style + assets
import 'assets/scss/styles.scss';

// default theme
import themes from 'themes';

import 'sweetalert2/src/sweetalert2.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-notifications/lib/notifications.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient();
root.render(
  <AuthContextProvider>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={themes()}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </QueryClientProvider>
    <NotificationContainer />
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
