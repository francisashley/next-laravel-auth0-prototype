import auth0 from "../../../lib/auth0";
import fetcher from "../../../lib/fetcher";

export default async function post(req, res) {
  const url = `http://localhost:8000/api/v1/posts/${req.query.id}`;
  const session = await auth0.getSession(req);
  const accessToken = session && session.accessToken;

  /**
   * GET POST
   */

  if (req.method === "GET") {
    let { status, data, error } = await fetcher(url).get();

    if (error) {
      console.error(error);
      return res.status(status).json(error);
    }

    return res.json({ data });
  }

  /**
   * PATCH POST
   */

  if (req.method === "PATCH") {
    let { status, data, error } = await fetcher(url, { accessToken }).patch(req.body);

    if (error) {
      console.error(error);
      return res.status(status).json(error);
    }

    res.json({ data });
  }
}
