import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

const Progress = ({ value }) => {
  return <ProgressBar completed={value} />;
};

export default Progress;
