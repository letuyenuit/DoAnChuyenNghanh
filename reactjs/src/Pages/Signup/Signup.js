import React from "react";
import { Link } from "react-router-dom";
import styles from "./Signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signup } from "../../redux/auth/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const handleSignup = (name, email, password) => {
    dispatch(signup(name, email, password));
  };
  return (
    <div id={styles.logregForms}>
      <div className={styles.formSignin}>
        <h1
          className="h3 mb-3 font-weight-normal"
          style={{ textAlign: "center" }}
        >
          Create new account
        </h1>
        <div className={styles.socialLogin}>
          <button
            className={`btn ${styles.facebookBtn} ${styles.socialBtn}`}
            type="button"
          >
            <span className="text-white">
              <i className="bi bi-facebook text-white"></i> Sign in with
              Facebook
            </span>
          </button>
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
          initialValues={{ name: "", email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            }
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
              handleSignup(values.name, values.email, values.password);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="p-0">
              <Field
                id={styles.inputEmail}
                className={`form-control shadow-none mb-2 ${styles.formControl}`}
                placeholder="Name"
                type="text"
                name="name"
              />
              <ErrorMessage
                className="fs-14px text-danger"
                name="name"
                component="div"
              />
              <Field
                id={styles.inputEmail}
                className={`form-control shadow-none mb-2 ${styles.formControl}`}
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
                className={`form-control shadow-none mb-2 ${styles.formControl}`}
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
                <i className="fas fa-sign-in-alt"></i> Sign up
              </button>
            </Form>
          )}
        </Formik>
        <a id="forgot_pswd" className="text-decoration-none">
          Or you have an existing account?
        </a>
        <hr />
        <Link
          className="btn btn-primary btn-block w-100 text-white"
          type="button"
          id="btn-signup"
          to="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
