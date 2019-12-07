import fetch from "isomorphic-unfetch";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export function get(url) {
  return fetch(url, { method: "GET", headers });
}

export function post(url, data = {}) {
  return fetch(url, { method: "POST", headers, body: JSON.stringify(data) });
}

export function patch(url, data = {}) {
  return fetch(url, { method: "PATCH", headers, body: JSON.stringify(data) });
}

export function destroy(url) {
  return fetch(url, { method: "GET", headers });
}

export default { get, post, patch, destroy };
