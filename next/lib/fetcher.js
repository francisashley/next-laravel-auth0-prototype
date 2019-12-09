import fetch from "isomorphic-unfetch";

/**
 * Extends isomorphic fetch injects a few extra goodies
 *
 * Feature #1: transform relative urls to absolute urls for server / client side routing.
 * Feature #2: set `Accept` and `Content-Type` default headers
 * Feature #3: returns standardised success / error responses
 *
 * @param {string} url Request url
 * @param {object} options Request options
 * @returns { get, post, patch, destroy}
 */
export default function fetcher(url = "", options = {}) {
  // Ensure all local API requests have absolute URLs to enable use on server and client.
  url = url[0] === "/" ? "http://localhost:3000" + url : url;

  // Add parameters to url
  let params = options.params;
  if (params) {
    params = Object.keys(params).map(key => key + "=" + params[key]);
    params = params.join("&");
    url = params ? url + "?" + params : url;
  }

  // Default headers
  options.headers = options.headers || {};
  options.headers = { ...options.headers, Accept: "application/json" };

  // Default headers
  if (options.accessToken) {
    options.headers.Authorization = "Bearer " + options.accessToken;
    delete options.accessToken;
  }

  return {
    get: async () => {
      return fetch(url, { ...options, method: "GET" }).then(parseResponse);
    },
    post: async (data = {}) => {
      return fetch(url, {
        method: "POST",
        headers: { ...options.headers, "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(parseResponse);
    },
    patch: async (data = {}) => {
      return fetch(url, {
        method: "PATCH",
        headers: { ...options.headers, "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(parseResponse);
    },
    destroy: async () => {}
  };
}

async function parseResponse(response) {
  const ok = response.ok;
  const status = response.status;
  const statusText = response.statusText;

  if (status === 500) return errorResource(status, statusText);

  const { data, message, errors } = await response.json();

  if (!ok) return errorResource(status, message, errors);

  return successResource(status, data);
}

function successResource(status, data) {
  return { status, data };
}

function errorResource(status, message, errors) {
  return { status, error: { message, errors } };
}
