// App.jsx
import React, { useState, useEffect } from "react";
import { GetAllMovies } from "../../Services/Main/ApiMovies";
import { Link } from "react-router-dom";

function MoviesGallery() {
  const [movies, setMovies] = useState([]);
  const getData = async () => {
    try {
      const response = await GetAllMovies();
      if (response) {
        setMovies(response);
        console.log(response);
      }
    } catch (error) {
      console.error("Error cargando las peliculas:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const currentMovies = movies;
  return (
    <>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            Peliculas
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Esta es nuestra seleccion para ti
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentMovies.map((movie) => (
            <Link
              key={movie.id}
              to='/Step1'
              state={{selectedMovie:movie}}
              className="group rounded-xl overflow-hidden dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
             >
              <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
                <img
                  className="w-full h-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
                  src={movie.url_imagen}
                  alt={`Imagen para ${movie.titulo}`}
                />
              </div>

              <div className="mt-7">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
                  {movie.titulo}

                </h3>
                <p className="mt-3 text-gray-800 dark:text-gray-200">
                {movie.descripcion}

                </p>
                <button className="mt-5 inline-flex items-center gap-x-1 text-blue-600 decoration-2 group-hover:underline font-medium"
                   key={movie.id}
                   to='/Step1'
                   state={{selectedMovie:movie}}
                >
                  Ver horarios
                  
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default MoviesGallery;
