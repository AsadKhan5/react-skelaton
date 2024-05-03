import React from "react";

const Home = () => {
  return (
    <div className="py-5 h-[calc(100vh-190px)] shadow-sm bg-slate-300">
      <h3 className="m-10 text-center">Welcome Home Page.</h3>
      <a className="btn btn-secondary m-10" href="/query">
        Query Page
      </a>
    </div>
  );
};
export default Home;
