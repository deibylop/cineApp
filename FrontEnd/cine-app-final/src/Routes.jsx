// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/login";
import Registration from "./components/Auth/registration";
import Inicio from "./components/Main/inicio";
import ProtectedRoutes from "./components/utils/ProtectedRoutes";
import AddMovie from "./components/Peliculas/AddMovie";
import Dashboard from "./components/Peliculas/Dashboard";
import EditMovie from "./components/Peliculas/EditMovie";
import DeleteMovie from "./components/Peliculas/DeleteMovie";
import Step1 from "./components/Sales/Sale_step1";
import Step2 from "./components/Sales/Sale_step2";
import Step3 from "./components/Sales/Sale_step3";

function Rutas() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={Login} />
          <Route path="/registrar" exact Component={Registration} />
          <Route element={<ProtectedRoutes canActivate />}>
            <Route path="/Inicio" exact Component={Inicio} />
            <Route path="/Dashboard" exact Component={Dashboard} />
            <Route path="/AddMovie" exact Component={AddMovie} />
            <Route path="/EditMovie" exact Component={EditMovie} />
            <Route path="/DeleteMovie" exact Component={DeleteMovie} />
            <Route path="/Step1" exact Component={Step1} />
            <Route path="/Step2" exact Component={Step2} />
            <Route path="/Step3" exact Component={Step3} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Rutas;
