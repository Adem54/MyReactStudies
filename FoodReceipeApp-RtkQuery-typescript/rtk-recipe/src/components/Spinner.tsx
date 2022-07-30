import React from "react";
import { MDBSpinner } from "mdb-react-ui-kit";
const styleSpinner = { width: "3rem", height: "3rem" };
const Spinner = () => {
  return (
    <div className="text-center mt-5">
      <MDBSpinner grow className="mt-2" style={styleSpinner}>
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    </div>
  );
};

export default Spinner;
