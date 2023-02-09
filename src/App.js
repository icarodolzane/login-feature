import { login } from "./utils";
import "./index.css";
import { useRef, useState } from "react";
import icon from "./images/login.png";
import "animate.css";
const Swal = require("sweetalert2");

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isRequesting, setIsRequesting] = useState(true);
  const loadingComponent = useRef(null);
  
  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    validateFields();
  };

  const validateFields = () => {
    const regex = /\S+@\S+\.\S+/;
    const isValidEmail = regex.test(email);
    const isValidPassword = password.length || password.length > 6;
    const isFieldsValid = isValidEmail && isValidPassword;
    setIsDisabled(isFieldsValid);
  };

  const loading = (state) => {
    console.log(state);
    if (state){
      loadingComponent.current.style.display = 'block';
    }
    else {
      loadingComponent.current.style.display = 'none';
    }

  }

  const submitHandler = async () => {
    const values = { email: email, password: password };
    loading(true);
    try {     
      await login(values);
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Validation succeeded.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
            
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } finally {
      setIsRequesting(false);   
    }
    loading(false);
  };

  return (
    <div className="wrapper">
      <div
        className="spinner is-animating"
        ref={ loadingComponent }
      />
      <div className="login-form">
        <div className="login-title">
          <h1>Login Form </h1>
          <img
            className="animate__animated animate__flash"
            src={icon}
            alt="icon-login"
          />
        </div>
        <div className="row">
          <label htmlFor={"email"}>Email</label>
          <input
            id={"email"}
            type={"email"}
            autoComplete="off"
            name="email"
            value={email}
            onChange={onChangeHandler}
          />
        </div>
        <div className="row">
          <label htmlFor={"password"}>Password</label>
          <input
            id={"password"}
            type={"password"}
            name="password"
            value={password}
            onChange={onChangeHandler}
          />
        </div>

        <div className="button">
          <button onClick={submitHandler} disabled={isDisabled && isRequesting}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
