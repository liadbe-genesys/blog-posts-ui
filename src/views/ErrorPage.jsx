import { Typography, Grid, Alert, Button } from '@mui/joy';
import { useRouteError } from 'react-router';
import givataim from '../assets/givataim.jpg';
import { useState } from 'react';

/**
 * This ErrorPage view component would appear in unexpected situations
 */
export default function ErrorPage() {
  const error = useRouteError();
  const [showError, setShowError] = useState(false);

  const toggleShowError = () => {
    setShowError(!showError);
  }

  return (
    <div id='error-page'>
      <Grid container alignItems='center' justifyContent='center' sx={{ minHeight: '100vh', padding: '1rem' }}>
        <Grid xs={12} sm={8} md={6} justifyContent='center'>
          <Typography level='h1'>Wooa!</Typography>
          <Typography level='h3' fontWeight='400'>Someone went off-route here &#128584;</Typography>
          <img 
            src={givataim} 
            width="100%" 
            height="auto" 
            style={{ margin: '1rem 0', borderRadius: 'var(--joy-radius-md)' }} 
          />
        
          {!showError && <Button variant='plain' onClick={toggleShowError}>More information</Button>}
          
          {showError &&
            <Alert 
              variant='outlined'
              color='danger'
              endDecorator={
                <Button variant='plain' onClick={toggleShowError} size='sm'>Show less</Button>
              }
            >
                {error?.error?.message && <Typography>{error?.error?.message}</Typography>}
            </Alert>
          }

        </Grid>
      </Grid>
    </div>
  );
}
