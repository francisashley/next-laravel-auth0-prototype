import React, { useState } from "react";
import Layout from "../../../components/layout";
import Panel from "../../../components/panel";
import withAuth from "../../../lib/withAuth";
import Router from "next/router";
import api from "../../../lib/api";
import { Label, Input, Textarea, Submit, Errors, Group } from "../../../features/post-form";
import { fetchPost } from "../../../lib/posts";

const EditPost = ({ authed, post }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSave = async e => {
    e.preventDefault();

    setSubmitting(true);
    let response = await api.patch("/api/posts/" + post.id, {
      title: e.target.title.value,
      content: e.target.content.value
    });
    setSubmitting(false);

    if (!response.ok && response.status === 401) {
      return setErrors({ authed: false });
    } else if (!response.ok) {
      return setErrors(await response.json().then(response => response.errors));
    }

    setErrors(null);
    post = await response.json().then(response => response.data);
    Router.push("/posts/" + post.id);
  };

  return (
    <Layout authed={authed} title={`Edit post`}>
      <Panel title="Edit post">
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
            <Submit>{submitting ? "Saving post..." : "Save post"}</Submit>
          </div>
        </form>
      </Panel>
    </Layout>
  );
};

EditPost.getInitialProps = async ({ query, authed }) => {
  if (!authed) return { redirect: "/api/login" };

  const post = await fetchPost(query.id);

  if (post.author !== authed.name) return { redirect: "/api/login" };

  return { post };
};

export default withAuth(EditPost);
