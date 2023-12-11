// App.jsx
import React from "react";
import Header from "../../header";
import Carousel from "./Carousel";
import MoviesGallery from "./MoviesGallery";
import Step1 from "../Sales/Sale_step1"
function Inicio() {
  return (
    <>
      <Header />
      <Carousel />
      <MoviesGallery />
      <Step1 />
    </>
  );
}

export default Inicio;
