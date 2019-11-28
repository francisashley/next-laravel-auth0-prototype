import React, { useState } from "react";
import Link from "next/link";
import Layout from "../../../components/layout";
import Panel from "../../../components/panel";
import { fetchArticles } from "../../../lib/articles";
import withAuth from "../../../lib/withAuth";
import withUser from "../../../lib/withUser";

function Profile({ user, articles = [], author }) {
  const [name, setNickname] = useState(user.name);
  const [submitting, setSubmitting] = useState(false);

  return (
    <Layout user={user} title={author}>
      <Panel className="flex">
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
      </Panel>
      <Panel title={author === user.name ? "My posts" : `Posts by ${author}`}>
        <ul>
          {articles.map(article => (
            <li key={article.id}>
              👉{" "}
              <Link href={`/articles/[id]`} as={`/articles/${article.id}`}>
                <a className="text-blue-600 hover:underline text-md">{article.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
      {author === user.name && (
        <Panel title="Account Settings" className="p-8">
          <form
            onSubmit={async e => {
              e.preventDefault();
              setSubmitting(true);

              const response = await fetch("/api/me", {
                method: "PATCH",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: e.target.elements.name.value })
              });

              if (response.ok) {
                const data = await response.json();
                location.reload();
              } else {
                setSubmitting(false);
                alert(`${response.status}: ${response.statusText}`);
              }
            }}
          >
            <hr className="my-6" />
            <div className="flex">
              <h3 className="text-lg w-1/3">Basics</h3>
              <div className="w-2/3">
                <label htmlFor="name" className="mb-2 text-sm block">
                  Username
                </label>
                <input
                  type="text"
                  value={name}
                  id="name"
                  onChange={e => setNickname(e.target.value)}
                  className="appearance-none border rounded w-full p-3 text-gray-700 focus:outline-none focus:shadow-outline border-gray-400 text-sm"
                />
              </div>
            </div>
            <hr className="my-6" />
            <div className="flex">
              <button
                className="bg-blue-700 hover:bg-blue-700 text-white font-regular text-sm py-3 px-5 rounded focus:outline-none focus:shadow-outline leading-tight ml-auto"
                type="submit"
              >
                {!submitting ? "Save Settings" : "Saving..."}
              </button>
            </div>
          </form>
        </Panel>
      )}
    </Layout>
  );
}

Profile.getInitialProps = async ({ req, res, query }) => {
  const author = query.id;
  const articles = await fetchArticles({ limit: 5, author });

  return { articles, author };
};

export default withUser(withAuth(Profile));
