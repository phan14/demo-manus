import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    UserService.getPublicContent()
      .then((response) => {
        setContent(response.data);
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
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Access Management System
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          A comprehensive user management system with JWT, RBAC, Cache, and Swagger
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.default" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Authentication
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Secure user authentication with JWT tokens and password encryption with BCrypt.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href="/login">Sign In</Button>
                <Button size="small" href="/register">Sign Up</Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  User Management
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Manage your profile, change password, and view your account details.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href="/profile">View Profile</Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Admin Panel
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Administrative tools for user management, role assignment, and system monitoring.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href="/admin">Access Admin</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body1">{content}</Typography>
      </Box>
    </Container>
  );
};

export default Home;
