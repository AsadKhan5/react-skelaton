import React, { useState, useRef } from "react";
import { FaFileExcel } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import * as XLSX from "xlsx";
import { createSims } from "../../utils/APIs";

const ExcelFileUpload = () => {
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [simData, setSimData] = useState(null);

  const handleFileUpload = (e) => {
    setProcessing(true);
    setLoading(true); // Start loading immediately after processing begins
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target.result;
        const binaryString = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(binaryString, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        // Validate if the required columns exist
        if (
          !data.some(
            (row) =>
              "IMSI" in row &&
              "contactPersonName" in row &&
              "companyName" in row &&
              "deviceId" in row
          )
        ) {
          alert(
            "Uploaded file is missing required columns (IMSI, contactPerson, companyName, deviceId)."
          );
          return;
        }

        setSimData(data);
      } catch (error) {
        console.error("Error reading file:", error);
        alert("An error occurred while processing the file.");
      } finally {
        setProcessing(false);
        setLoading(false);
      }
    };

    reader.onerror = (event) => {
      console.error("File could not be read:", event.target.error);
      alert("An error occurred while reading the file.");
      setProcessing(false);
      setLoading(false);
    };

    reader.readAsArrayBuffer(file); // Read the file content as array buffer
  };

  const downloadTemplate = () => {
    const templateData = [
      {
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
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template"); // Add the worksheet to the workbook

    XLSX.writeFile(workbook, "SimData_template.xlsx"); // Trigger the download
  };

  const dataSubmitHandler = async () => {
    // setLoading(true);
    try {
      console.log(simData);
      const response = await createSims(simData);
      console.log(response);
      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        alert(result.msg);
        return;
      }
      alert("Created successfully!");
    } catch (error) {
      console.error("Error creating sims:", error);
      alert("Oops! Some error occurred.");
    } finally {
      setLoading(false); // Set loading state to false after the request is completed
    }
  };

  return (
    <div>
      <h3 className="font-bold text-xl p-2 flex">
        <FaFileExcel className="text-2xl text-green-700" />
        Upload Excel File
      </h3>
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <div className="flex flex-col gap-6 md:shadow-xl md:w-2/5 p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold">Mandatory Fields:</p>
              <ul className="list-disc pl-6 text-xs">
                <li>IMSI</li>
                <li>Device Id</li>
                <li>contact person Name</li>
                <li>Company Name</li>
              </ul>
            </div>
            <div
              className="flex gap-1 text-sm cursor-pointer"
              onClick={downloadTemplate}
            >
              <p className="text-sm font-medium">Download Template </p>
              <FaFileDownload className="text-xl text-green-700" />
            </div>
          </div>
          <label className="flex gap-1 text-sm font-semibold">
            Upload your Excel file here
          </label>
          <input
            ref={fileInputRef}
            type="file"
            className="file-input file-input-bordered file-input-secondary w-full"
            onChange={handleFileUpload}
            disabled={processing}
          />
          <button
            className="btn btn-sm md:w-1/4 btn-secondary text-white text-sm font-semibold rounded-md mt-4 p-1"
            onClick={processing ? null : dataSubmitHandler}
            disabled={processing || loading}
          >
            <div className="flex items-center">
              {processing ? "Processing..." : "Upload"}
              {!processing && <FaFileExcel className="text-md ml-1" />}
            </div>
          </button>
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default ExcelFileUpload;
