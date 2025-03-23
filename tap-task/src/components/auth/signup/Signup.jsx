import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../../store/slices/authSlice";
import { toast } from "react-toastify";
import AuthHero from "../../reusable/authHero/AuthHero";
import "./Signup.css";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  rememberMe: Yup.boolean(),
});

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Initial form values
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  };

  // Handle form sumission
  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const resultAction = await dispatch(register(values)).unwrap();
      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error || "Signup failed");
      setErrors({ general: "Signup failed" });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="signup-container">
      {/* Left side - Hero section */}
      <AuthHero />

      {/* Right side - Signup form */}
      <div className="signup-form-container">
        <div className="signup-form-wrapper">
          <div className="signup-header">
            <div className="signup-logo">
              <svg
                className="logo-icon"
                viewBox="0 0 40 40"
                fill="currentColor"
              >
                <path d="M20 3.33a16.67 16.67 0 100 33.34 16.67 16.67 0 000-33.34zm0 30a13.33 13.33 0 110-26.66 13.33 13.33 0 010 26.66z" />
                <path d="M26.67 20a6.67 6.67 0 11-13.34 0 6.67 6.67 0 0113.34 0z" />
              </svg>
            </div>
            <h2 className="signup-title">
              Create account{" "}
              <span role="img" aria-label="rocket">
                🚀
              </span>
            </h2>
            <p className="signup-subtitle">
              Join our learning platform and start your journey
            </p>
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form className="signup-form">
                {errors.general && (
                  <div className="error general-error">{errors.general}</div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <Field
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      className="form-input"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <Field
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      className="form-input"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="form-input"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="form-input"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="form-input"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="signup-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering account..." : "Create Account"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="separator">
            <div className="separator-line"></div>
            <div className="separator-text">or</div>
            <div className="separator-line"></div>
          </div>

          <div className="social-signup">
            <button type="button" className="google-button">
              <svg className="google-icon" viewBox="0 0 24 24">
                <path
                  d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
                  fill="#4285F4"
                />
              </svg>
              Sign up with Google
            </button>
          </div>

          <div className="login-link-container">
            <p className="login-link-text">
              Already have an account?{" "}
              <a href="#" className="login-link">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
