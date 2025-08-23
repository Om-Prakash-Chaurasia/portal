// export const getToken = () => localStorage.getItem("token");
// export const removeToken = () => localStorage.removeItem("token");

export const tokenService = {
  get: () => localStorage.getItem("token"),
  set: (token) => localStorage.setItem("token", token),
  remove: () => localStorage.removeItem("token"),
};
