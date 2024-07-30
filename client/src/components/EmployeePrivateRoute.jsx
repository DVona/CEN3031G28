import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function OnlyEmployeePrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return (currentUser && (currentUser.role === "Employee" || currentUser.role === "Admin")) ? <Outlet /> : <Navigate to="/dashboard" />;
}
