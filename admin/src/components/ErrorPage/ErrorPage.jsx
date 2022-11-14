import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "2rem",
        marginTop: "2rem",
      }}
    >
      404 Not Found, Redirecting back...
    </div>
  );
};

export default ErrorPage;
