import React, { useState, useEffect } from "react";
import { getAllGeneros, createMovie } from "../../Services/Main/ApiMovies";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function AddMovie() {
  const [showToast, setShowToast] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moviesGeneros, setGeneros] = useState([]);
  const [selectedGenero, setSelectedGenero] = useState("");
  const [imagenBase64, setImagenBase64] = useState("");

  const [form, setForm] = useState({
    values: { titulo: "", descripcion: "", genero: "", fecha: "" },
  });

  const handleTitleChange = (event) => {
    setForm({ values: { ...form.values, titulo: event.target.value } });
  };

  const handleDescriptionChange = (event) => {
    setForm({ values: { ...form.values, descripcion: event.target.value } });
  };

  const handleFechaChange = (event) => {
    setForm({ values: { ...form.values, fecha: event.target.value } });
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
    obtenerDatos();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { titulo, descripcion, genero, fecha, movieImg } = form.values;
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
      const response = await createMovie(
        titulo,
        descripcion,
        selectedGenero,
        fecha,
        imagenBase64
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

      {/* <div
        id="hs-modal-Add-movie"
        className={`hs-overlay ${isModalOpen ? 'block' : 'hidden'} w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto`} > */}
      <div
        id="hs-modal-Add-movie"
        className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h2 className="block text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Nueva película
                </h2>
              </div>

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
                          onChange={handleTitleChange}
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          required
                        />
                      </div>
                    </div>

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
                          onChange={handleDescriptionChange}
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          required
                        ></textarea>
                      </div>
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
                          value={selectedGenero}
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
                          onChange={handleFechaChange}
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          required
                        />
                      </div>
                    </div>
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
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <br />
                  <br />
                  {/* Botón de envío */}
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    data-hs-overlay="#hs-modal-Add-movie"
                  >
                    Agregar película
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddMovie;
