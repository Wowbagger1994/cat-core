"use client";

import * as React from "react";
import { Box, Button, TextField, CircularProgress, Typography, Container, ThemeProvider, CssBaseline } from "@mui/material";
import { signIn } from "next-auth/react";
import axios from "axios";
import { createTheme } from "@mui/material";

// Tema Material 3 scuro
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6750A4",
    },
    secondary: {
      main: "#03DAC6",
    },
    background: {
      default: "#121212",
      paper: "#1F1B24",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
    },
  },
});

interface UserAuthFormProps {}

export const UserAuthForm: React.FC<UserAuthFormProps> = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLogin, setIsLogin] = React.useState<boolean>(true);

  const credentialsAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    if (!name || !password) {
      console.error("name e password sono obbligatori!");
      return;
    }

    setIsLoading(true);
    try {
      await signIn("credentials", {
        name,
        password,
        redirect: true,
        callbackUrl: "/home",
      });
    } catch (error) {
      console.error("Errore durante il login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const registerAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    if (!name || !password) {
      console.error("Nome e password sono obbligatori!");
      return;
    }

    setIsLoading(true);
    try {
      // Registrazione dell'utente sul backend
      await axios.post("http://localhost:1865/users", {
        username: name,
        password: password,
        permissions: {
          CONVERSATION: ["WRITE", "EDIT", "LIST", "READ", "DELETE"],
        },
      });

      // Login automatico dopo la registrazione
      await signIn("credentials", {
        email: name,
        password,
        redirect: true,
        callbackUrl: "/home",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Errore nella richiesta Axios:", error.response?.data);
      } else {
        console.error("Errore sconosciuto:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="xs">
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: 6,
            alignItems: "center",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            {isLogin ? "Sign In" : "Create an Account"}
          </Typography>

          {/* Login Form */}
          {isLogin ? (
            <Box component="form" onSubmit={credentialsAction} sx={{ width: "100%" }}>
              <TextField
                id="name"
                label="Name"
                type="text"
                name="name"
                fullWidth
                margin="normal"
                autoComplete="name"
                required
                disabled={isLoading}
                variant="outlined"
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                name="password"
                fullWidth
                margin="normal"
                autoComplete="current-password"
                required
                disabled={isLoading}
                variant="outlined"
              />
              <Box mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isLoading}
                  sx={{
                    bgcolor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                </Button>
              </Box>
            </Box>
          ) : (
            // Register Form
            <Box component="form" onSubmit={registerAction} sx={{ width: "100%" }}>
              <TextField
                id="name"
                label="Name"
                type="text"
                name="name"
                fullWidth
                margin="normal"
                autoComplete="name"
                required
                disabled={isLoading}
                variant="outlined"
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                name="password"
                fullWidth
                margin="normal"
                autoComplete="new-password"
                required
                disabled={isLoading}
                variant="outlined"
              />
              <Box mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isLoading}
                  sx={{
                    bgcolor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : "Register"}
                </Button>
              </Box>
            </Box>
          )}

          {/* Toggle Button */}
          <Button
            onClick={() => setIsLogin(!isLogin)}
            variant="text"
            color="secondary"
            sx={{ mt: 2 }}
          >
            {isLogin ? "Create an account" : "Already have an account? Sign In"}
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
