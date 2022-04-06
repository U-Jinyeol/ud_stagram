import React from "react";
import { useSelector } from "react-redux";
import { apiKey } from "./firebase";

const Permit = (props) => {
  const isLogin = useSelector((state) => state.user.user);
  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey);

  if (isSession && isLogin) {
    return <>{props.children}</>;
  }

  return null;
};

export default Permit;
