import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { createUser, loginStatus } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ToastConfirm from "../Toasts/ToastConfirm";

import "./styles.css";

const signUpSchema = yup.object({
  firstName: yup.string().required().min(3).max(20),
  lastName: yup.string().required().min(3).max(20),
  email: yup.string().email(),
  password: yup.string().min(8).max(20),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
});

const Login = () => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLogin) navigate("/");
  }, [user?.isLogin, navigate]);

  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);

  const schema = isLogin ? loginSchema : signUpSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleLoginSignup = () => {
    setIsLogin(!isLogin);
    // Reset the form values when toggling between login and signup
    setValue("email", "");
    setValue("password", "");
    if (!isLogin) {
      setValue("firstName", "");
      setValue("lastName", "");
      setValue("confirmPassword", "");
    }
  };

  const handleFormSubmit = (data) => {
    if (isLogin) {
      const { email, password } = data;
      handleLogin(email, password);
    } else {
      handleSignup(data);
    }
  };

  const handleLogin = (email, password) => {
    if (user.details?.email === email && user.details?.password === password) {
      dispatch(loginStatus(true));
      const tid = toast.success("Login successfull!");
      setTimeout(() => toast.dismiss(tid), 2000);
      navigate("/");
    } else if (
      user.details?.email === email &&
      user.details?.password !== password
    ) {
      const tid = toast.error("Password not matched. Enter correct password.");
      setTimeout(() => toast.dismiss(tid), 4000);
    } else {
      const tid = toast.error("Account not found for this email id.");
      setTimeout(() => toast.dismiss(tid), 4000);
    }
  };

  const handleSignup = (data) => {
    if (user.details?.email === data?.email) {
      const tid = toast.error(
        "Account allready exist for this email please login"
      );
      setTimeout(() => toast.dismiss(tid), 4000);
      toggleLoginSignup();
    } else if (user.details?.email && user.details?.email !== data?.email) {
      warnforNewSignup(data);
    } else {
      handleCreateAccount(data);
    }
  };

  const warnforNewSignup = (data) => {
    toast(
      ToastConfirm(
        "Are you sure to create new account, ",
        "your privous account and all its data will be deleted.",
        "This is because this app uses browser local storage as its primary storage.",
        () => {
          toggleLoginSignup();
        },
        () => {
          localStorage.clear();
          dispatch({ type: "CLEAR_DATA" });
          handleCreateAccount(data);
        }
      ),
      {
        duration: 60000,
      }
    );
  };

  const handleCreateAccount = (data) => {
    dispatch(createUser(data));
    const tid = toast.success("Signup successfull!");
    setTimeout(() => toast.dismiss(tid), 2000);
    dispatch(loginStatus(true));
    navigate("/");
  };

  const loginAsGuest = () => {
    const data = {
      firstName: "guest",
      lastName: "user",
      email: "guest@user.com",
      password: "1234567890",
      confirmPassword: "1234567890",
    };
    if (user.details?.email && user.details?.email !== data?.email) {
      warnforNewSignup(data);
    } else {
      handleCreateAccount(data);
    }
  };

  return (
    <div className="login-section">
      <div>
        <Toaster />
      </div>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form
        className="login-form"
        onSubmit={handleSubmit(handleFormSubmit)}
        method="post"
      >
        {!isLogin && (
          <>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              {...register("firstName")}
              className={`${errors.firstName ? "field-err" : ""}`}
            />
            {errors.firstName && (
              <span className="err">Enter valid first name.</span>
            )}

            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              {...register("lastName")}
              className={`${errors.lastName ? "field-err" : ""}`}
            />
            {errors.lastName && (
              <span className="err">Enter valid last name.</span>
            )}
          </>
        )}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className={`${errors.email ? "field-err" : ""}`}
        />
        {errors.email && <span className="err">Enter valid email.</span>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          className={`${errors.password ? "field-err" : ""}`}
        />
        {errors.password && <span className="err">Enter valid password.</span>}

        {!isLogin && (
          <>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className={`${errors.confirmPassword ? "field-err" : ""}`}
            />
            {errors.confirmPassword && (
              <span className="err">Passwords do not match.</span>
            )}
          </>
        )}

        <input type="submit" value={isLogin ? "Login" : "Sign Up"} />
      </form>
      <div className="text-center">
        {isLogin ? (
          <>
            <p>
              Login as{" "}
              <span className="login-btn" onClick={loginAsGuest}>
                Guest
              </span>
            </p>
            <p>
              Don't have an account?{" "}
              <span className="login-btn" onClick={toggleLoginSignup}>
                Sign Up now
              </span>
            </p>
          </>
        ) : (
          <p>
            Already have an account?{" "}
            <span className="login-btn" onClick={toggleLoginSignup}>
              Login now
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default memo(Login);
