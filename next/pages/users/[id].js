import { Input, Label, Submit } from "../../features/form";
import React, { useState } from "react";

import Error from "next/error";
import Layout from "../../features/app/layout";
import Link from "next/link";
import { fetchPosts } from "../../lib/posts";
import { fetchUser } from "../../lib/users";
import withAuth from "../../lib/withAuth";

function Profile({ authed = {}, posts = [], user }) {
  const [name, setNickname] = useState(user.username);
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return <Error statusCode={404} />;
  }

  return (
    <Layout authed={authed}>
      <div className="flex">
        <div className="w-24 h-24 mr-8">
          <img src={user.picture} alt="user picture" />
        </div>
        <div className="border-l pl-8">
          <h1 className="text-4xl font-medium">{user.username}</h1>
          <small className="text-gray-700">{user.sub}</small>
          <hr class="my-6" />
          <h2 className="text-l mb-4">
            {authed && authed.name === user.username
              ? `My posts x ${user.posts_count}`
              : `Posts by ${user.username} (${user.posts_count})`}
          </h2>

          <ul>
            {posts.map(post => (
              <li key={post.id}>
                👉{" "}
                <Link href={`/posts/[id]`} as={`/posts/${post.id}`}>
                  <a className="text-blue-600 hover:underline text-md">{post.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {authed && authed.name === user.username && (
        <form
          className="bg-gray-100 py-10 pb-12 px-10 -mx-10 -mb-10 border-t mt-10"
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
          <h2 className="text-2xl mb-8">Account Settings</h2>
          <hr className="my-8 border-gray-400" />
          <div className="flex mb-6">
            <h3 className="text-lg w-1/3 font-medium">Basics</h3>
            <div className="w-2/3">
              <Label>Username</Label>
              <Input value={name} name="name" onChange={e => setNickname(e.target.value)} />
            </div>
          </div>
          <div className="flex">
            <div class="w-1/3"></div>
            <Submit>{!submitting ? "Save Settings" : "Saving..."}</Submit>
          </div>
        </form>
      )}
    </Layout>
  );
}

Profile.getInitialProps = async ({ req, res, query }) => {
  const posts = await fetchPosts({ author: query.id });
  const user = await fetchUser(query.id);

  return { posts, user };
};

export default withAuth(Profile);
