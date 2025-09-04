import { useEffect, useState } from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";
import { NUMBER_CARDS } from "../../utils/constants";

const NewsCardList = ({
  onSavedArticlesPage,
  loggedIn,
  cards = [],
  savedArticles = [],
  showCards,
  setShowCards,
  onSaveArticleClick,
  onRemoveArticleClick,
  onSignInClick,
}) => {
  const [next, setNext] = useState(NUMBER_CARDS);
  const [isButtonHidden, setIsButtonHidden] = useState(false);

  // Initialize showCards with first 3 cards on main page
  useEffect(() => {
    if (!onSavedArticlesPage && setShowCards && cards.length > 0) {
      setShowCards(cards.slice(0, NUMBER_CARDS));
    }
  }, [cards, onSavedArticlesPage, setShowCards]);

  // Show/hide "Show more" button based on remaining cards
  useEffect(() => {
    setIsButtonHidden(showCards?.length >= cards?.length);
  }, [showCards, cards]);

  const handleShowMoreCards = () => {
    if (cards && setShowCards) {
      const nextBatch = cards.slice(0, next + NUMBER_CARDS);
      setShowCards(nextBatch);
      setNext(next + NUMBER_CARDS);
    }
  };

  // Filter out any undefined items from arrays
  const validSavedArticles = savedArticles?.filter(article => article) || [];
  const validShowCards = showCards?.filter(card => card) || [];

  if (onSavedArticlesPage) {
    return (
      <section className="news-card-list news-card-list_saved-articles">
        <div className="news-card-list__overlay">
          {validSavedArticles.length > 0 ? (
            <ul className="news-card-list__card-grid news-card-list__card-grid_saved-articles">
              {validSavedArticles.map((newscard) => (
                <li className="news-card-list__card" key={newscard._id || Math.random()}>
                  <NewsCard
                    data={newscard}
                    onSavedArticlesPage={true}
                    loggedIn={loggedIn}
                    onRemoveArticleClick={onRemoveArticleClick}
                    savedArticles={validSavedArticles}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="news-card-list__no-articles">No saved articles yet.</p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="news-card-list">
      <div className="news-card-list__overlay">
        <h3 className="news-card-list__title">Search results</h3>
        {validShowCards.length > 0 ? (
          <>
            <ul className="news-card-list__card-grid">
              {validShowCards.map((newscard, index) => (
                <li className="news-card-list__card" key={index}>
                  <NewsCard
                    data={newscard}
                    onSavedArticlesPage={false}
                    loggedIn={loggedIn}
                    onSaveArticleClick={onSaveArticleClick}
                    onRemoveArticleClick={onRemoveArticleClick}
                    savedArticles={validSavedArticles}
                    onSignInClick={onSignInClick}
                  />
                </li>
              ))}
            </ul>
            {!isButtonHidden && cards?.length > validShowCards.length && (
              <button
                className="news-card-list__show-more-button"
                onClick={handleShowMoreCards}
              >
                Show more
              </button>
            )}
          </>
        ) : (
          <p className="news-card-list__no-results">No articles found.</p>
        )}
      </div>
    </section>
  );
};

export default NewsCardList;