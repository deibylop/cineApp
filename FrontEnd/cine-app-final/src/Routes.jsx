// App.jsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/login";
import Registration from "./components/Auth/registration";
import Inicio from "./components/Main/inicio";
import ProtectedRoutes from "./components/utils/ProtectedRoutes";
import { useLocalStorage } from "react-use";
import { jwtDecode } from "jwt-decode";

function Rutas() {
  const user = sessionStorage.getItem("token");
  console.log("session",user);

    // useEffect(()=>{
    //   setUser(jwtDecode(user))
    // })
    // if (user !== "undefined") {
    //   // Set auth token header auth
    //   // setAuthToken(user);
    //   const decodedToken = jwtDecode(user);
    //   console.log("TOKEN",decodedToken)
    //   console.log(user);
      // Decode token and get user info and exp
    
    // }


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={Login} />
          <Route path="/registrar" exact Component={Registration} />
          <Route element={<ProtectedRoutes canActivate={user} />}>
            <Route path="/Inicio" exact Component={Inicio} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Rutas;
