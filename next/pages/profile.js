import React from "react";
import { useFetchArticles } from "../lib/articles";
import { useFetchUser } from "../lib/user";
import Layout from "../components/layout";
import Link from "next/link";

function ProfileCard({ user }) {
  const articles = useFetchArticles({ limit: 5, author: user.name });

  return (
    <>
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
        <h3 className="font-semibold mb-3 text-lg">My posts</h3>
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
    </>
  );
}

function Profile() {
  const { user, loading } = useFetchUser({ required: true });

  return (
    <Layout user={user} loading={loading} title="Profile (client rendered)">
      {loading ? <>Loading...</> : <ProfileCard user={user} />}
    </Layout>
  );
}

export default Profile;
