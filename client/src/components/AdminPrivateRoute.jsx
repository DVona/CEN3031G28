import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return (currentUser && currentUser.role === "Admin") ? <Outlet /> : <Navigate to="/dashboard" />;
}


// adapted from: https://github.com/sahandghavidel/mern-blog/tree/main