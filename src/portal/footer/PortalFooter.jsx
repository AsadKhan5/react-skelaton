import React from "react";
import { Container } from "../../utils/conntainer";
const PortalFooter = () => {
  return (
    <React.Fragment>
      <footer className="h-28 bg-light border-top py-3 fixed bottom-1 bg-slate-500 w-full">
        <Container>&copy; React Auth Demo - 2022 Footer</Container>
      </footer>
    </React.Fragment>
  );
};
export default PortalFooter;
