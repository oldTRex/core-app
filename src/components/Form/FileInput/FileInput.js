import React from "react";

import "./style.css";

export default ({ label, ...props }) => {
  return (
    <div className="form-group files">
      <label>{label}</label>
      <input type="file" className="form-control" {...props} />
    </div>
  );
};
