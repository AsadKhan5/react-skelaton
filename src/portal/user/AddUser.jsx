import React, { useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import { addUser } from "../../utils/APIs";

const AddUser = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await addUser(formData);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("user created success");
      console.log("User added successfully!");
    } catch (error) {
      alert(error);
      console.error("Error adding user:", error);
    }
  };

  return (
    <>
      <div className="flex gap-1 p-2">
        <HiUserAdd className="text-2xl" />
        <h2 className="font-semibold text-xl">Add User</h2>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center h-[calc(100vh-100px)]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-full max-w-md md:shadow-lg p-6"
        >
          <div>
            <label htmlFor="userName" className="block mb-1">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Enter User Name"
              value={formData.userName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Enter user Email"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter user password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            >
              <option value="">Select user Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              {/* <option value="super-admin">Super Admin</option> */}
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-sm md:w-1/5 btn-secondary text-white rounded-md"
          >
            Add <HiUserAdd />
          </button>
        </form>
      </div>
    </>
  );
};

export default AddUser;
