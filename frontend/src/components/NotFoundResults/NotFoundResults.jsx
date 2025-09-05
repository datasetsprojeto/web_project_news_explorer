import "./NotFoundResults.css";
import NotFoundImage from "../../images/not-found_image.png"

const NotFoundResults = ({ searchError }) => {
  return (
    <section className="not-found">
      <div className="not-found__overlay">
        <img className="not-found__image" src={NotFoundImage} alt="A sad face" />
        <h3 className="not-found__title">
          {searchError === 'Nothing found' ? 'Nothing found' : 'Error'}
        </h3>
        <p className="not-found__description">
          {searchError === 'Nothing found' 
            ? "Sorry, but nothing matched your search terms."
            : searchError || "Sorry, something went wrong during the request. There might be a connection issue or the server might be down. Please try again later."
          }
        </p>
      </div>
    </section>
  );
};

export default NotFoundResults;