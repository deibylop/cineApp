import React, { useState, useRef } from "react";
import { paymentService } from "../../Services/Main/ApiMovies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, Link } from "react-router-dom";
import Header from "../../header";

const provincias = [
  { nombre: "Bocas del Toro", cabecera: "Bocas del Toro" },
  { nombre: "Coclé", cabecera: "Penonomé" },
  { nombre: "Colón", cabecera: "Colón" },
  { nombre: "Darién", cabecera: "La Palma" },
  { nombre: "Herrera", cabecera: "Chitré" },
  { nombre: "Los Santos", cabecera: "Las Tablas" },
  { nombre: "Metropolitana", cabecera: "Panamá" },
  { nombre: "Ngöbe-Buglé", cabecera: "Guanacaste" },
  { nombre: "Panamá Oeste", cabecera: "La Chorrera" },
  { nombre: "Veraguas", cabecera: "Santiago" },
];

function Step3() {
  let { state } = useLocation();
  const movie = state?.selectedMovie;
  const asientos = state?.selectedAsientosState;
  const monto = state?.monto;

  //Datos
  const [selectedProvincia, setSelectedProvincia] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const formRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [formData, setFormData] = useState({
    billingAddress: "",
    aptSuite: "",
    zipCode: "",
    provincia: "",
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    cvvCode: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await paymentService(formData, movie, asientos, monto);

      if (response.cod_error == 200) {
        console.log("¡Datos enviados con éxito!");
        toast.success("Gracias por su compra", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.href = "/Inicio";
      } else {
        console.error("Error al enviar los datos:", response.error);
        toast.error("Ocurrio un error en su compra", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setShowToast(true);
    }
    event.target.reset();
  };
  return (
    <>
      <Header />
      {showToast && <ToastContainer />}

      <div className="max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="bg-gray-100 rounded-xl shadow p-4 sm:p-7 dark:bg-slate-800 m-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              Completa tu informacion de pago
            </h2>
          </div>

          <form ref={formRef}>
            <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
              <label
                htmlFor="af-payment-billing-address"
                className="inline-block text-sm font-medium dark:text-white"
              >
                Billing address
              </label>

              <div className="mt-2 space-y-3">
                <input
                  onChange={handleChange}
                  id="billingAddress"
                  name="billingAddress"
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Street Address"
                />
                <input
                  type="text"
                  id="aptSuite"
                  name="aptSuite"
                  onChange={handleChange}
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Apt, Syuite, Building (Optional)"
                />
                <div className="grid sm:flex gap-3">
                  <input
                    onChange={handleChange}
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="Zip Code"
                  />
                  <select
                    id="provincia"
                    name="provincia"
                    className="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                    onChange={handleChange}
                  >
                    <option selected defaultValue="">
                      Selecciona una Provincia
                    </option>
                    {provincias.map((provincia) => (
                      <option
                        key={provincia.nombre}
                        defaultValue={provincia.nombre}
                      >
                        {provincia.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
              <label
                htmlFor="af-payment-payment-method"
                className="inline-block text-sm font-medium dark:text-white"
              >
                Payment method
              </label>

              <div className="mt-2 space-y-3">
                <input
                  onChange={handleChange}
                  id="cardName"
                  name="cardName"
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Name on Card"
                />
                <input
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="CardNumber"
                  id="CardNumber"
                  name="CardNumber"
                />
                <div className="grid sm:flex gap-3">
                  <input
                    onChange={handleChange}
                    type="text"
                    id="expirationDate"
                    name="expirationDate"
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="Expiration Date"
                  />
                  <input
                    type="text"
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="CVV Code"
                    id="cvvCode"
                    name="cvvCode"
                  />
                </div>
              </div>
            </div>
          </form>

          <div className="mt-5 flex justify-end gap-x-2">
            <Link
              state={{
                selectedMovie: movie,
                monto: monto,
              }}
              type="submit"
              to="/Step2"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Cancelar
            </Link>
            <button
              onClick={handleSubmit}
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Step3;
