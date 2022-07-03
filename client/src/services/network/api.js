import axios from "axios";

export const Api = function () { };

Api.prototype.checkSession = async function () {
  const response = await axios.get("/api");
  if (response.status === 200) return response.data;
  else throw new Error(response.statusText);
};

Api.prototype.register = async function (userInfo) {
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

Api.prototype.loginUser = async function (userCredential) {
  const response = await axios.post("/api/auth", {
    username: userCredential.username,
    password: userCredential.password,
  });

  if (response.status === 200) return response.data;
  else throw new Error(response.statusText);
};

Api.prototype.logout = async function () {
  const response = await axios.get("/api/auth/logout");

  if (response.status === 200) return true;

  return false;
};

Api.prototype.getUsersList = async function (userId) {
  const response = await axios.post("/api/chat/getUsers", {
    self: userId,
  });

  if (response.status === 200) {
    return response.data;
  } else throw new Error(response.statusText);
};

Api.prototype.getMessages = async function (userId, receiverId) {
  const response = await axios.post("/api/chat/getMessages", {
    self: userId,
    others: receiverId,
  });

  if (response.status === 200) {
    return response.data;
  } else throw new Error(response.statusText);
};

Api.prototype.sendMessage = async function (chatObj) {
  const response = await axios.post("/api/chat/message", {
    senderId: chatObj.senderId,
    receiverId: chatObj.receiverId,
    content: chatObj.content,
  });

  if (response.status === 200) {
    return response.data;
  } else throw new Error(response.statusText);
};