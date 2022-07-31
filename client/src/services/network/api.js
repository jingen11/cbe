import axios from "axios";

const Api = class {
  login = async function (userCredential) {
    try {
      const response = await axios.post("/api/auth/login", {
        username: userCredential.username,
        password: userCredential.password,
      });

      if (response.status === 200) {
        if (response.data.error) {
          throw new Error(response.data.error);
        }

        return response.data;
      }
      else throw new Error(response.statusText);
    } catch (error) {
      throw error;
    }
  };

  checkSession = async function () {
    try {
      const response = await axios.post("/api/auth/checkSession", {});

      if (response.status === 200) {
        return response.data;
      }
      else throw new Error(response.statusText);
    } catch (error) {
      throw error;
    }
  }

  logout = async function () {
    const response = await axios.get("/api/auth/logout");

    if (response.status === 200) return true;

    return false;
  };

  getWorkers = async function () {
    try {
      const response = await axios.get("/api/workers");

      if (response.status === 200) return response.data;

      else throw new Error(response.statusText);
    } catch (error) {
      throw error;
    }
  }

  addWorker = async function (workerDetails) {
    try {
      console.log(workerDetails);
      const response = await axios.post("/api/workers", workerDetails);

      if (response.status === 200) return response.data;

      else throw new Error(response.statusText);
    } catch (error) {
      throw error;
    }
  }
};

export const CbeApi = Object.freeze(new Api());;
