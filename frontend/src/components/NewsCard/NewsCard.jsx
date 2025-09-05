import { useState, useEffect } from "react";
import "./NewsCard.css";

const NewsCard = ({
  data,
  onSavedArticlesPage = false,
  loggedIn = false,
  onSaveArticleClick,
  onRemoveArticleClick,
  savedArticles = [],
  onSignInClick,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [articleId, setArticleId] = useState(null);
  const [showSaveTooltip, setShowSaveTooltip] = useState(false);
  const [showRemoveTooltip, setShowRemoveTooltip] = useState(false);

  // Check if current card is already saved
  useEffect(() => {
    if (!data) return;
    
    // More reliable article matching
    const foundArticle = savedArticles.find(
      (article) => 
        article && data && 
        (article.link === data.url || article.link === data.link)
    );
    
    setIsSaved(!!foundArticle);
    if (foundArticle) {
      setArticleId(foundArticle._id);
    }
  }, [data, savedArticles]);

  const handleSaveToggle = () => {
    if (!data) return;
    
    if (!loggedIn) {
      onSignInClick();
      return;
    }

    if (isSaved && articleId) {
      onRemoveArticleClick(data);
      setIsSaved(false);
      setArticleId(null);
    } else {
      onSaveArticleClick(data);
      setIsSaved(true);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const convertDate = (dateString) => {
  if (!dateString) return '';
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  try {
    const date = new Date(dateString);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  } catch { 
    return '';
  }
};

  // Return null if data is missing
  if (!data) return null;

  // Get card data based on page type
  const cardData = onSavedArticlesPage ? {
    url: data.link || '#',
    image: data.image,
    title: data.title || 'Untitled',
    description: data.text || 'No description available',
    source: data.source || 'Unknown source',
    date: data.date,
    keyword: data.keyword
  } : {
    url: data.url || '#',
    image: data.urlToImage,
    title: data.title || 'Untitled',
    description: data.description || 'No description available',
    source: data.source?.name || 'Unknown source',
    date: data.publishedAt
  };

  const imageUrl = imageError || !cardData.image 
    ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuMzVlbSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmaWxsPSIjNjE2YTE3Ij5ObyBJbWFnZSBhdmFpbGFibGU8L3RleHQ+PC9zdmc+"
    : cardData.image;

  return (
    <article className="news-card">
      <div className="news-card__header">
        {/* Action button */}
        <button
          className={
            onSavedArticlesPage 
              ? "news-card__button news-card__button_remove"
              : `news-card__button news-card__button_save ${
                  loggedIn && isSaved ? "news-card__button_save_active" : ""
                }`
          }
          onClick={onSavedArticlesPage 
            ? () => onRemoveArticleClick(data)
            : handleSaveToggle
          }
          aria-label={onSavedArticlesPage ? "Remove article" : "Save article"}
          onMouseEnter={() => {
            if (onSavedArticlesPage) {
              setShowRemoveTooltip(true);
            } else if (!loggedIn) {
              setShowSaveTooltip(true);
            } else if (loggedIn && !isSaved) {
              setShowSaveTooltip(true);
            } else if (loggedIn && isSaved) {
              setShowRemoveTooltip(true);
            }
          }}
          onMouseLeave={() => {
            setShowSaveTooltip(false);
            setShowRemoveTooltip(false);
          }}
        >
          {onSavedArticlesPage ? (
            <span className="news-card__button-icon"></span>
          ) : (
            <span className="news-card__button-icon">
              {loggedIn && isSaved ? "" : ""}
            </span>
          )}
        </button>

        {/* Tooltip for save button when not logged in */}
        {showSaveTooltip && !loggedIn && !onSavedArticlesPage && (
          <div className="news-card__tag news-card__tag_type_tooltip">
            Sign in to save articles
          </div>
        )}

        {/* Tooltip for save button when logged in and article not saved */}
        {showSaveTooltip && loggedIn && !isSaved && !onSavedArticlesPage && (
          <div className="news-card__tag news-card__tag_type_tooltip">
            Save article
          </div>
        )}

        {/* Tooltip for remove button (saved articles page or saved state) */}
        {showRemoveTooltip && (onSavedArticlesPage || (loggedIn && isSaved)) && (
          <div className="news-card__tag news-card__tag_type_tooltip">
            Remove from saved
          </div>
        )}
        
        {/* Keyword tag (saved articles only) */}
        {onSavedArticlesPage && data.keyword && (
          <div className="news-card__tag news-card__tag_type_keyword">
            {data.keyword}
          </div>
        )}
      </div>

      {/* Card content */}
      <a
        className="news-card__link"
        href={cardData.url}
        target="_blank"
        rel="noreferrer"
      >
        <div className="news-card__image-container">
          <img 
            className="news-card__image" 
            src={imageUrl}
            alt={cardData.title} 
            onError={handleImageError}
          />
        </div>
        <div className="news-card__content">
          <p className="news-card__date">{convertDate(cardData.date)}</p>
          <h2 className="news-card__title">{cardData.title}</h2>
          <p className="news-card__description">{cardData.description}</p>
          <p className="news-card__source">{cardData.source}</p>
        </div>
      </a>
    </article>
  );
};

export default NewsCard;