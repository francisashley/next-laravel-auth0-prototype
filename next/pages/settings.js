import React, { useState } from "react";
import { useFetchUser } from "../lib/user";
import Layout from "../components/layout";
import fetch from "isomorphic-unfetch";

function Settings({ user }) {
  const [name, setNickname] = useState(user.name);
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="jsx-2275513050 shadow rounded bg-white pt-2 pb-4 px-6"
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
      <h3 className="font-semibold border-b py-4 mb-8">General</h3>
      <div className="flex items-center max-w-lg mb-6">
        <div className="w-1/3 text-right text-sm font-medium">
          <label htmlFor="name" className="mr-6">
            Username
          </label>
        </div>
        <div className="w-2/3 flex">
          <input
            type="text"
            value={name}
            id="name"
            onChange={e => setNickname(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="flex items-center max-w-lg mb-6">
        <div className="w-1/3 text-right text-sm font-medium" />
        <button
          className="jsx-4078260806 bg-blue-500 hover:bg-blue-700 text-white font-regular text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {!submitting ? "Save" : "Saving..."}
        </button>
      </div>
    </form>
  );
}

function Profile() {
  const { user, loading } = useFetchUser({ required: true });
  return (
    <Layout user={user} loading={loading} title="Settings">
      {loading ? <>Loading...</> : <Settings user={user} />}
    </Layout>
  );
}

export default Profile;
