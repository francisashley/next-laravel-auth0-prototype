import React from "react";
import auth0 from "../../../lib/auth0";
import { fetchArticles } from "../../../lib/articles";
import { fetchUser } from "../../../lib/user";
import Layout from "../../../components/layout";
import Link from "next/link";

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

  // On the server-side you can check authentication status directly
  // However in general you might want to call API Routes to fetch data
  // An example of directly checking authentication:
  if (typeof window === "undefined") {
    const { user } = await auth0.getSession(req);
    if (!user) {
      res.writeHead(302, {
        Location: "/api/login"
      });
      res.end();
      return;
    }
    const articles = await fetchArticles({ limit: 5, author });

    return { user, articles, author };
  }

  // To do fetches to API routes you can pass the cookie coming from the incoming request on to the fetch
  // so that a request to the API is done on behalf of the user
  // keep in mind that server-side fetches need a full URL, meaning that the full url has to be provided to the application
  const cookie = req && req.headers.cookie;
  const user = await fetchUser(cookie);

  // A redirect is needed to authenticate to Auth0
  if (!user) {
    if (typeof window === "undefined") {
      res.writeHead(302, {
        Location: "/api/login"
      });
      return res.end();
    }

    window.location.href = "/api/login";
  }

  const articles = await fetchArticles({ limit: 5, author });

  return { user, articles, author };
};

export default Profile;
