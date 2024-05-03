import React from "react";

const Container = ({ children }) => {
  return <div className="container mx-auto">{children}</div>;
};

const Navbar = ({ children }) => {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto">{children}</div>
    </nav>
  );
};

export { Container, Navbar };
