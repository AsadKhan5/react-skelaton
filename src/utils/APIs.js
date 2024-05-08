// Retrieves all SIMs based on the provided parameters
export const getAllSims = async (params) => {
  const token = localStorage.getItem("user-token");
  return await fetch(`http://localhost:8085/ene/sim/All/?${params}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Logs in the user using provided credentials
export const login = async (data) => {
  return await fetch("http://localhost:8085/ene/sim/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// Retrieves all industry names
export const getAllIndustryNames = async () => {
  return await fetch("http://localhost:8085/ene/industry/get-industries");
};

// Creates a new SIM entry using the provided form data
export const createSim = async (formData) => {
  return await fetch("http://localhost:8085/ene/sim/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

// create sims in bulk
export const createSims = async (formData) => {
  return await fetch("http://localhost:8085/ene/sim/create-bulk", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const addIndustry = async (formData) => {
  return await fetch("http://localhost:8085/ene/industry/create-industry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
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
