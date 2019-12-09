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
