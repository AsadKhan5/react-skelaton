// Retrieves all SIMs based on the provided parameters
const BASE_URL = "http://localhost:5000/hr-management";

export const getAllEmployee = async (params) => {
  return await fetch(`${BASE_URL}/emp/all-employee`, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  });
};

// Logs in the user using provided credentials
export const login = async (data) => {
  return await fetch(`${BASE_URL}/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};


export const addUser = async (formData) => {
  const token = localStorage.getItem("user-token");
  return await fetch("http://localhost:8085/ene/sim/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
};
