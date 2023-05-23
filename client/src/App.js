import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUsers } from "state";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const fetchUsers = async () => {
    if (token) {
      const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await result.json();
      dispatch(setUsers({ users: data }));
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
