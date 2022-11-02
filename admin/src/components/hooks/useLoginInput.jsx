import React from "react";
import { loginActions } from "../Login-Signup/Login-Signup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const loginInitialState = {
  email: "",
  password: "",
  passwordVisible: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case loginActions.EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case loginActions.PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case loginActions.TOGGLE_PASSWORD_VISIBILITY:
      return {
        ...state,
        passwordVisible: !state.passwordVisible,
      };
    case loginActions.RESET:
      return loginInitialState;
    default:
      return state;
  }
};

export default function useLoginInput(setProgress) {
  const navigate = useNavigate();
  const [loginState, loginDispatch] = React.useReducer(
    reducer,
    loginInitialState
  );
  const [loginMessage, setLoginMessage] = React.useState({
    message: "",
    status: 0,
  });

  const isFormValid = React.useMemo(() => {
    return loginState.email.length > 0 && loginState.password.length > 0;
  }, [loginState]);

  function loginHandler(event) {
    event.preventDefault();
    if (isFormValid) {
      setProgress(30);
      axios
        .get("http://localhost:8230/login", {
          params: {
            email: loginState.email.trim().toLowerCase(),
            password: loginState.password.trim(),
          },
        })
        .then((response) => {
          setProgress(60);
          if (response.status === 201) {
            setLoginMessage({
              message: response.data.message,
              status: response.status,
            });
            setTimeout(() => {
              setLoginMessage({
                message: "",
                status: 0,
              });
              setProgress(100);
              localStorage.setItem("isLoggedIn", true);
              navigate("/home");
            }, 2000);
          }
        })
        .catch((error) => {
          setProgress(100);
          setLoginMessage({
            message: error.response.data.error,
            status: error.response.status,
          });
        });
    } else {
      setProgress(100);
      setLoginMessage({
        message: "Please fill all the fields",
        status: 422,
      });
    }
  }

  return {
    loginState,
    loginDispatch,
    loginHandler,
    loginMessage,
    setLoginMessage,
  };
}
