import { Error, Errors, Group, Input, Label, Submit, Textarea } from "../../features/form";
import React, { useState } from "react";

import Layout from "../../features/app/layout";
import Router from "next/router";
import api from "../../lib/api";
import withAuth from "../../lib/withAuth";

const CreatePost = ({ authed }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSave = async e => {
    e.preventDefault();

    setSubmitting(true);
    const data = { title: e.target.title.value, content: e.target.content.value };
    const response = await api.post("/api/posts", data);
    setSubmitting(false);

    if (!response.ok && response.status === 401) {
      return setErrors({ authed: false });
    } else if (!response.ok) {
      return setErrors(await response.json());
    }

    setErrors(null);
    const post = await response.json().then(response => response.data);
    Router.push("/posts/" + post.id);
  };

  return (
    <Layout authed={authed} title="Add New Post" className="bg-gray-100">
      <form className="py-4" onSubmit={handleSave}>
        {errors && errors.authed === false && (
          <Error>You are logged out. Please log back in.</Error>
        )}
        <Group>
          <Label htmlFor="title" children="Title" />
          <Input
            name="title"
            placeholder="Title"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          {errors && errors.title && <Errors errors={errors.title} />}
        </Group>
        <Group>
          <Label htmlFor="content" children="Content" />
          <Textarea
            name="content"
            placeholder="Content"
            onChange={e => setContent(e.target.value)}
            value={content}
          />
          {errors && errors.content && <Errors errors={errors.content} />}
        </Group>
        <div className="flex">
          <Submit className="ml-auto">{submitting ? "Saving post..." : "Save post"}</Submit>
        </div>
      </form>
    </Layout>
  );
};

CreatePost.getInitialProps = async ({ authed }) => {
  if (!authed) return { redirect: "/api/login" };

  return {};
};

export default withAuth(CreatePost);
