import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import Footer from "../Footer/Footer";
import SignIn from "../SignIn/SignIn";
import Register from "../Register/Register";
import NewsCardList from "../NewsCardList/NewsCardList";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";

import Preloader from "../Preloader/Preloader";
import NotFoundResults from "../NotFoundResults/NotFoundResults";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SuccessfulPopup from "../SuccessfulPopup/SuccessfulPopup";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import newsApi from "../../utils/NewsApi";
import * as auth from "../../utils/auth";

// Hook customizado para autenticação
const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const storedToken = localStorage.getItem("jwt");
      
      if (storedToken && auth.isTokenExpired(storedToken)) {
        localStorage.removeItem("jwt");
        setToken(null);
        setLoggedIn(false);
        return;
      }

      if (storedToken) {
        try {
          await auth.checkToken(storedToken);
          setToken(storedToken);
          setLoggedIn(true);
        } catch (error) {
          console.error("Token validation failed:", error);
          localStorage.removeItem("jwt");
          setToken(null);
          setLoggedIn(false);
        }
      }
    };

    checkTokenValidity();
  }, []);

  return { token, loggedIn, setToken, setLoggedIn };
};

// Hook customizado para gerenciamento de modais
const useModal = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => setActiveModal(modalName);
  const closeModals = () => setActiveModal(null);

  return {
    activeModal,
    openModal,
    closeModals,
    isSignInOpen: activeModal === 'signin',
    isSignUpOpen: activeModal === 'signup',
    isSuccessfulPopupOpen: activeModal === 'success'
  };
};

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSaved, setIsLoadingSaved] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isNewsCardListOpen, setIsNewsCardListOpen] = useState(false);
  const [onSavedArticlesPage, setOnSavedArticlesPage] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const location = useLocation().pathname.substring(1);
  const [hasError, setHasError] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [showCards, setShowCards] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  const { token, loggedIn, setToken, setLoggedIn } = useAuth();
  const { activeModal, openModal, closeModals, isSignInOpen, isSignUpOpen, isSuccessfulPopupOpen } = useModal();

  // GETting current user and articles if the user logged in
  useEffect(() => {
    if (loggedIn) {
      setIsLoadingSaved(true);
      Promise.all([mainApi.getCurrentUser(token), mainApi.getArticles(token)])
        .then(([user, articles]) => {
          setCurrentUser(user);
          setSavedArticles(articles);
        })
        .catch((err) => console.error("Error fetching user data:", err))
        .finally(() => setIsLoadingSaved(false));
    }
  }, [token, loggedIn]);

  // Determines if user is on the saved-articles page
  useEffect(() => {
    const savedArticlesPath = ["saved-articles"];
    if (savedArticlesPath.includes(location)) {
      setOnSavedArticlesPage(true);
    } else {
      setOnSavedArticlesPage(false);
    }
  }, [location]);

  // Closes the popup with the Escape button
  useEffect(() => {
    function handleEscapeClose(evt) {
      if (evt.key === "Escape") {
        closeModals();
      }
    }
    document.addEventListener("keydown", handleEscapeClose);
    return () => document.removeEventListener("keydown", handleEscapeClose);
  }, []);

  // Saving an article and adds it to the array of articles
  function handleSaveArticle(data) {
    if (!data) return;
    
    const isAlreadySaved = savedArticles.some(article => 
      article && data && article.title === data.title
    );
    
    if (!isAlreadySaved) {
      mainApi
        .saveArticle(data, searchKeyword, token)
        .then((res) => {
          if (res && res.data) {
            setSavedArticles((savedArticles) => [...savedArticles, res.data]);
          }
        })
        .catch((err) => console.error("Error saving article:", err));
    }
  }

  // DELETE-ing article and removes it from the array
   function handleRemoveArticle(data) {
    if (!data) return;
    
    let articleId;

    if (!onSavedArticlesPage) {
      const article = savedArticles.find((obj) => obj && data && obj.link === data.url);
      if (article) {
        articleId = article._id;
      } else {
        console.error("Card does not exist!");
        return;
      }
    } else {
      articleId = data._id;
    }

    mainApi
      .removeArticle(articleId, token)
      .then(() => {
        setSavedArticles(savedArticles.filter((obj) => obj && obj._id !== articleId));
      })
      .catch((err) => console.error("Error removing article:", err));
  }

  async function handleSearchSubmit(keyword) {
    setIsNewsCardListOpen(false);
    setIsLoading(true);
    setHasError(false);
    setSearchError('');

    try {
      const res = await newsApi.searchArticles(keyword);
      setIsNewsCardListOpen(true);
      setCards(res);
      setHasResults(res.length > 0);
      
      if (res.length === 0) {
        setSearchError('Nothing found');
      }
    } catch (err) {
      console.error("Search error:", err);
      setHasError(true);
      setHasResults(false);
      setSearchError(err.message || 'An error occurred during search');
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setToken(null);
    navigate("/");
    closeModals();
  }

  function handleLogin() {
    setLoginError("");
    setLoggedIn(true);
    closeModals();
  }

  function handleRegister() {
    setRegisterError("");
    closeModals();
    openModal('success');
  }

  function handleSignInClick() {
    setLoginError("");
    openModal('signin');
  }

  function handleSignUpClick() {
    setRegisterError("");
    openModal('signup');
  }

  const handleRegisterSubmit = async (email, password, name) => {
    setIsLoading(true);
    setRegisterError("");
    
    try {
      await auth.register(email, password, name);
      handleRegister();
      setIsRegistered(true);
    } catch (err) {
      console.error('Registration error:', err.message);
      
      if (err.message.includes('409') || err.message.includes('already exists')) {
        setRegisterError('Este email já está em uso. Tente fazer login.');
      } else {
        setRegisterError('Erro no registro. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (email, password) => {
    setIsLoading(true);
    setLoginError("");
    
    try {
      await auth.login(email, password);
      setToken(localStorage.getItem("jwt"));
      handleLogin();
    } catch (err) {
      console.error('Login error:', err.message);
      
      if (err.message.includes('401') || err.message.includes('Invalid')) {
        setLoginError('Email ou senha incorretos.');
      } else {
        setLoginError('Erro no login. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          loggedIn={loggedIn}
          currentUser={currentUser}
          onSignInClick={handleSignInClick}
          setIsNewsCardListOpen={setIsNewsCardListOpen}
          setSearchKeyword={setSearchKeyword}
          onSavedArticlesPage={onSavedArticlesPage}
          onLogOut={handleLogOut}
        />
        <Routes>
          <Route path="/" element={
            <>
              <SearchForm
                onSearch={handleSearchSubmit}
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                setIsNewsCardListOpen={setIsNewsCardListOpen}
              />
              {hasResults && isNewsCardListOpen && (
                <NewsCardList
                  onSavedArticlesPage={onSavedArticlesPage}
                  loggedIn={loggedIn}
                  cards={cards}
                  savedArticles={savedArticles}
                  onSaveArticleClick={handleSaveArticle}
                  onRemoveArticleClick={handleRemoveArticle}
                  showCards={showCards}
                  setShowCards={setShowCards}
                  onSignInClick={handleSignInClick}
                />
              )}

             {isLoading && <Preloader />}
              {!hasResults && !isLoading && isNewsCardListOpen && (
                <NotFoundResults hasError={hasError} searchError={searchError} />
              )}
              <About />
            </>
          } />

          <Route path="/saved-articles" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedNewsHeader
                currentUser={currentUser}
                savedArticles={savedArticles}
              />
              {isLoadingSaved ? (
                <Preloader />
              ) : (
                <NewsCardList
                  onSavedArticlesPage={onSavedArticlesPage}
                  loggedIn={loggedIn}
                  savedArticles={savedArticles}
                  onRemoveArticleClick={handleRemoveArticle}
                  setShowCards={setShowCards}
                  showCards={savedArticles}
                  cards={savedArticles}
                />
              )}
            </ProtectedRoute>
          } />
        </Routes>
        <SignIn
          isOpen={isSignInOpen}
          onClose={closeModals}
          onSignUpClick={handleSignUpClick}
          onLoginSubmit={handleLoginSubmit}
          hasError={loginError}
        />
        <Register
          isOpen={isSignUpOpen}
          onClose={closeModals}
          onSignInClick={handleSignInClick}
          onRegisterSubmit={handleRegisterSubmit}
          hasError={registerError}
        />
        <SuccessfulPopup
          isOpen={isSuccessfulPopupOpen}
          onClose={closeModals}
          onSignInClick={handleSignInClick}
          isRegistered={isRegistered}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;