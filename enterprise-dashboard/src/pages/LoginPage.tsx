import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      // Auto-login after 1 second
      const timer = setTimeout(() => {
        login();
        navigate('/dashboard');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, login, navigate]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Enterprise Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Signing in automatically...
              </Typography>
            </Box>
            <Alert severity="info" sx={{ mb: 2 }}>
              Auto-logging in with demo credentials
            </Alert>
            <Box sx={{ mt: 3 }}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={() => {
                  login();
                  navigate('/dashboard');
                }}
              >
                Continue to Dashboard
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginPage;
