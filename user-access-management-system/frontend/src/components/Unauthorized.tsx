import React, { useState } from 'react';
import { Typography, Container, Box, Paper, Alert } from '@mui/material';

const Unauthorized = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" color="error" gutterBottom>
          Access Denied
        </Typography>
        <Alert severity="error" sx={{ mt: 2 }}>
          You do not have permission to access this page. Please contact an administrator if you believe this is an error.
        </Alert>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">
            This page requires specific permissions or roles that your account does not have.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Unauthorized;
