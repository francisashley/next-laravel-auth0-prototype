import React, { useState } from "react";
import { useFetchUser } from "../lib/user";
import Layout from "../components/layout";

function Settings({ user }) {
  const [nickname, setNickname] = useState(user.nickname);
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
      <h1>Settings</h1>

      <form
        onSubmit={e => {
          e.preventDefault();
          setSubmitting(true);

          const nickname = e.target.elements.nickname.value;
        }}
      >
        <h3>General</h3>
        <div className="form-group">
          <label htmlFor="nickname">Nickname </label>
          <input
            type="text"
            value={nickname}
            id="nickname"
            onChange={e => setNickname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label></label>
          <button type="submit">{!submitting ? "SAVE" : "Saving..."}</button>
        </div>
      </form>

      <style jsx>{`
        form {
          background: #f5f5f5;
          padding: 15px;
        }
        h3 {
          font-size: 16px;
          font-weight: 400;
          border-bottom: lightgrey thin solid;
          padding: 10px;
          margin-top: 0;
        }
        .form-group {
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          max-width: 450px;
        }
        label {
          font-weight: 500;
          margin-right: 1.5rem;
          width: 25%;
          text-align: right;
          font-size: 14px;
        }
        input {
          padding: 10px;
          font-size: 14px;
          border-radius: 4px;
          border: thin solid lightgrey;
          flex: 1;
        }
        button {
          padding: 8px 15px;
          background: hsl(199, 98%, 48%);
          color: white;
          border: thin rgba(0, 0, 0, 0.1) solid;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 200;
          letter-spacing: 0.6px;
          cursor: pointer;
          outline: 0;
          transition: background 150ms ease-out;
        }
        button:hover {
          background: hsl(199, 98%, 44%);
        }
        button:active {
          background: hsl(199, 98%, 38%);
        }
      `}</style>
    </>
  );
}

function Profile() {
  const { user, loading } = useFetchUser({ required: true });

  return (
    <Layout user={user} loading={loading}>
      {loading ? <>Loading...</> : <Settings user={user} />}
    </Layout>
  );
}

export default Profile;
