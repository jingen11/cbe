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
      const response = await axios.post("/api/workers", workerDetails);

      if (response.status === 200) return response.data;

      else throw new Error(response.statusText);
    } catch (error) {
      throw error;
    }
  }

  editWorker = async function (workerDetails) {
    try {
      let response;

      if (workerDetails instanceof FormData)
        response = await axios.patch(`/api/workers/${workerDetails.get('id')}`, workerDetails)

      else
        response = await axios.patch(`/api/workers/${workerDetails.id}`, workerDetails);

      if (response.status === 200) return response.data;

      else throw new Error(response.statusText);
    } catch (error) {
      throw error;
    }
  }

  removeWorker = async function (workerId) {
    try {
      const response = await axios.delete(`/api/workers/${workerId}`);

      if (response.status === 200) return response.data;

      else throw new Error(response.statusText);
    } catch (error) {
      throw error;
    }
  }

  getVehicles = async function () {
    try {
      const response = await axios.get("/api/vehicles");

      if (response.status === 200) return response.data;

      else throw new Error(response.statusText);
    } catch (error) {
      throw error;
    }
  }

  addVehicle = async function (vehicleDetails) {
    try {
      const response = await axios.post("/api/vehicles", vehicleDetails);

      if (response.status === 200) return response.data;

      else throw new Error(response.statusText);
    } catch (error) {
      throw error;
    }
  }

  editVehicle = async function (vehicleDetails) {
    try {
      const response = await axios.patch(`/api/vehicles/${vehicleDetails.id}`, vehicleDetails);

      if (response.status === 200) return response.data;

      else throw new Error(response.statusText);
    } catch (error) {
      throw error;
    }
  }

  removeVehicle = async function (vehicleId) {
    try {
      const response = await axios.delete(`/api/vehicles/${vehicleId}`);

      if (response.status === 200) return response.data;

      else throw new Error(response.statusText);
    } catch (error) {
      throw error;
    }
  }

  getAttendances = async function (dateRange, workerIds) {
    try {
      const response = await axios.get("/api/attendances", { params: { from: dateRange.from, to: dateRange.to, workerIds: workerIds } });

      if (response.status === 200) return response.data;

      else throw new Error(response.statusText);
    } catch (error) {
      throw error;
    }
  }

  addAttendances = async function (attendances) {
    try {
      const response = await axios.post("/api/attendances", { workers: attendances });

      if (response.status === 200) return response.data;

      else throw new Error(response.statusText);
    } catch (error) {
      throw error;
    }
  }
};

export const CbeApi = Object.freeze(new Api());;
