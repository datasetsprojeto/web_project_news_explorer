import { BASE_URL } from "./constants";

const REQUEST_TIMEOUT = 8000;

function fetchWithTimeout(url, options, timeout = REQUEST_TIMEOUT) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
}

function processResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then(errorData => {
      const errorMessage = errorData.message || `Request failed with status: ${res.status}`;
      throw new Error(errorMessage);
    }).catch(() => {
      throw new Error(`Request failed with status: ${res.status}`);
    });
  }
}

export function register(email, password, name) {
  return fetchWithTimeout(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  })
    .then(processResponse)
    .catch(error => {
      console.error('Registration error:', error);
      throw error;
    });
}

export function login(email, password) {
  return fetchWithTimeout(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  .then(processResponse)
  .then(data => {
    if (data.token) {
      if (isTokenExpired(data.token)) {
        throw new Error('Token expired');
      }
      localStorage.setItem("jwt", data.token);
      return data;
    } else {
      throw new Error('No token received');
    }
  })
}

export function checkToken(token) {
  return fetchWithTimeout(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then(processResponse)
    .catch(error => {
      console.error('Token check error:', error);
      localStorage.removeItem('jwt');
      throw error;
    });
}

export function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch { 
    return true;
  }
}