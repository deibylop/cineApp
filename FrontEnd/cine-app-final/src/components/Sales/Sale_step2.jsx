import React, { useState, useEffect } from "react";
import Header from "../../header";
import axios from "axios";
import { getCurrentFuncion } from "../../Services/Main/ApiMovies";
import { useLocation, Link } from "react-router-dom";

const Step2 = () => {
  let { state } = useLocation();
  const salaID = state?.selectedSala;
  const movie = state?.movie;
  const monto = state?.monto;

  console.log("saalaaaa", monto);
  console.log("movieeee", movie);

  const [sala, setSala] = useState("");

  useEffect(() => {
    const cargarInformacionSala = async () => {
      try {
        const response = await getCurrentFuncion(salaID);
        setSala(response.Data);
        // setSalaSeleccionada(null);
        console.log(response.Data);
      } catch (error) {
        console.error("Error al cargar información de la sala:", error);
      }
    };

    cargarInformacionSala();
  }, []);

  const [selectedAsientos, setSelectedAsientos] = useState([]);

  const handleSeleccionarAsiento = (asientoId) => {
    const isSelected = selectedAsientos.includes(asientoId);
    if (isSelected) {
      setSelectedAsientos(selectedAsientos.filter((id) => id !== asientoId));
    } else {
      setSelectedAsientos([...selectedAsientos, asientoId]);
    }
  };

  const renderAsientos = () => {
    console.log("saala222aaa", sala);

    if (!sala) {
      return <p>Cargando información de la sala...</p>;
    }

    return sala.map((asiento) => (
      <div
        key={asiento.id}
        className={`w-10 h-10 border ${
          asiento.asignado == 0
            ? "bg-green-500 cursor-pointer text-center"
            : "bg-red-500 text-center"
        }
        ${
          selectedAsientos.includes(asiento.id)
            ? "bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            : ""
        }`}
        onClick={() => handleSeleccionarAsiento(asiento.id)}
      >
        {asiento.fila}-{asiento.columna}
      </div>
    ));
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div className="bg-gray-100 rounded-xl shadow p-4 sm:p-7 dark:bg-slate-800 m-auto">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold text-center tracking-tight text-gray-900 sm:text-3xl">
              Selecciona sus asientos
            </h1>
            <br />
          </div>
          <div>
            {/* Muestra los asientos */}

            {sala && (
              <div className="grid grid-cols-8 gap-4 mt-4">
                {renderAsientos()}
              </div>
            )}
          </div>
          <br />
          <br />
          <Link
            state={{
                selectedMovie: movie,
                selectedAsientosState:selectedAsientos,
                monto: monto

             }}
            
            type="submit"
            to="/Step3"
            disabled={selectedAsientos.length !== 0}
            className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white ${selectedAsientos.length !== 0 ? 'hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' : 'opacity-50 cursor-not-allowed'}`}
            >
            Avanzar
          </Link>
          <Link
            state={{selectedMovie: movie }}
            type="submit"
            to="/Step1"
            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Regresar
          </Link>
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default Step2;
