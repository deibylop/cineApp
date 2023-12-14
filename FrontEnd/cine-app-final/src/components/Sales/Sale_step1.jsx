import React, { useState, useEffect } from "react";
import { getHorarios } from "../../Services/Main/ApiMovies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, Link } from "react-router-dom";
import Header from "../../header";

function Step1() {
  let { state } = useLocation();
  const movie = state?.selectedMovie;
  const [showToast, setShowToast] = useState(false);
  const [selectedSalaId, setSelectedSalaId] = useState(null);
  const [cantidad, setCantidad] = useState(1); // Inicializa la cantidad en 1
  const monto = cantidad * 4.75; // Multiplica la cantidad por el precio

  const handleSeleccionarSala = (salaId) => {
    setSelectedSalaId(salaId);
  };

  console.log(movie);
  const [dataMovie, setDataMovie] = useState({
    values: {
      titulo: "",
      descripcion: "",
      genero: "",
      fecha: "",
    },
  });
  const [selectedGenero, setSelectedGenero] = useState("");
  const [moviesGeneros, setMoviesGeneros] = useState([]);

  const [horarios, setHorarios] = useState([]);

  const getData = async () => {
    try {
      const response = await getHorarios(movie.id);
      if (response) {
        setHorarios(response.Data);
        console.log(response);
      }
    } catch (error) {
      console.error("Error cargando las peliculas:", error);
    }
  };

  useEffect(() => {
    if (movie) {
      setDataMovie({
        values: {
          titulo: movie.titulo,
          descripcion: movie.descripcion,
          genero: movie.genero,
          fecha: movie.fecha_estreno,
          status: movie.status,
          id: movie.id,
          url_imagen: movie.url_imagen,
        },
      });
    }
    getData();
  }, [movie]);
  return (
    <>
      <Header />
      <div className="bg-white">
        <div className="pt-6">
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={movie.url_imagen}
                alt="Model wearing plain white basic tee."
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="mt-6">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {movie.titulo}
                </h1>
              </div>

              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>

                <div className="space-y-6">
                  <br /> <br />
                  <p className="text-base text-gray-900 text-justify">
                    {movie.descripcion}
                  </p>
                </div>
              </div>
            </div>

            <form className="mt-10">
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    Horarios
                  </h3>
                  <a className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Elegir horario
                  </a>
                </div>
                {/* DATOS DE FECHAS */}
                <fieldset className="mt-4">
                  <legend className="sr-only"></legend>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {horarios.map((horarios) => (
                      <label
                        className={`group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer ${
                          selectedSalaId === horarios.id
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="size-choice"
                          value="XS"
                          className="sr-only"
                          aria-labelledby="size-choice-1-label"
                          onChange={() => handleSeleccionarSala(horarios.id)}
                        />
                        <span id="size-choice-1-label">{horarios.hora}</span>

                        <span
                          className="pointer-events-none absolute -inset-px rounded-md"
                          aria-hidden="true"
                        ></span>
                      </label>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-gray-900">
                      Monto: ${monto.toFixed(2)}
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      className="py-2 px-3 rounded-md border border-gray-200 shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      id="cantidad-input"
                      onChange={(e) => setCantidad(parseInt(e.target.value))}
                    />
                  </div>
                </fieldset>
              </div>

              <Link
                state={{
                  selectedSala: selectedSalaId,
                  movie: dataMovie.values,
                  monto: monto.toFixed(2)
                }}
                disabled={!selectedSalaId || !cantidad} // Deshabilita si no hay sala o cantidad seleccionada
                type="submit"
                to="/Step2"
                className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white ${
                  selectedSalaId
                    ? "hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                Siguiente
              </Link>
            </form>
          </div>

          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16"></div>
        </div>
      </div>
    </>
  );
}

export default Step1;
