export const Actions = {
  Theme: {
    changeTheme: "theme/changeTheme",
  },
  Auths: {
    login: "auths/login",
    logout: "auths/logout",
    register: "auths/register",
    checkSession: "auth/checkSession",
    error: "auths/error",
    removeError: "auths/removeError",
  },
  Chats: {
    getUsers: "chats/getUsers",
    getMessages: "chats/getMessages",
    sendMessage: "chats/sendMessage",
    updateMessage: "chats/updateMessage",
    error: "chats/error",
  },
  Users: {
    updateOnlineUsers: "chats/updateOnlineUsers",
  },
};