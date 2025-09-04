import { API_KEY, PROXY_URL, NUMBER_ARTICLES } from "./constants";

// Função para formatar data como YYYY-MM-DD
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

const today = new Date();
const weekAgo = new Date(today);
weekAgo.setDate(today.getDate() - 7);

class NewsApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _processResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`An error just occurred: ${res.status}`);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._processResponse);
  }

  searchArticles(keyword) {
    if (!API_KEY) {
      return Promise.reject('API key is missing');
    }
    
    const fromDate = formatDate(weekAgo);
    const toDate = formatDate(today);
    
    return this._request(
      `${this._baseUrl}?q=${encodeURIComponent(keyword)}&from=${fromDate}&to=${toDate}&language=en&sortBy=relevancy&pageSize=${NUMBER_ARTICLES}&apiKey=${API_KEY}`
    )
    .then((res) => {
      if (res.articles && res.articles.length > 0) {
        return res.articles;
      } else {
        return [];
      }
    })
    .catch(error => {
      console.error('News API error:', error);
      throw new Error('Sorry, something went wrong during the request. There might be a connection issue or the server might be down. Please try again later.');
    });
  }
}

const newsApi = new NewsApi({
  baseUrl: PROXY_URL,
  headers: { "Content-Type": "application/json" },
});

export default newsApi;