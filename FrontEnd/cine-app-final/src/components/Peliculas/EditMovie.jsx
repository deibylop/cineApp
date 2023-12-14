import React, { useState, useEffect } from "react";
import { getAllGeneros, UpdateMovie } from "../../Services/Main/ApiMovies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import MovieMenu from "./MovieMenu";
import DeleteMovie from "./DeleteMovie";


function EditMovie() {
  let { state } = useLocation();
  const movie = state.selectedMovie;

  const [showToast, setShowToast] = useState(false);
  const [moviesGeneros, setGeneros] = useState([]);
  const [selectedGenero, setSelectedGenero] = useState("");
  const [imagenBase64, setImagenBase64] = useState("");

  const [form, setForm] = useState({
  values: {
    titulo: "",
    descripcion: "",
    genero: "",
    fecha: "",
  },
});

const handleTitleChange = (event) => {
  setForm({
    values: {
      ...form.values,
      titulo: event.target.value,
    },
  });
};

const handleDescriptionChange = (event) => {
  setForm({
    values: {
      ...form.values,
      descripcion: event.target.value,
    },
  });
};

const handleFechaChange = (event) => {
  setForm({
    values: {
      ...form.values,
      fecha: event.target.value,
    },
  });
};

  const obtenerDatos = async () => {
    try {
      const getGeneros = await getAllGeneros();
      setGeneros(getGeneros);
      console.log(getGeneros);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    if (movie) {
      setForm({
        values: {
          titulo: movie.titulo,
          descripcion: movie.descripcion,
          genero: movie.genero,
          fecha: movie.fecha_estreno,
          status: movie.status
        },
      });
    }
    obtenerDatos();
  }, [movie]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagenBase64(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const { titulo, descripcion, genero, fecha, movieImg,status } = form.values;
    if (!titulo || !descripcion || !selectedGenero || !fecha) {
      setShowToast(true);
      toast.error("Por favor, complete todos los campos.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else {
      const response = await UpdateMovie(
        movie.id,
        titulo,
        descripcion,
        selectedGenero,
        fecha,
        imagenBase64 ? imagenBase64 : movie.url_imagen,
        status
      );
      if (response.cod_error == 200) {
        setShowToast(true);
        toast.success("Pelicula agregada con éxito.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

 
  return (
    <>
      {showToast && <ToastContainer />}
      <MovieMenu />
      <div className="h-full">
        <div className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
          <div className="w-full max-w-md mx-auto p-6">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    Actualizar pelicula
                  </h1>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {movie.titulo}
                    <br />
                  </p>
                </div>
                <hr />

                <div className="mt-5">
                  <form>
                    <div className="grid grid-cols-1 gap-y-4">
                      <div>
                        <label
                          htmlFor="titulo"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Título
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="titulo"
                            name="titulo"
                            value={movie.titulo}
                            onChange={handleTitleChange}
                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            required
                          />
                        </div>
                      </div>
                    <hr />

                      {/* Nuevo campo para la descripción de la película */}
                      <div>
                        <label
                          htmlFor="descripcion"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Descripción
                        </label>
                        <div className="relative">
                          <textarea
                            id="descripcion"
                            name="descripcion"
                            rows="3"
                            value={movie.descripcion}
                            onChange={handleDescriptionChange}
                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            required
                          ></textarea>
                        </div>
                        <hr />

                      </div>
                      <div>
                        <label
                          htmlFor="genero"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Género
                        </label>
                        <div className="relative">
                          <select
                            id="genero"
                            name="genero"
                            value={movie.genero}
                            onChange={(e) => setSelectedGenero(e.target.value)}
                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            required
                          >
                            <option value="" disabled>
                              Selecciona un género
                            </option>
                            {moviesGeneros.map((genero) => (
                              <option key={genero.id} value={genero.id}>
                                {genero.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <hr />

                      <div>
                        <label
                          htmlFor="fecha"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Fecha
                        </label>
                        <div className="relative">
                          <input
                            id="fecha"
                            name="fecha"
                            rows="3"
                            type="date"
                            value={movie.fecha_estreno}
                            onChange={handleFechaChange}
                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            required
                          />
                        </div>
                      </div>
                      <hr />

                      <div>
                        <label
                          htmlFor="movieImagen"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Imagen
                        </label>
                        <div className="relative">
                          <input
                            id="movieImagen"
                            name="movieImagen"
                            rows="3"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <br />
                    <div>
                      <label>Estado:</label>
                      <select
                        value={movie.status}
                      >
                        <option value="1">Habilitado</option>
                        <option value="0">Inhabilado</option>
                      </select>
                    </div>
                    <br />
                    <br />
                    {/* Botón de envío */}
                    <button
                      type="submit"
                      onClick={handleSubmitUpdate}
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Actualizar película
                    </button>
                    <br /> <br />
                    <button
                     type="button"
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      state={{selectedMovie:movie.id}}
                      data-hs-overlay="#modal-delete-movie"
                    >
                      Eliminar película
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteMovie />
    </>
  );
}

export default EditMovie;
