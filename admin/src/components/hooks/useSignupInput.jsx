import React from "react";
import { signupActions } from "../Login-Signup/Login-Signup";
import axios from "axios";

const signupInitialState = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  passwordVisible: false,
  confirmPasswordVisible: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case signupActions.NAME:
      return {
        ...state,
        name: action.payload,
      };
    case signupActions.EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case signupActions.PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case signupActions.PHONE:
      return {
        ...state,
        phone: action.payload,
      };
    case signupActions.CONFIRM_PASSWORD:
      return {
        ...state,
        confirmPassword: action.payload,
      };
    case signupActions.TOGGLE_PASSWORD_VISIBILITY:
      return {
        ...state,
        passwordVisible: !state.passwordVisible,
      };
    case signupActions.TOGGLE_CONFIRM_PASSWORD_VISIBILITY:
      return {
        ...state,
        confirmPasswordVisible: !state.confirmPasswordVisible,
      };
    case signupActions.RESET:
      return signupInitialState;
    default:
      return state;
  }
};

export default function (togglePage) {
  const [signupState, signupDispatch] = React.useReducer(
    reducer,
    signupInitialState
  );
  const [signupMessage, setSignupMessage] = React.useState({
    message: "",
    status: 0,
  });

  const passwordMatch =
    signupState.password.trim() === signupState.confirmPassword.trim();

  const wasPasswordTouch =
    signupState.password.trim().length > 0 &&
    signupState.confirmPassword.trim().length > 0;

  const ispasswordValid =
    passwordMatch && signupState.password.trim().length >= 8;

  const isFormValid = React.useMemo(() => {
    return signupState.phone.trim().length === 10 && ispasswordValid;
  }, [signupState]);

  const signupHandler = (event) => {
    event.preventDefault();
    if (isFormValid) {
      axios
        .post("http://localhost:8230/signup", {
          name: signupState.name.trim(),
          email: signupState.email.trim(),
          phone: signupState.phone.trim(),
          password: signupState.password.trim(),
        })
        .then(
          (response) => {
            if (response.status === 201) {
              console.log(response.data.message);
              setSignupMessage({
                message: response.data.message + "! Redirecting back...",
                status: 201,
              });
            }
            setTimeout(() => {
              signupDispatch({ type: signupActions.RESET });
              setSignupMessage({
                message: "",
                status: 0,
              });
              togglePage();
            }, 2000);
          },
          (error) => {
            setSignupMessage({
              message: error.response.data.error,
              status: 422,
            });
          }
        );
    } else {
      setSignupMessage({
        message: "Please fill all the fields correctly",
        status: 422,
      });
    }
  };

  return {
    signupState,
    signupDispatch,
    passwordMatch,
    wasPasswordTouch,
    ispasswordValid,
    signupHandler,
    signupMessage,
    setSignupMessage,
  };
}
