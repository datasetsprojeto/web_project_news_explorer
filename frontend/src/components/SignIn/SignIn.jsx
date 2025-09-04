import { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormValidation from "../../hooks/useFormValidation";

const SignIn = ({
  isOpen,
  onClose,
  onLoginSubmit,
  onSignUpClick,
  hasError,
}) => {
  const { values, handleChange, errors, isValid, handleFormReset } =
    useFormValidation();

  // When form is open, reset it
  useEffect(() => {
    handleFormReset();
  }, [isOpen, handleFormReset]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onLoginSubmit(values.email, values.password);
  }

  return (
    <PopupWithForm
      name="sign-in"
      title="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-overlay">
        <label className="popup__input-label" htmlFor="login-email">
          Email
        </label>
        <input
          className="popup__input"
          type="email"
          id="login-email"
          autoComplete="email"
          placeholder="Enter email"
          name="email"
          onChange={handleChange}
          value={values.email || ""}
          required
        />
        <p className="popup__error" id="login-email-error">
          {errors.email || ""}
        </p>
      </div>
      <div className="popup__input-overlay">
        <label className="popup__input-label" htmlFor="login-password">
          Password
        </label>
        <input
          className="popup__input"
          type="password"
          id="login-password"
          autoComplete="current-password"
          placeholder="Enter password"
          name="password"
          onChange={handleChange}
          value={values.password || ""}
          minLength="8"
          maxLength="30"
          required
        />
        <p className="popup__error" id="login-password-error">
          {errors.password || ""}
        </p>
      </div>
      {hasError && (
        <p className="popup__error popup__error_type_form">
          {hasError} {/* Exibe a mensagem específica */}
        </p>
      )}
      <button
        className={`popup__submit-button ${
          isValid ? "popup__submit-button_active" : ""
        }`}
        type="submit"
        aria-label="Sign in"
        disabled={!isValid}
      >
        Sign in
      </button>
      <p className="popup__signin-register">
        or{" "}
        <span className="popup__link" onClick={onSignUpClick}>
          Sign up
        </span>
      </p>
    </PopupWithForm>
  );
};

export default SignIn;