import React from "react";
import "./Signup.css";

const SignupPage = () => {
  return (
    <div className="signup-container">
      {/* Left side - Hero section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="play-button">
            <svg className="play-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
          </div>
          <h1 className="hero-title">
            Digital
            <br />
            platform
            <br />
            for task
            <br />
            <span className="hero-title-dark">management.</span>
          </h1>
          <p className="hero-subtitle">
            You will never miss upcoming tasks.
            <br />
            But you will stay ahead in planning.
          </p>
        </div>
      </div>

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

          <form className="signup-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="form-input"
              />
              <p className="password-hint">
                Password must be at least 8 characters long
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="form-input"
              />
            </div>

            <div className="form-group checkbox-group">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="checkbox-input"
              />
              <label htmlFor="terms" className="checkbox-label">
                I agree to the{" "}
                <a href="#" className="terms-link">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="terms-link">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div className="form-group">
              <button type="submit" className="signup-button">
                Create Account
              </button>
            </div>
          </form>

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

export default SignupPage;
