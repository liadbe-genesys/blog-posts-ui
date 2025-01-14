import { useState } from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import { Outlet } from 'react-router';
import { navigationData } from '../data/navigationData';

/**
 * Main container of the app, responsible for page layout.
 * All pages being navigated are rendered here, using <Outlet />.
 */
export default function AppContainer() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}

      <Stack
        id="tab-bar"
        direction="row"
        justifyContent="space-around"
        spacing={1}
        sx={{
          display: { xs: 'flex', sm: 'none' },
          zIndex: '999',
          bottom: 0,
          position: 'fixed',
          width: '100dvw',
          py: 2,
          backgroundColor: 'background.body',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        {navigationData.filter(nav => nav.displayName).map(nav =>
          <Button
            key={nav.path}
            variant="plain"
            color="neutral"
            component="a"
            href={nav.path}
            size="sm"
            startDecorator={nav.icon}
            sx={{ flexDirection: 'column', '--Button-gap': 0 }}
          />
        )}

      </Stack>

      <Layout.Root
        sx={{
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Layout.Header>
          <Header />
        </Layout.Header>

        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        
        <Layout.Main>
          <Outlet />
        </Layout.Main>
        
      </Layout.Root>
    </>
  );
}