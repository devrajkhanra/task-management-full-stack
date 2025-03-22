import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthHero from "../../reusable/authHero/AuthHero";
import "./Login.css";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

const Login = () => {
  const navigate = useNavigate();

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  // Handle form submission
  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Call the login API
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success - store the token in localStorage
        localStorage.setItem("token", data.token);
        if (values.rememberMe) {
          localStorage.setItem("userId", data.userId);
        } else {
          sessionStorage.setItem("userId", data.userId);
        }

        // Show success toast
        toast.success("Login successful!");

        // Redirect to home page
        navigate("/");
      } else {
        // Error handling
        toast.error(data.message || "Invalid email or password");
        setErrors({ general: "Login failed" });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
      setErrors({ general: "An unexpected error occurred" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left side - Hero section */}
      <AuthHero />

      {/* Right side - Login form */}
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <div className="login-header">
            <div className="login-logo">
              <svg
                className="logo-icon"
                viewBox="0 0 40 40"
                fill="currentColor"
              >
                <path d="M20 3.33a16.67 16.67 0 100 33.34 16.67 16.67 0 000-33.34zm0 30a13.33 13.33 0 110-26.66 13.33 13.33 0 010 26.66z" />
                <path d="M26.67 20a6.67 6.67 0 11-13.34 0 6.67 6.67 0 0113.34 0z" />
              </svg>
            </div>
            <h2 className="login-title">
              Hey, hello{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
            </h2>
            <p className="login-subtitle">
              Enter the information you entered while registering.
            </p>
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form className="login-form">
                {errors.general && (
                  <div className="error general-error">{errors.general}</div>
                )}

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
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
                    className="form-input"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-options">
                  <div className="remember-me">
                    <Field
                      id="remember-me"
                      name="rememberMe"
                      type="checkbox"
                      className="checkbox-input"
                    />
                    <label htmlFor="remember-me" className="checkbox-label">
                      Remember me
                    </label>
                  </div>

                  <div className="forgot-password">
                    <a href="#" className="forgot-password-link">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="login-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
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

          <div className="social-login">
            <button type="button" className="google-button">
              <svg className="google-icon" viewBox="0 0 24 24">
                <path
                  d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
                  fill="#4285F4"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
