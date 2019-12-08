import { useEffect, useState } from "react";

import fetch from "isomorphic-unfetch";

const fetchAPI = (url, cookie) => fetch(url, cookie ? { headers: { cookie } } : {});

export async function fetchMe(cookie = "") {
  if (typeof window !== "undefined" && window.__user) {
    return window.__user;
  }

  const res = await fetchAPI("/api/me", cookie);

  if (!res.ok) {
    delete window.__user;
    return null;
  }

  const json = await res.json();
  if (typeof window !== "undefined") {
    window.__user = json;
  }

  return json;
}

export async function fetchUser(username) {
  const res = await fetchAPI("http://localhost:3000/api/users/" + username);

  if (!res.ok) return null;

  const user = await res.json();

  return user.data;
}

export async function fetchUsers({ limit = null } = {}) {
  try {
    let users = await fetch("http://localhost:3000/api/users")
      .then(response => response.json())
      .then(({ data }) => data)
      .catch(error => {
        throw error;
      });

    if (limit !== null) users = users.slice(0, limit);

    return users;
  } catch (error) {
    throw error;
  }
}
