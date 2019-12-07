import fetch from "isomorphic-unfetch";
import auth0 from "../../../lib/auth0";

export default async function posts(req, res) {
  const session = await auth0.getSession(req);
  const accessToken = session ? session.accessToken : "";

  if (req.method === "GET") {
    try {
      let post = await fetch("http://localhost:8000/api/v1/posts")
        .then(response => response.json())
        .then(response => response.data)
        .catch(error => {
          throw error;
        });
      res.json({ data: post });
    } catch (error) {
      res.end(error);
    }
  } else if (req.method === "POST") {
    let response = await fetch("http://localhost:8000/api/v1/posts", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "Bearer " + accessToken
      },
      body: JSON.stringify({ title: req.body.title, content: req.body.content })
    });

    if (!response.ok) {
      if (response.status === 401) {
        return res.status(response.status).json(response.statusText);
      } else if (response.status === 422) {
        return res.status(response.status).json(await response.json().then(({ errors }) => errors));
      }
      return res.status(response.status).json(await response.json());
    }

    const post = await response.json().then(response => response.data);

    res.json({ data: post });
  }
}
