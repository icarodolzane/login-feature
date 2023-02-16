import { loginMoch } from "./utils";
import "./index.css";
import { useRef, useState } from "react";
import icon from "./images/login.png";
import "animate.css";
const Swal = require("sweetalert2");


export default function LoginForm() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  // const [isDisabled, setIsDisabled] = useState({
  //   isDisabled: true,
  // });
  const [isRequesting, setIsRequesting] = useState(true);
  const loadingComponent = useRef(null);
  const regEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  const isFilled = !!(regEmail.test(login.email) && login.password.length > 5);
 
  const handleChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });    
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
    const values = { email: login.email, password: login.password };
    loading(true);
    try {     
      await loginMoch(values);
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
            placeholder="E-mail"
            name="email"
            value={login.email}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label htmlFor={"password"}>Password</label>
          <input
            id={"password"}
            type={"password"}
            name="password"
            placeholder="******"
            value={login.password}
            onChange={handleChange}
          />
        </div>

        <div className="button">
          <button
            type="button"
            onClick={submitHandler}
            disabled={ !isFilled && isRequesting}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
