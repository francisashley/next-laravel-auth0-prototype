import react, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { useFetchUser } from "../../lib/user";
import Link from "next/link";
import { useFetchArticles } from "../../lib/articles";

function Articles() {
  const { user, loading } = useFetchUser();
  const articles = useFetchArticles();

  return (
    <Layout user={user} loading={loading} title="Articles">
      <div className="flex-1 shadow bg-white p-5 mb-5 rounded">
        <ul>
          {articles.map(article => (
            <li key={article.id}>
              <Link href="/articles/[id]" as={`/articles/${article.id}`}>
                <a className="text-blue-600 hover:underline text-lg">{article.title}</a>
              </Link>
              <span className="text-gray-600 text-sm">
                {" ~ "}
                <Link href="/authors/[id]" as={`/authors/${article.author}`}>
                  <a className="text-gray-600 hover:underline text-sm font-medium">
                    {article.author}
                  </a>
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default Articles;
