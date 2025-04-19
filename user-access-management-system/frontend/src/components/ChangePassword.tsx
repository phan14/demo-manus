import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Paper,
} from "@mui/material";
import UserService from "../services/user.service";

const ChangePassword = () => {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleChangePassword = (formValue: any) => {
    const { oldPassword, newPassword } = formValue;

    setMessage("");
    setSuccessful(false);

    UserService.changePassword(oldPassword, newPassword)
      .then((response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Change Password
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleChangePassword}
        >
          {({ errors, touched }) => (
            <Form>
              <Box sx={{ mt: 1 }}>
                {!successful && (
                  <>
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      name="oldPassword"
                      label="Current Password"
                      type="password"
                      id="oldPassword"
                      error={errors.oldPassword && touched.oldPassword}
                      helperText={
                        <ErrorMessage name="oldPassword" component="div" />
                      }
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      name="newPassword"
                      label="New Password"
                      type="password"
                      id="newPassword"
                      error={errors.newPassword && touched.newPassword}
                      helperText={
                        <ErrorMessage name="newPassword" component="div" />
                      }
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      name="confirmPassword"
                      label="Confirm New Password"
                      type="password"
                      id="confirmPassword"
                      error={errors.confirmPassword && touched.confirmPassword}
                      helperText={
                        <ErrorMessage name="confirmPassword" component="div" />
                      }
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Change Password
                    </Button>
                  </>
                )}

                {message && (
                  <Alert
                    severity={successful ? "success" : "error"}
                    sx={{ mt: 2 }}
                  >
                    {message}
                  </Alert>
                )}

                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <Button href="/profile" variant="text">
                    Back to Profile
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
