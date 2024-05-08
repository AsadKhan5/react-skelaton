import React, { useState } from "react";
import { FaIndustry } from "react-icons/fa6";
import { addIndustry } from "../../utils/APIs";

const AddIndustry = () => {
  const [formData, setFormData] = useState({
    industryName: "",
    contactEmail: "",
    contactNumber: "",
    owner: "",
    remarks: "",
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
      const response = await addIndustry(formData);
      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        alert("something went wrong Please try again ");
        throw new Error("Network response was not ok");
      }
      // Handle success
      alert("Industry created successfully!");
    } catch (error) {
      console.error("Error creating industry:", error);
    }
  };

  return (
    <>
      <div className="flex p-2 gap-1">
        <FaIndustry className="text-2xl" />
        <h2 className="font-semibold text-xl">Add Industry</h2>
      </div>
      <div className="flex flex-col  items-center justify-center h-[calc(100vh-100px)]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full max-w-md md:shadow-lg px-6 py-4"
        >
          <div className="">
            <label htmlFor="industryName" className="block mb-1">
              Industry Name *
            </label>
            <input
              type="text"
              id="industryName"
              name="industryName"
              value={formData.industryName}
              placeholder="Enter Industry Name"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div className="">
            <label htmlFor="contactEmail" className="block mb-1">
              Email
            </label>
            <input
              type="text"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="Enter Contact Person Email"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div className="">
            <label htmlFor="contactNumber" className="block mb-1">
              Contact *
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter contact person Phone number"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>
          <div className="">
            <label htmlFor="owner" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              required // Make owner required
              placeholder="Enter Contact person Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div className="">
            <label htmlFor="remarks" className="block mb-1">
              Remarks
            </label>
            <textarea
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Enter more Information about client"
            />
          </div>
          <button
            type="submit"
            className="btn btn-sm btn-secondary text-white rounded-md"
          >
            Create
            <FaIndustry className="text-lg" />
          </button>
        </form>
      </div>
    </>
  );
};

export default AddIndustry;
