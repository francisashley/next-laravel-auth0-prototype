import fetch from "isomorphic-unfetch";
import auth0 from "../../../lib/auth0";

export default async function post(req, res) {
  const session = await auth0.getSession(req);
  const accessToken = session ? session.accessToken : "";

  if (req.method === "GET") {
    try {
      let response = await fetch("http://localhost:8000/api/v1/posts/" + req.query.id);

      if (!response.ok && response.status !== 404) {
        throw statusText;
      }

      if (!response.ok) {
        res.json({ data: null });
      }

      let post = await response.json();
      res.json({ data: post.data });
    } catch (error) {
      res.end(error);
    }
  } else if (req.method === "PATCH") {
    let response = await fetch("http://localhost:8000/api/v1/posts/" + req.query.id, {
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "Bearer " + accessToken
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      if (response.status === 401) {
        return res.status(response.status).json(response.statusText);
      } else if (response.status === 422) {
        return res.status(response.status).json(await response.json());
      }
      return res.status(response.status).json(await response.json());
    }

    const post = await response.json().then(response => response.data);

    res.json({ data: post });
  }
}
