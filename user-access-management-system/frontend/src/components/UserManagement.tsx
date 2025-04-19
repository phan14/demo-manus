import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  OutlinedInput
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import UserService from "../services/user.service";
import AdminService from "../services/admin.service";

const UserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [roleUpdateMessage, setRoleUpdateMessage] = useState("");
  const [roleUpdateSuccess, setRoleUpdateSuccess] = useState(false);

  const availableRoles = ["user", "mod", "admin"];

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setLoading(true);
    UserService.getAllUsers()
      .then((response) => {
        setUsers(response.data);
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
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      AdminService.deleteUser(userId)
        .then(() => {
          setUsers(users.filter(user => user.id !== userId));
        })
        .catch((error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setError(message);
        });
    }
  };

  const handleOpenRoleDialog = (user: any) => {
    setSelectedUser(user);
    // Extract role names without the ROLE_ prefix
    const userRoles = user.roles.map((role: any) => 
      role.name.replace("ROLE_", "").toLowerCase()
    );
    setSelectedRoles(userRoles);
    setOpenRoleDialog(true);
  };

  const handleCloseRoleDialog = () => {
    setOpenRoleDialog(false);
    setRoleUpdateMessage("");
    setRoleUpdateSuccess(false);
  };

  const handleRoleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedRoles(typeof value === 'string' ? value.split(',') : value);
  };

  const handleUpdateRoles = () => {
    if (selectedUser) {
      AdminService.updateUserRoles(selectedUser.id, selectedRoles)
        .then((response) => {
          setRoleUpdateMessage(response.data.message);
          setRoleUpdateSuccess(true);
          
          // Update the user in the list
          const updatedUsers = users.map(user => {
            if (user.id === selectedUser.id) {
              return {
                ...user,
                roles: selectedRoles.map(role => ({ 
                  name: `ROLE_${role.toUpperCase()}` 
                }))
              };
            }
            return user;
          });
          
          setUsers(updatedUsers);
          
          // Close dialog after a delay
          setTimeout(() => {
            handleCloseRoleDialog();
            loadUsers(); // Reload to get fresh data
          }, 1500);
        })
        .catch((error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setRoleUpdateMessage(message);
          setRoleUpdateSuccess(false);
        });
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading users...
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
        User Management
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>
                    {user.roles.map((role: any) => (
                      <Chip
                        key={role.name}
                        label={role.name.replace("ROLE_", "")}
                        color={
                          role.name === "ROLE_ADMIN"
                            ? "error"
                            : role.name === "ROLE_MODERATOR"
                            ? "warning"
                            : "primary"
                        }
                        size="small"
                        sx={{ mr: 0.5 }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleOpenRoleDialog(user)}
                      title="Edit Roles"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDeleteUser(user.id)}
                      title="Delete User"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Role Edit Dialog */}
      <Dialog open={openRoleDialog} onClose={handleCloseRoleDialog}>
        <DialogTitle>Edit User Roles</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                User: {selectedUser.username}
              </Typography>
              
              <FormControl sx={{ mt: 2, width: '100%' }}>
                <InputLabel id="role-select-label">Roles</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  multiple
                  value={selectedRoles}
                  onChange={handleRoleChange}
                  input={<OutlinedInput label="Roles" />}
                >
                  {availableRoles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              {roleUpdateMessage && (
                <Alert 
                  severity={roleUpdateSuccess ? "success" : "error"}
                  sx={{ mt: 2 }}
                >
                  {roleUpdateMessage}
                </Alert>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRoleDialog}>Cancel</Button>
          <Button onClick={handleUpdateRoles} variant="contained">
            Update Roles
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserManagement;
