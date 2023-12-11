import { Navigate, Outlet } from "react-router-dom";
// import * as jwt from "jsonwebtoken";

const ProtectedRoutes = ({ canActivate, redirectPath = "/" }) => {
    // const decodedToken = jwtDecode(canActivate, "Llave maestra de JWT");
    // console.log("TOKEN",decodedToken)
  if (!canActivate) {
    return <Navigate to={redirectPath} replace />
  }
  return <Outlet />
};
export default ProtectedRoutes;
