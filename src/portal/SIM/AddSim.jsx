import React, { useState, useEffect } from "react";
import Select from "react-select";
import { RiSimCard2Line } from "react-icons/ri";
import { createSim, getAllIndustryNames } from "../../utils/APIs";

const AddSim = () => {
  const [formData, setFormData] = useState({
    ICCID: "",
    IMSI: "",
    contactPersonName: "",
    date: "",
    connectionType: "",
    companyName: "",
    deviceId: "",
    state: "", // New state field
    city: "",
    area: "",
  });

  const [companyOptions, setCompanyOptions] = useState([]);
  const [indianStatesAndUTs, setIndianStatesAndUTs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchCompanyNames();
    fetchIndianStatesAndUTs(); // Fetch Indian states and union territories
  }, []);

  const fetchCompanyNames = async () => {
    try {
      const response = await getAllIndustryNames();
      if (!response.ok) {
        throw new Error("Failed to fetch company names");
      }
      const data = await response.json();
      console.log(data);
      // Convert the array of company names into an array of options for react-select
      const options = data.map((company) => ({
        label: company,
        value: company,
      }));
      setCompanyOptions(options);
    } catch (error) {
      console.error("Error fetching company names:", error);
    }
  };

  const fetchIndianStatesAndUTs = () => {
    // Array of Indian states and union territories
    const indianStatesAndUTs = [
      "Andaman and Nicobar Islands",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chandigarh",
      "Chhattisgarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Ladakh",
      "Lakshadweep",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Puducherry",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ];

    // Convert the array of strings into an array of objects with label and value properties
    const options = indianStatesAndUTs.map((state) => ({
      label: state,
      value: state,
    }));
    setIndianStatesAndUTs(options);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createSim(formData);
      const result = await response.json();
      if (!response.ok) {
        alert(result.msg);
        throw new Error("Network response was not ok");
      }
      alert("New SIM created successfully");
      console.log("SIM added successfully!");
    } catch (error) {
      console.error("Error adding SIM:", error);
    }
  };

  return (
    <>
      <h2 className="font-semibold text-xl p-2 flex">
        <RiSimCard2Line className="text-2xl" /> Add SIM
      </h2>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full md:max-w-2xl md:shadow-lg px-6 py-4"
        >
          {/* IMSI id and ICCID */}
          <div className="flex gap-6 justify-center">
            <div className="w-full">
              <label htmlFor="ICCID">ICCID</label>
              <input
                type="text"
                id="ICCID"
                name="ICCID"
                value={formData.ICCID}
                onChange={handleChange}
                placeholder="Enter Sim ICCID"
                className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
              />
            </div>
            <div className="w-full">
              <label htmlFor="IMSI">IMSI *</label>
              <input
                type="text"
                id="IMSI"
                name="IMSI"
                value={formData.IMSI}
                onChange={handleChange}
                placeholder="Enter 15 digits IMSI number"
                className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
                required
              />
            </div>
          </div>

          {/* Company name and connection type */}
          <div className="flex gap-6 justify-center">
            <div className="w-full">
              <label htmlFor="companyName">Company Name *</label>
              <Select
                options={companyOptions}
                value={
                  formData.companyName
                    ? {
                        label: formData.companyName,
                        value: formData.companyName,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    companyName: selectedOption ? selectedOption.value : "", // Update companyName with the selected value
                  }))
                }
                placeholder="Select Company Name"
                isSearchable
                className="w-full mt-1"
              />
            </div>
            <div className="w-full">
              <label htmlFor="connectionType">Connection Type</label>
              <Select
                id="connectionType"
                name="connectionType"
                placeholder="Select Connection Type"
                value={
                  formData.connectionType
                    ? {
                        label: formData.connectionType,
                        value: formData.connectionType,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    connectionType: selectedOption
                      ? selectedOption.value
                      : null,
                  }))
                }
                options={[
                  { label: "Jio", value: "Jio" },
                  { label: "Airtel", value: "Airtel" },
                ]}
                className="mt-1"
              />
            </div>
          </div>

          {/* device id */}
          <div className="flex gap-6 justify-center">
            <div className="w-full">
              <label htmlFor="deviceId">Device Id *</label>
              <input
                id="deviceId"
                name="deviceId"
                placeholder="Select Data deviceId"
                value={formData.deviceId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
                required
              />
            </div>

            <div className="w-full">
              <label htmlFor="state">State</label>
              <Select
                options={indianStatesAndUTs}
                value={
                  formData.state
                    ? { label: formData.state, value: formData.state }
                    : null
                }
                onChange={(selectedOption) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    state: selectedOption.value,
                  }))
                }
                placeholder="Select State"
                isSearchable
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex gap-6 justify-center">
            <div className="w-full">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter City"
                className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
              />
            </div>
            <div className="w-full">
              <label htmlFor="area">Area</label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Enter Area"
                className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-full">
              <label htmlFor="contactPersonName">Contact Person *</label>
              <input
                type="text"
                id="contactPersonName"
                name="contactPersonName"
                value={formData.contactPersonName}
                onChange={handleChange}
                placeholder="Enter Contact person Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Enter Email Address"
                className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-sm btn-secondary text-white font-semibold rounded-md"
          >
            Add <RiSimCard2Line className="text-xl" />
          </button>
        </form>
      </div>
    </>
  );
};

export default AddSim;
