import { createBrowserRouter, RouterProvider } from 'react-router';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { experimental_extendTheme,  Experimental_CssVarsProvider, THEME_ID } from '@mui/material/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import ErrorPage from './views/ErrorPage';
import AppContainer from './views/AppContainer';
import { navigationData } from './data/navigationData';
import '@fontsource/inter';
import { NotificationProvider } from './contexts/NotificationContext';

/**
 * Here you can extend or modify app theme (change colors, other styling preferences).
 * Changes made here will affect all of the app's HTML elements. 
 */
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        // affects all Joy components that has `color="primary"` prop.
        primary: {
          50: '#fffbeb',
          // 200: '#fde68a',
          // 300, 400, .., 800,
          900: '#78350f',
        },
      },
    },
  },
  fontFamily: {
    display: 'Inter, var(--joy-fontFamily-fallback)',
    body: 'Inter, var(--joy-fontFamily-fallback)',
  },
  typography: {
    label: {
      fontSize: 'var(--joy-fontSize-xs)',
      fontWeight: 'var(--joy-fontWeight-lg)',
      lineHeight: 'var(--joy-lineHeight-sm)',
      marginTop: '1rem',
      marginBottom: '0.25rem'
    },
  }
});

/**
 * App navigation routes, as defined in 'src/data/navigationData.js'.
 * index (default route '/') page is AppContainer.jsx
 * error page (runtime errors) is ErrorPage.jsx
 */
const routes = [
  {
    element: <AppContainer />,
    errorElement: <ErrorPage />,
    handle: { crumb: () => <span>Home</span> },
    children: navigationData.map(nav => {
      return {
        index: nav.path === '/' ? true : false,
        path: nav.path,
        element: nav.element
      }
    })
  }
];

/**
 * App root, responsible for loading react-router (navigation), and app theme (mostly styling). 
 */
export default function App() {
  const router = createBrowserRouter(routes);
  const materialTheme = experimental_extendTheme();

  return (
    <Experimental_CssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
      <CssVarsProvider disableTransitionOnChange theme={theme}>
        <NotificationProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </NotificationProvider>
      </CssVarsProvider>
    </Experimental_CssVarsProvider>
  );
}

