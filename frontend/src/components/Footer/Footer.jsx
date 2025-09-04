import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Footer.css";
import LinkedInIcon from "../../images/icons/linkedin-icon.svg";
import InstagramIcon from "../../images/icons/instagram-icon.svg";
import GithubIcon from "../../images/icons/github-icon.svg";

const Footer = () => {
  const location = useLocation();

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright">
          &copy; 2025 Supersite, desenvolvido pela News API
        </p>
        <nav className="footer__navigation">
          <div className="footer__links">
            <NavLink 
              className="footer__link" 
              to="/"
              onClick={handleHomeClick}
            >
              Home
            </NavLink>
            <a
              className="footer__link"
              href="https://tripleten.com.br/"
              target="_blank"
              rel="noreferrer"
            >
              TripleTen
            </a>
          </div>
          <div className="footer__social">
            <a
              href="https://github.com/datasetsprojeto"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="footer__icon footer__icon_type_github"
                src={GithubIcon}
                alt="Github Icon"
              />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="footer__icon footer__icon_type_linkedin"
                src={LinkedInIcon}
                alt="LinkedIn Icon"
              />
            </a>

            <a
              href="https://www.instagram.com/renatosp06/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="footer__icon footer__icon_type_instagram"
                src={InstagramIcon}
                alt="Instagram Icon"
              />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
