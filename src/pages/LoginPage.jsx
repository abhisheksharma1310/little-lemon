import React from "react";
import { useLocation } from "react-router-dom";

import toast from "react-hot-toast";
import Login from "../components/Login";

const LoginPage = () => {

  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];
  const invalidPath = currentPath !== "login";

  const checkUser = () => {
    const tid = toast.error(`You can not access ${currentPath} page. please login.`);
    setTimeout(() => toast.dismiss(tid), 2000);
  };

  if(invalidPath) checkUser();

  return (
    <div className="page">
      <header className="page-header">
        <h2>Welcome</h2>
      </header>
      <Login />
    </div>
  );
};

export default LoginPage;
