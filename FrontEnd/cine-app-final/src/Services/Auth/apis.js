import axios from 'axios';

export const FormLogin = async (email, password) => {
  try {
    const jsonData = {
      "procedure_id": 1,
      "params": {
        "email": email,
        "password": password,
      },
    };
    const response = await axios.post(
      "api/UserConstroller.php",
      jsonData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response; 
  }
};

  export const FormSignIn = async (email, password,nombre) => {
    try {
      const jsonData = {
        "procedure_id": 2,
        "params": {
          "nombre": nombre,
          "email": email,
          "password": password,
          "rol_id": 1
        },
      };
      const response = await axios.post(
        "api/UserConstroller.php",
        jsonData
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response; 
    }
};

export const LogOut = async () => {
  try {
    sessionStorage.removeItem('token');
    return 200;
  } catch (error) {
    console.error(error);
    return error; 
  }
};
