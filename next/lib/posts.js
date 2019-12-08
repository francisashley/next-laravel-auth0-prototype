import { useEffect, useState } from "react";

import fetch from "isomorphic-unfetch";

export function fetchPost(id) {
  return fetch("http://localhost:3000/api/posts/" + id)
    .then(response => response.json())
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}

export async function fetchPosts({ limit = null, author = null } = {}) {
  try {
    let posts = await fetch("http://localhost:3000/api/posts")
      .then(response => response.json())
      .then(({ data }) => data)
      .catch(error => {
        throw error;
      });

    if (author !== null) posts = posts.filter(post => post.author === author);
    if (limit !== null) posts = posts.slice(0, limit);

    return posts;
  } catch (error) {
    throw error;
  }
}
