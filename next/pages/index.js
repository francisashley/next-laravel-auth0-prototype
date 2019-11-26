import React from "react";
import Link from "next/link";
import Layout from "../components/layout";
import { useFetchArticles } from "../lib/articles";
import withUser from "../lib/withUser";

function Home({ user }) {
  const articles = useFetchArticles({ limit: 5 });

  return (
    <Layout user={user} title={user ? `Welcome back ${user.name} 👋!` : `Welcome guest!`}>
      <div className="mt-8">
        <div className="shadow bg-white p-5 mb-8 rounded">
          <h3 className="font-semibold mb-3 text-lg">Check out the latest posts</h3>
          <ul>
            {articles.map(article => (
              <li key={article.id}>
                👉{" "}
                <Link href={`/articles/[id]`} as={`/articles/${article.id}`}>
                  <a className="text-blue-600 hover:underline text-lg">{article.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="shadow bg-white p-5 mb-8 rounded">
          <h3 className="font-semibold mb-3 text-lg">Popular authors</h3>
          <ul>
            <li>
              ⚡️{" "}
              <Link href="authors/[id]" as={`/authors/bluefish`}>
                <a className="text-blue-600 hover:underline text-lg">bluefish</a>
              </Link>
            </li>
            <li>
              ⚡️{" "}
              <Link href="authors/[id]" as={`/authors/cornsilk`}>
                <a className="text-blue-600 hover:underline text-lg">cornsilk</a>
              </Link>
            </li>
            <li>
              ⚡️{" "}
              <Link href="authors/[id]" as={`/authors/khadia`}>
                <a className="text-blue-600 hover:underline text-lg">khadia</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default withUser(Home);
