import React, { useEffect, useState } from "react";
import { getAllEmployee } from "../../utils/APIs";

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllEmployee();
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-10 p-2">
      <h1>Home page</h1>
    </div>
  );
};

export default Home;
