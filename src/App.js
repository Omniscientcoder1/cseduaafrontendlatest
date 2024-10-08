import { CssBaseline, ThemeProvider } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRoutes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Router from './routes/Router';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './context/AuthContext';
import { baselightTheme } from './theme/DefaultColors';

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <ToastContainer />
        <CssBaseline />
        {routing}
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
