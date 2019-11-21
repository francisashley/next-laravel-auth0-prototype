import React from "react";

// This import is only needed when checking authentication status directly from getInitialProps
import auth0 from "../lib/auth0";
import { fetchUser } from "../lib/user";
import Layout from "../components/layout";

function Profile({ user }) {
  return (
    <Layout user={user} title="Profile (server rendered)">
      <img className="float-left mr-4" src={user.picture} alt="user picture" />
      <p className="mb-2">
        <strong>Username:</strong> {user.name}
      </p>
      <p className="mb-2">
        <strong>User id:</strong> {user.sub}
      </p>
      <p className="mb-2">
        <strong>Updated at:</strong> {user.updated_at}
      </p>
    </Layout>
  );
}

Profile.getInitialProps = async ({ req, res }) => {
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
    return { user };
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

  return { user };
};

export default Profile;
