import { BASE_URL } from "./constants";

const REQUEST_TIMEOUT = 8000;

class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
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
    
    if (res.status === 401) {
      return Promise.reject(new Error('Authentication failed: Invalid or expired token'));
    }
    
    return Promise.reject(new Error(`Request failed with status: ${res.status}`));
  }

  _request(url, options) {
    return this._fetchWithTimeout(url, options)
      .then(this._processResponse)
      .catch(error => {
        console.error('API request error:', error);
        throw error;
      });
  }

  getCurrentUser(token) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  getArticles(token) {
    return this._request(`${this.baseUrl}/articles`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  saveArticle(data, searchKeyword, token) {
    const {
      title,
      description: text = data.text,
      publishedAt: date = data.date,
      url: link = data.link,
      urlToImage: image = data.image,
      source
    } = data;
    
    const sourceName = typeof source === 'object' ? source?.name || 'Unknown source' : source || 'Unknown source';
    const keyword = searchKeyword;

    return this._request(`${this.baseUrl}/articles`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source: sourceName, 
        link,
        image,
      }),
    });
  }

  removeArticle(id, token) {
    return this._request(`${this.baseUrl}/articles/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
}

const mainApi = new Api({ baseUrl: BASE_URL });

export default mainApi;