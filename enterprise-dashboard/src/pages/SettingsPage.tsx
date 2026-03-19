import React from 'react';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useAppSelector } from '../hooks/typedHooks';

const SettingsPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Settings
              </Typography>
              <Box sx={{ mt: 2 }}>
                <TextField
                  label="Username"
                  defaultValue={user?.username}
                  fullWidth
                  margin="normal"
                  disabled
                />
                <TextField
                  label="Email"
                  defaultValue={user?.email}
                  fullWidth
                  margin="normal"
                  disabled
                />
                <TextField
                  label="Role"
                  defaultValue={user?.role}
                  fullWidth
                  margin="normal"
                  disabled
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Preferences
              </Typography>
              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable Notifications"
                  sx={{ display: 'block', mb: 2 }}
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Dark Mode"
                  sx={{ display: 'block', mb: 2 }}
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Auto-refresh Data"
                  sx={{ display: 'block', mb: 2 }}
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Show Tooltips"
                  sx={{ display: 'block' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Dashboard Refresh Rate
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Slider
                  defaultValue={30}
                  step={10}
                  min={10}
                  max={120}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}s`}
                  marks={[
                    { value: 10, label: '10s' },
                    { value: 30, label: '30s' },
                    { value: 60, label: '60s' },
                    { value: 120, label: '120s' },
                  ]}
                />
                <Typography variant="caption" color="text.secondary">
                  Configure how often the dashboard refreshes data
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Data Export
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Export your dashboard data in various formats for analysis and reporting.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button variant="outlined" size="small">
                    Export CSV
                  </Button>
                  <Button variant="outlined" size="small">
                    Export PDF
                  </Button>
                  <Button variant="outlined" size="small">
                    Export PNG
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" paragraph>
                  Enterprise Dashboard v1.0.0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Built with React 18, TypeScript, Redux Toolkit, Material-UI, and Recharts.
                  Features real-time updates, advanced state management, and performance optimizations.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;
