import { Navigate, Outlet } from "react-router-dom";
// import * as jwt from "jsonwebtoken";

const ProtectedRoutes = ({ canActivate, redirectPath = "/" }) => {
  const user = sessionStorage.getItem("token");
  console.log("session",user);
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }
  return <Outlet />
};
export default ProtectedRoutes;
