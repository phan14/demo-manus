import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const Profile = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    UserService.getUserProfile()
      .then((response) => {
        setUserProfile(response.data);
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
          Loading profile...
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Avatar
              sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
            >
              <PersonIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6">
              {userProfile?.firstName} {userProfile?.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              @{userProfile?.username}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Username"
                  secondary={userProfile?.username}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Email" secondary={userProfile?.email} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Full Name"
                  secondary={`${userProfile?.firstName || ""} ${
                    userProfile?.lastName || ""
                  }`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Roles"
                  secondary={
                    userProfile?.roles
                      ? userProfile.roles
                          .map((role: any) => role.name.replace("ROLE_", ""))
                          .join(", ")
                      : ""
                  }
                />
              </ListItem>
            </List>
            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                href="/change-password"
              >
                Change Password
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;
