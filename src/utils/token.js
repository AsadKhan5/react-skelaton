// src/utils/auth.js
const getUserToken = () => {
  const userToken = localStorage.getItem("zYp3qCT8zehpy0qb0s2MXsRZtwFw9Y8z");
  return userToken;
};

export default getUserToken;
