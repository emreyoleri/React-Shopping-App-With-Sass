import alertify from "alertifyjs";
import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();
  history.push("/");
  alertify.error("Page not found.", 1);
  return <></>;
};

export default NotFound;
