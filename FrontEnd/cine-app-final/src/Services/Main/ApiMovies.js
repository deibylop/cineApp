import axios from "axios";

export const GetAllMovies = async () => {
  try {
    const jsonData = {
      procedure_id: 1,
      params: {},
    };
    const response = await axios.post("api/MoviesController.php", jsonData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const getAllSalas = async () => {
  try {
    const jsonData = {
      procedure_id: 2,
      params: {},
    };
    const response = await axios.post("api/MoviesController.php", jsonData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const getAllHorarios = async () => {
  try {
    const jsonData = {
      procedure_id: 3,
      params: {},
    };
    const response = await axios.post("api/MoviesController.php", jsonData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const getAllGeneros = async () => {
  try {
    const jsonData = {
      procedure_id: 5,
      params: {},
    };
    const response = await axios.post("api/MoviesController.php", jsonData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const createMovie = async (
  titulo,
  descripcion,
  genero,
  fecha,
  movieImg
) => {
  try {
    const jsonData = {
      procedure_id: 6,
      params: {
        titulo: titulo,
        descripcion: descripcion,
        genero: genero,
        fecha: fecha,
        movieImg: movieImg,
      },
    };
    const response = await axios.post("api/MoviesController.php", jsonData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const UpdateMovie = async (
  id,
  titulo,
  descripcion,
  genero,
  fecha,
  movieImg,
  status,

) => {
  try {
    const jsonData = {
      procedure_id: 7,
      params: {
        id: id,
        titulo: titulo,
        descripcion: descripcion,
        genero: genero,
        fecha: fecha,
        movieImg: movieImg,
        status: status
      },
    };
    const response = await axios.post("api/MoviesController.php", jsonData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const deleteMovie = async (
  movieID
) => {
  try {
    const jsonData = {
      procedure_id: 8,
      params: {
        id: movieID,
      },
    };
    const response = await axios.post("api/MoviesController.php", jsonData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const getHorarios = async (
  movieID
) => {
  try {
    const jsonData = {
      procedure_id: 9,
      params: {
        id :movieID
      },
    };
    const response = await axios.post("api/MoviesController.php", jsonData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const getCurrentFuncion = async (
  salaid
) => {
  try {
    const jsonData = {
      procedure_id: 10,
      params: {
        id :salaid
      },
    };
    const response = await axios.post("api/MoviesController.php", jsonData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const paymentService = async (
  data,
  movie,
  asientos,
  monto
) => {
  try {
    const jsonData = {
      procedure_id: 11,
      params: {
        billingAddress: data.billingAddress ,
        aptSuite: data.aptSuite,
        zipCode: data.zipCode,
        provincia: data.provincia,
        cardName: data.cardName,
        cardNumber: data.cardNumber,
        expirationDate: data.expirationDate,
        cvvCode:data.cvvCode,
        movie:movie.id,
        asientos:asientos,
        amount:monto
        },
    };
    console.log(jsonData.params);
    const response = await axios.post("api/MoviesController.php", jsonData);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};
