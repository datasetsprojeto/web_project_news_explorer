import { BASE_URL } from "./constants";

const REQUEST_TIMEOUT = 8000;

class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getHeaders(token) {
    return {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...this.headers,
    };
  }

  _fetchWithTimeout(url, options, timeout = REQUEST_TIMEOUT) {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), timeout)
      )
    ]);
  }

  _processResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Request failed with status: ${res.status}`));
  }

  _request(url, options, token) {
    const headers = token ? this._getHeaders(token) : this.headers;
    const requestOptions = { ...options, headers };

    return this._fetchWithTimeout(url, requestOptions)
      .then(this._processResponse)
      .catch(error => {
        console.error('API request error:', error);
        throw error;
      });
  }

  getCurrentUser(token) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "GET",
    }, token);
  }

  getArticles(token) {
    return this._request(`${this.baseUrl}/articles`, {
      method: "GET",
    }, token);
  }

  saveArticle(data, searchKeyword, token) {
    const {
      title,
      description: text,
      publishedAt: date,
      url: link,
      urlToImage: image,
    } = data;
    
    const source = data.source.name;
    const keyword = searchKeyword.charAt(0).toUpperCase() + searchKeyword.slice(1);

    return this._request(`${this.baseUrl}/articles`, {
      method: "POST",
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    }, token);
  }

  removeArticle(id, token) {
    return this._request(`${this.baseUrl}/articles/${id}`, {
      method: "DELETE",
    }, token);
  }
}

const mainApi = new Api({ baseUrl: BASE_URL });

export default mainApi;