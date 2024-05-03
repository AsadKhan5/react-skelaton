import React from "react";

const AuthNavbar = () => {
  return (
    <React.Fragment>
      <nav className="bg-gray-800">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-white font-bold text-lg">
                React Auth Demo
              </span>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default AuthNavbar;
