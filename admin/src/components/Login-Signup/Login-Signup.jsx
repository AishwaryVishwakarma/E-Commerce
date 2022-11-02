import React from "react";
import { MdAlternateEmail } from "react-icons/md";
import { AiFillEyeInvisible, AiFillEye, AiOutlinePhone } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import useLoginInput from "../hooks/useLoginInput";
import useSignupInput from "../hooks/useSignupInput";
import classes from "./Login-Signup.module.css";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export const loginActions = {
  EMAIL: "EMAIL",
  PASSWORD: "PASSWORD",
  TOGGLE_PASSWORD_VISIBILITY: "TOGGLE_PASSWORD_VISIBILITY",
  RESET: "RESET",
};

export const signupActions = {
  NAME: "NAME",
  EMAIL: "EMAIL",
  PHONE: "PHONE",
  PASSWORD: "PASSWORD",
  CONFIRM_PASSWORD: "CONFIRM_PASSWORD",
  TOGGLE_PASSWORD_VISIBILITY: "TOGGLE_PASSWORD_VISIBILITY",
  TOGGLE_CONFIRM_PASSWORD_VISIBILITY: "TOGGLE_CONFIRM_PASSWORD_VISIBILITY",
  RESET: "RESET",
};

const Login_Signup = () => {
  // console.log("Login_Signup");

  const navigate = useNavigate();

  const [onLoginPage, setOnLogin] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  function togglePage() {
    setOnLogin((prev) => !prev);
    setSignupMessage({
      message: "",
      status: 0,
    });
    setLoginMessage({
      message: "",
      status: 0,
    });
  }

  const {
    loginState,
    loginDispatch,
    loginHandler,
    loginMessage,
    setLoginMessage,
  } = useLoginInput(setProgress);

  const {
    signupState,
    signupDispatch,
    passwordMatch,
    wasPasswordTouch,
    ispasswordValid,
    signupHandler,
    signupMessage,
    setSignupMessage,
  } = useSignupInput(togglePage, setProgress);

  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/home");
    }
  }, []);

  const loginContent = (
    <section className={classes.login__form}>
      <h1>Admin</h1>
      <h2>Login</h2>
      <form onSubmit={loginHandler}>
        <label htmlFor="email">Email</label>
        <div className={classes.input__field}>
          <input
            type="email"
            placeholder="email"
            required
            value={loginState.email}
            onChange={(event) =>
              loginDispatch({
                type: loginActions.EMAIL,
                payload: event.target.value,
              })
            }
            autoComplete="on"
          />
          <MdAlternateEmail />
        </div>
        <label htmlFor="password">Password</label>
        <div className={classes.input__field}>
          <input
            type={loginState.passwordVisible ? "text" : "password"}
            placeholder="password"
            required
            value={loginState.password}
            onChange={(event) =>
              loginDispatch({
                type: loginActions.PASSWORD,
                payload: event.target.value,
              })
            }
            autoComplete="on"
          />
          {loginState.passwordVisible ? (
            <AiFillEyeInvisible
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                loginDispatch({
                  type: loginActions.TOGGLE_PASSWORD_VISIBILITY,
                });
              }}
            />
          ) : (
            <AiFillEye
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                loginDispatch({
                  type: loginActions.TOGGLE_PASSWORD_VISIBILITY,
                });
              }}
            />
          )}
        </div>
        {loginMessage.status === 201 && (
          <p className={classes.success__message}>{loginMessage.message}</p>
        )}
        {loginMessage.status === 422 && (
          <p className={classes.error__message}>{loginMessage.message}</p>
        )}
        <div className={classes.buttons}>
          <button>Login</button>
          <button
            type="button"
            onClick={() => {
              loginDispatch({ type: loginActions.RESET });
              togglePage();
            }}
          >
            Sign Up?
          </button>
        </div>
      </form>
    </section>
  );

  const signupContent = (
    <section className={classes.signup__form}>
      <h1>Admin</h1>
      <h2>Sign Up</h2>
      <form onSubmit={signupHandler}>
        <label htmlFor="name">Name</label>
        <div className={classes.input__field}>
          <input
            type="text"
            placeholder="name"
            value={signupState.name}
            onChange={(event) => {
              signupDispatch({
                type: signupActions.NAME,
                payload: event.target.value,
              });
            }}
            required
          />
          <BiUser />
        </div>
        <label htmlFor="email">Email</label>
        <div className={classes.input__field}>
          <input
            type="email"
            placeholder="email"
            value={signupState.email}
            onChange={(event) => {
              signupDispatch({
                type: signupActions.EMAIL,
                payload: event.target.value,
              });
            }}
            required
          />
          <MdAlternateEmail />
        </div>
        <label htmlFor="phone">Phone No.</label>
        <div className={classes.input__field}>
          <input
            type="text"
            placeholder="phone no."
            value={signupState.phone}
            onChange={(event) => {
              signupDispatch({
                type: signupActions.PHONE,
                payload: event.target.value,
              });
            }}
            required
          />
          <AiOutlinePhone />
        </div>
        <label htmlFor="password">
          Password{" "}
          <span
            style={{
              color: "rgb(158, 158, 158)",
              fontSize: "0.8rem",
              fontWeight: "normal",
            }}
          >
            (must be atleast 8 characters long)
          </span>
        </label>
        <div className={classes.input__field}>
          <input
            type={signupState.passwordVisible ? "text" : "password"}
            autoComplete="off"
            placeholder="password"
            value={signupState.password}
            onChange={(event) => {
              signupDispatch({
                type: signupActions.PASSWORD,
                payload: event.target.value,
              });
            }}
            required
          />
          {signupState.passwordVisible ? (
            <AiFillEyeInvisible
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                signupDispatch({
                  type: signupActions.TOGGLE_PASSWORD_VISIBILITY,
                });
              }}
            />
          ) : (
            <AiFillEye
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                signupDispatch({
                  type: signupActions.TOGGLE_PASSWORD_VISIBILITY,
                });
              }}
            />
          )}
        </div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className={classes.input__field}>
          <input
            type={signupState.confirmPasswordVisible ? "text" : "password"}
            autoComplete="off"
            placeholder="confirm Password"
            value={signupState.confirmPassword}
            onChange={(event) => {
              signupDispatch({
                type: signupActions.CONFIRM_PASSWORD,
                payload: event.target.value,
              });
            }}
            required
          />
          {signupState.confirmPasswordVisible ? (
            <AiFillEyeInvisible
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                signupDispatch({
                  type: signupActions.TOGGLE_CONFIRM_PASSWORD_VISIBILITY,
                });
              }}
            />
          ) : (
            <AiFillEye
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                signupDispatch({
                  type: signupActions.TOGGLE_CONFIRM_PASSWORD_VISIBILITY,
                });
              }}
            />
          )}
        </div>
        {!passwordMatch && wasPasswordTouch && (
          <p className={classes.error__message}>Passwords do not match!</p>
        )}
        {!ispasswordValid && wasPasswordTouch && (
          <p className={classes.error__message}>
            Password must be atleast 8 characters long!
          </p>
        )}
        {signupMessage.status === 201 && (
          <p className={classes.success__message}>{signupMessage.message}</p>
        )}
        {signupMessage.status === 422 && (
          <p className={classes.error__message}>{signupMessage.message}</p>
        )}
        <div className={classes.buttons}>
          <button>Sign Up</button>
          <button
            type="button"
            onClick={() => {
              signupDispatch({ type: signupActions.RESET });
              setOnLogin(true);
            }}
          >
            Go Back
          </button>
        </div>
      </form>
    </section>
  );

  return (
    <>
      <LoadingBar
        color="#1a55e3"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <main className={classes.container}>
        {onLoginPage ? loginContent : signupContent}
      </main>
    </>
  );
};

export default Login_Signup;
