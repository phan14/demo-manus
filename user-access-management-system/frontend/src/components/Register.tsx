import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Box,
  Alert,
} from "@mui/material";
import AuthService, { RegisterData } from "../services/auth.service";

const Register = () => {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const initialValues: RegisterData = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) => val && val.length >= 3 && val.length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) => val && val.length >= 6 && val.length <= 40
      )
      .required("This field is required!"),
    firstName: Yup.string().max(50, "First name can be max 50 characters"),
    lastName: Yup.string().max(50, "Last name can be max 50 characters"),
  });

  const handleRegister = (formValue: RegisterData) => {
    const { username, email, password, firstName, lastName } = formValue;

    setMessage("");
    setSuccessful(false);

    AuthService.register({
      username,
      email,
      password,
      firstName,
      lastName,
    })
      .then((response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
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
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
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
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      autoFocus
                      error={errors.username && touched.username}
                      helperText={
                        <ErrorMessage name="username" component="div" />
                      }
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      error={errors.email && touched.email}
                      helperText={<ErrorMessage name="email" component="div" />}
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      error={errors.password && touched.password}
                      helperText={
                        <ErrorMessage name="password" component="div" />
                      }
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      autoComplete="given-name"
                      error={errors.firstName && touched.firstName}
                      helperText={
                        <ErrorMessage name="firstName" component="div" />
                      }
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      error={errors.lastName && touched.lastName}
                      helperText={
                        <ErrorMessage name="lastName" component="div" />
                      }
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
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

                <Grid container>
                  <Grid item>
                    <Link href="/login" variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Register;
