import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

export function fetchArticle(id) {
  return fetch("/api/articles/" + id)
    .then(response => response.json())
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}

export function useFetchArticle(id = null) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticle(id)
      .then(setArticle)
      .catch(error => {
        throw error;
      });

    return () => {};
  }, []);

  return article;
}

export async function fetchArticles({ limit = null, author = null } = {}) {
  try {
    let articles = await fetch("http://localhost:3000/api/articles")
      .then(response => response.json())
      .then(({ data }) => data)
      .catch(error => {
        throw error;
      });

    if (author !== null) articles = articles.filter(article => article.author === author);
    if (limit !== null) articles = articles.slice(0, limit);

    return articles;
  } catch (error) {
    throw error;
  }
}

export function useFetchArticles({ limit = null, author = null } = {}) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    try {
      fetchArticles({ limit, author }).then(setArticles);
    } catch (error) {
      throw error;
    }

    return () => {};
  }, []);

  return articles;
}
