import { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormValidation from "../../hooks/useFormValidation";

const Register = ({
  isOpen,
  onClose,
  onRegisterSubmit,
  onSignInClick,
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
  // Verifique se todos os campos estão preenchidos
  if (!values.email || !values.password || !values.name) {
    console.error('Missing required fields');
    return;
  }
  onRegisterSubmit(values.email, values.password, values.name);
}

  return (
    <PopupWithForm
      name="sign-up"
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-overlay">
        <label className="popup__input-label" htmlFor="register-email">
          Email
        </label>
        <input
          className="popup__input"
          type="email"
          id="register-email"
          autoComplete="email"
          placeholder="Enter email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <p className="popup__error" id="register-email-error">
          {errors.email || ""}
        </p>
      </div>

      <div className="popup__input-overlay">
        <label className="popup__input-label" htmlFor="register-password">
          Password
        </label>
        <input
          className="popup__input"
          type="password"
          id="register-password"
          autoComplete="new-password"
          placeholder="Enter password"
          name="password"
          onChange={handleChange}
          value={values.password || ""}
          minLength="8"
          maxLength="30"
          required
        />
        <p className="popup__error" id="register-password-error">
          {errors.password || ""}
        </p>
      </div>

      <div className="popup__input-overlay">
        <label className="popup__input-label" htmlFor="register-name">
          Username
        </label>
        <input
          className="popup__input"
          type="text"
          id="register-name"
          autoComplete="name"
          placeholder="Enter username"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        />
        <p className="popup__error" id="register-name-error">
          {errors.name || ""}
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
        aria-label="Sign up"
        disabled={!isValid}
      >
        Sign up
      </button>
      <p className="popup__signin-register">
        or{" "}
        <span className="popup__link" onClick={onSignInClick}>
          Sign in
        </span>
      </p>
    </PopupWithForm>
  );
};

export default Register;