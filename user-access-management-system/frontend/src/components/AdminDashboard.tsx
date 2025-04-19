import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  People as PeopleIcon,
  Security as SecurityIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import AdminService from "../services/admin.service";
import UserService from "../services/user.service";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      AdminService.getUserCount(),
      UserService.getAdminBoard(),
    ])
      .then(([userCountResponse, adminBoardResponse]) => {
        setUserCount(userCountResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setError(message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading admin dashboard...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 140,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PeopleIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography component="h2" variant="h6" color="primary">
                  Total Users
                </Typography>
                <Typography component="p" variant="h4">
                  {userCount}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 140,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SecurityIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography component="h2" variant="h6" color="secondary">
                  Security
                </Typography>
                <Typography component="p" variant="body2">
                  Role-based access control
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 140,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DashboardIcon color="error" sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography component="h2" variant="h6" color="error">
                  Admin Panel
                </Typography>
                <Typography component="p" variant="body2">
                  Manage users and roles
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Admin Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              <ListItem button component="a" href="/admin/users">
                <ListItemText primary="User Management" secondary="View, edit, and delete users" />
              </ListItem>
              <Divider />
              <ListItem button disabled>
                <ListItemText primary="System Settings" secondary="Configure application settings (Coming soon)" />
              </ListItem>
              <Divider />
              <ListItem button disabled>
                <ListItemText primary="Audit Logs" secondary="View system activity logs (Coming soon)" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
