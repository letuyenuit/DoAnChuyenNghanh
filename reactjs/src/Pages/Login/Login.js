import React from "react";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { login } from "../../redux/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const handleLogin = async (email, password) => {
    try {
      const res = await axiosInstance.post("/auth/login", {
        email: email,
        password: password,
      });
      if (res.status === 200) {
        const token = res.data.token;
        const user = res.data.user;
        dispatch(login("ok", user, token));
        window.location.href = "/";
      } else {
        alert("Thông tin tài khoản hoặc mật khẩu sai");
      }
    } catch (error) {
      alert("Thông tin tài khoản hoặc mật khẩu sai");
    }
  };
  return (
    <div id={styles.logregForms}>
      <div className={styles.formSignin}>
        <h1
          className="h3 mb-3 font-weight-normal"
          style={{ textAlign: "center" }}
        >
          Sign in
        </h1>
        <div className={styles.socialLogin}>
          {/* <button
            className={`btn ${styles.facebookBtn} ${styles.socialBtn}`}
            type="button"
          >
            <span className="text-white">
              <i className="bi bi-facebook text-white"></i> Sign in with
              Facebook
            </span>
          </button> */}
          <button
            className={`btn ${styles.googleBtn} ${styles.socialBtn}`}
            type="button"
          >
            <span className="text-white">
              <i className="bi bi-google text-white"></i> Sign in with Google+
            </span>
          </button>
        </div>
        <p style={{ textAlign: "center" }}> OR </p>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              handleLogin(values.email, values.password);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="p-0">
              <Field
                id={styles.inputEmail}
                className={`form-control shadow-none ${styles.formControl}`}
                placeholder="Email address"
                type="email"
                name="email"
              />
              <ErrorMessage
                className="fs-14px text-danger"
                name="email"
                component="div"
              />
              <Field
                id={styles.inputPassword}
                className={`form-control shadow-none ${styles.formControl}`}
                placeholder="Password"
                type="password"
                name="password"
              />
              <ErrorMessage
                className="fs-14px text-danger"
                name="password"
                component="div"
              />
              <button
                className="btn btn-success btn-block w-100"
                type="submit"
                disabled={isSubmitting}
              >
                <i className="fas fa-sign-in-alt"></i> Sign in
              </button>
            </Form>
          )}
        </Formik>
        <a href="#" id="forgot_pswd" className="text-decoration-none">
          Forgot password?
        </a>
        <hr />
        <Link
          to="/signup"
          className="btn btn-primary btn-block w-100 shadow-none text-white"
          type="button"
          id="btn-signup"
        >
          <i className="bi bi-person-add  text-white"></i> Sign up New Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
