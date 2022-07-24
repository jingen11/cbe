import axios from "axios";

const Api = class {
  checkSession = async function () {
    const response = await axios.get("/api");
    if (response.status === 200) return response.data;
    else throw new Error(response.statusText);
  };

  register = async function (userInfo) {
    let response;

    if (userInfo instanceof FormData) {
      response = await axios.post("/api/auth/register", userInfo);
    } else {
      response = await axios.post("/api/auth/register", {
        name: userInfo.name,
        username: userInfo.username,
        password: userInfo.password,
        phoneNumber: userInfo.phoneNumber,
      });
    }

    if (response.status === 200) return response.data;
    else throw new Error(response.statusText);
  };

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

  logout = async function () {
    const response = await axios.get("/api/auth/logout");

    if (response.status === 200) return true;

    return false;
  };

  getUsersList = async function (userId) {
    const response = await axios.post("/api/chat/getUsers", {
      self: userId,
    });

    if (response.status === 200) {
      return response.data;
    } else throw new Error(response.statusText);
  };

  getMessages = async function (userId, receiverId) {
    const response = await axios.post("/api/chat/getMessages", {
      self: userId,
      others: receiverId,
    });

    if (response.status === 200) {
      return response.data;
    } else throw new Error(response.statusText);
  };

  sendMessage = async function (chatObj) {
    const response = await axios.post("/api/chat/message", {
      senderId: chatObj.senderId,
      receiverId: chatObj.receiverId,
      content: chatObj.content,
    });

    if (response.status === 200) {
      return response.data;
    } else throw new Error(response.statusText);
  };
};

export const CbeApi = Object.freeze(new Api());;
