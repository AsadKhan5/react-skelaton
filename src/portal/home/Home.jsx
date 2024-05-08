import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { MdManageSearch } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { getAllSims } from "../../utils/APIs";
import { PiTableDuotone } from "react-icons/pi";
import { TbTableDown } from "react-icons/tb";

const Home = () => {
  const [simData, setSimData] = useState([]);
  const [filteredSimData, setFilteredSimData] = useState([]);
  const [searchParam1, setSearchParam1] = useState("");
  // const [searchParam2, setSearchParam2] = useState("");
  const [searchValue1, setSearchValue1] = useState("");
  // const [searchValue2, setSearchValue2] = useState("");
  const [paginationParams, setPaginationParams] = useState({});
  const [page, setPage] = useState("1");
  const [count, setCount] = useState("20");
  const [totalCount, setTotalCount] = useState(0);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          ...paginationParams,
          page,
          count,
        });
        const response = await getAllSims(params);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSimData(data.sims);
        setFilteredSimData(data.sims);
        setTotalCount(data.count);
        setMaxPage(Math.ceil(data.count / parseInt(count)));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [paginationParams, page, count]);

  useEffect(() => {
    // Filter data based on selected search parameters and values
    const filteredData = simData.filter((sim) => {
      const matchSearchParam1 =
        !searchParam1 ||
        sim[searchParam1]?.toLowerCase().includes(searchValue1.toLowerCase());
      // const matchSearchParam2 =
      //   !searchParam2 ||
      //   sim[searchParam2]?.toLowerCase().includes(searchValue2.toLowerCase());
      return matchSearchParam1;
    });

    setFilteredSimData(filteredData);
  }, [simData, searchParam1, searchValue1]);

  const handlePaginationChange = (key, value) => {
    setPaginationParams({ ...paginationParams, [key]: value });
  };

  const downloadTable = () => {
    // Convert table data to Excel file format
    const ws = XLSX.utils.json_to_sheet(filteredSimData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Generate a download link for the Excel file
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link element and trigger a click event to initiate the download
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = "sim_data.xlsx";
    a.click();

    // Clean up
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 100);
  };

  return (
    <div className="flex flex-col gap-10 p-2">
      <div className="flex justify-between">
        <h1 className="flex gap-1font-semibold text-xl">
          <PiTableDuotone className="text-3xl" />
          Sim Data Table
        </h1>
        <button
          className="btn btn-sm btn-secondary mx-4"
          onClick={downloadTable}
        >
          Download <TbTableDown className="text-xl" />
        </button>
      </div>
      <div className="md:flex gap-2">
        {/* pagination  */}
        <div className="flex join fixed right-2 md:right-4">
          <select
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="p-2 border text-xs input-sm border-gray-300 rounded-l-md"
          >
            <option value="20">Show 20</option>
            <option value="50">Show 50</option>
            <option value="100">Show 100</option>
          </select>

          {/* page number  */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <div
                className="text-gray-500 cursor-pointer"
                onClick={() => setPage(Math.max(1, parseInt(page) - 1))}
              >
                <IoIosArrowBack />
              </div>
            </div>
            <select
              value={page}
              onChange={(e) => setPage(e.target.value)}
              className="border input-sm border-gray-300 rounded-r-md appearance-none"
            >
              <option disabled hidden>
                Page {page}
              </option>
              {Array.from({ length: maxPage }, (_, i) => (
                <option key={i + 1} value={i + 1} className="text-center">
                  {i + 1}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <div
                className="text-gray-500 cursor-pointer"
                onClick={() => setPage(Math.min(maxPage, parseInt(page) + 1))}
              >
                <IoIosArrowForward />
              </div>
            </div>
          </div>
        </div>
        <div className="flex join-item">
          <select
            value={searchParam1}
            onChange={(e) => setSearchParam1(e.target.value)}
            className="search-select border rounded-l-md p-1"
          >
            <option value="">Search Type</option>
            <option value="ICCID">ICCID</option>
            <option value="IMSI">IMSI</option>
            <option value="contactPersonName">Client Name</option>
            <option value="connectionType">Connection Type</option>
            <option value="location">Location</option>
            <option value="companyName">Company Name</option>
          </select>
          <input
            type="text"
            placeholder="Enter search value"
            value={searchValue1}
            onChange={(e) => setSearchValue1(e.target.value)}
            className="search-input border"
          />
          <button className="btn btn-secondary rounded-none rounded-r-md cursor-none">
            <MdManageSearch className="text-3xl" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-200px)]">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>SNo</th>
              <th>ICCID</th>
              <th>IMSI</th>
              <th>Client Name</th>
              <th>Connection Type</th>
              <th>Company Name</th>
              <th>Date</th>
              <th>Device Id</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredSimData.map((sim, index) => (
              <tr key={index} className="font-normal">
                <th>{index + 1}</th>
                <td>{sim.ICCID}</td>
                <td>{sim.IMSI}</td>
                <td>{sim.contactPersonName}</td>
                <td>{sim.connectionType}</td>
                <td>{sim.companyName}</td>
                <td>{sim.date}</td>
                <td>{sim.deviceId}</td>
                <td>{`${sim.state ? sim.state + ", " : ""}${
                  sim.city ? sim.city + ", " : ""
                }${sim.area ? sim.area : ""}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
