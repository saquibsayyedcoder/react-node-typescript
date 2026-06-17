import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const isLoggedIn =
    localStorage.getItem(
      "isLoggedIn"
    ) === "true";

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate
              to="/dashboard"
              replace
            />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <Dashboard />
          ) : (
            <Navigate
              to="/"
              replace
            />
          )
        }
      />
    </Routes>
  );
}

export default App;