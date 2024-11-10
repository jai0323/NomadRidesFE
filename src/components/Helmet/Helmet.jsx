import React from "react";

const Helmet = (props) => {
  document.title = "Nomad Riders - " + props.title;
  return <div className="w-100">{props.children}</div>;
};

export default Helmet;
