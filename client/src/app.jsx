import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AdminSignUp from "./pages/AdminSignUp";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Calendar from "./pages/EmployeeCalendar";
import Users from "./pages/AdminUsers";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/AdminPrivateRoute";
import OnlyEmployeePrivateRoute from "./components/EmployeePrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<Tickets />} />
        </Route>
        <Route element={<OnlyEmployeePrivateRoute />}>
          <Route path="/calendar" element={<Calendar />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/sign-up-admin" element={<AdminSignUp />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
