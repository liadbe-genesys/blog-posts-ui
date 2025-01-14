import { useEffect, useState } from 'react';
import { Box, Snackbar, Stack, Typography } from '@mui/joy';

export default function NotificationBar({ show, type, message }) {
  const [open, setOpen] = useState(show);
  
  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Box sx={{ width: 720 }}>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        color={type === 'success' ? 'success' : 'danger'}
        autoHideDuration={5000}
        variant='solid'
      >
        <Stack direction="column" gap={'0.5rem'}>
          <Typography textColor="common.white" level='title-lg'>{type === 'success' ? 'Success' : 'Error'}</Typography>
          <Typography textColor="common.white" level='body-md' sx={{ whiteSpace: 'pre-wrap' }}>{message}</Typography>
        </Stack>
      </Snackbar>
    </Box>
  );
}