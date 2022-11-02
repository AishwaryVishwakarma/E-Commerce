import React from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const { component: Component, ...rest } = props;
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setIsLoggedIn(true);
    } else {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, []);
  return (
    <div>
      {!isLoggedIn ? (
        <div
          style={{
            textAlign: "center",
            fontSize: "2rem",
            marginTop: "2rem",
          }}
        >
          Not Authorized, Redirecting to Login Page...
        </div>
      ) : (
        <Component {...rest} />
      )}
    </div>
  );
};

export default Protected;
