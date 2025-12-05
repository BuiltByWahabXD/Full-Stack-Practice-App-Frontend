import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { ThemeProvider, useThemeContext } from "./context/themeContext";
import allRoutes from "./routes";
import "./styles/theme.css";

function AppContent() {
  const { theme } = useThemeContext();

  return (
    // data-theme controls CSS variables in theme.css
    <div className="app-container" data-theme={theme}>
      <BrowserRouter>
        <Routes>
          {allRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
