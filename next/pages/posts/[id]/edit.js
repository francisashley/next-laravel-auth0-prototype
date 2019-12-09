import { Error, Errors, Group, Input, Label, Submit, Textarea } from "../../../features/form";
import React, { useState } from "react";

import Layout from "../../../features/app/layout";
import Router from "next/router";
import fetcher from "../../../lib/fetcher";
import withAuth from "../../../lib/withAuth";

const EditPost = ({ authed, post }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSave = async e => {
    e.preventDefault();

    setSubmitting(true);
    const data = { title, content };
    const { status, data: updatedPost, error } = await fetcher(`/api/posts/${post.id}`).patch(data);
    setSubmitting(false);

    if (status === 401) return setErrors({ authed: false });

    if (error) return setErrors(error.errors);

    Router.push("/posts/" + updatedPost.id);
  };

  return (
    <Layout authed={authed} title="Edit My Post" className="bg-gray-100">
      <form className="py-4" onSubmit={handleSave}>
        {errors && errors.authed === false && (
          <Error>You are logged out. Please log back in.</Error>
        )}
        <Group>
          <Label htmlFor="title" children="Title" />
          <Input
            name="title"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          {errors && errors.title && <Errors errors={errors.title} />}
        </Group>
        <Group>
          <Label htmlFor="content" children="Content" />
          <Textarea
            name="content"
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          {errors && errors.content && <Errors errors={errors.content} />}
        </Group>
        <div className="flex">
          <Submit className="ml-auto">{submitting ? "Saving changes..." : "Save changes"}</Submit>
        </div>
      </form>
    </Layout>
  );
};

EditPost.getInitialProps = async ({ query, authed }) => {
  if (!authed) return { redirect: "/api/login" };

  const { data: post } = await fetcher("http://localhost:3000/api/posts/" + query.id).get();

  if (post.author !== authed.name) return { redirect: "/api/login" };

  return { post };
};

export default withAuth(EditPost);
