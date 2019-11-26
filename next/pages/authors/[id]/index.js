import React from "react";
import { fetchArticles } from "../../../lib/articles";
import Layout from "../../../components/layout";
import Link from "next/link";
import withAuth from "../../../lib/withAuth";
import withUser from "../../../lib/withUser";

function Profile({ user, articles = [], author }) {
  return (
    <Layout user={user} title={author}>
      <div className="shadow bg-white p-5 mb-5 rounded flex">
        <img className="mr-4" src={user.picture} alt="user picture" />
        <div>
          <p className="mb-2">
            <strong>Username:</strong> {user.name}
          </p>
          <p className="mb-2">
            <strong>User id:</strong> {user.sub}
          </p>
          <p className="mb-2">
            <strong>Updated at:</strong> {user.updated_at}
          </p>
        </div>
      </div>
      <div className="shadow bg-white p-5 mb-8 rounded">
        <h3 className="font-semibold mb-3 text-lg">
          {author === user.name ? "My posts" : `Posts by ${author}`}
        </h3>
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
    </Layout>
  );
}

Profile.getInitialProps = async ({ req, res, query }) => {
  const author = query.id;
  const articles = await fetchArticles({ limit: 5, author });

  return { articles, author };
};

export default withUser(withAuth(Profile));
