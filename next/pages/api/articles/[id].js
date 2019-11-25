import fetch from "isomorphic-unfetch";

export default async function me(req, res) {
  try {
    let article = await fetch("http://localhost:8000/api/articles/" + req.query.id)
      .then(response => response.json())
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
    res.json({ data: article });
  } catch (error) {
    res.end(error);
  }
}
