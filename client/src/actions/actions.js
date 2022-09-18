export const Actions = {

  Auths: {
    login: "auths/login",
    logout: "auths/logout",
    register: "auths/register",
    checkSession: "auth/checkSession",
    clearMemory: "auth/clearMemory",
    error: "auths/error",
    removeError: "auths/removeError",
  },
  Workers: {
    get: "workers/get",
    add: "workers/add",
    edit: "workers/edit",
    remove: "workers/remove",
    error: "workers/error",
  },
  Vehicles: {
    get: "vehicles/get",
    add: "vehicles/add",
    edit: "vehicles/edit",
    remove: "vehicles/remove",
    error: "vehicles/error",
  },
  Attendances: {
    get: "attendances/get",
    add: "attendances/add",
    edit: "attendances/edit",
    remove: "attendances/remove",
    error: "attendances/error",
  }
};