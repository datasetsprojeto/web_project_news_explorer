import { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ searchKeyword, setSearchKeyword, onSearch }) => {
  const [formInputValue, setFormInputValue] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Enter topic");
  const [error, setError] = useState("");

  function handleChange(evt) {
    setSearchKeyword(evt.target.value);
    setFormInputValue(evt.target.value);
    setError(""); // Limpa erro quando usuário digitar
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!formInputValue.trim()) {
      setError("Please enter a keyword");
      setPlaceholderText("Please enter a keyword");
    } else {
      onSearch(searchKeyword);
    }
  }

  return (
    <section className="search-form">
      <div className="search-form__overlay">
        <h1 className="search-form__title">What's going on in the world?</h1>
        <p className="search-form__description">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <form
          className="search-form__search-overlay"
          onSubmit={handleSubmit}
          noValidate
          name="search-form"
        >
          <input
            className={`search-form__input ${error ? "search-form__input_error" : ""}`}
            placeholder={placeholderText}
            value={formInputValue}
            onChange={handleChange}
            id="search-input"
            name="search"
            autoComplete="on"
          ></input>
          {error && <span className="search-form__error">{error}</span>}
          <button className="search-form__button" type="submit">
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchForm;