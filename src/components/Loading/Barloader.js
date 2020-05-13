import React from "react";
import { BarLoader } from "react-spinners";

const Barloader = ({ ...props }) => (
  <BarLoader size={5} width="100%" color={"#46b3e6"} {...props} />
);

export default Barloader;
