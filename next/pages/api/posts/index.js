import auth0 from "../../../lib/auth0";
import fetcher from "../../../lib/fetcher";

export default async function posts(req, res) {
  const url = "http://localhost:8000/api/v1/posts";
  const session = await auth0.getSession(req);
  const accessToken = session && session.accessToken;

  /**
   * GET POSTS
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
   * Create POST
   */

  if (req.method === "POST") {
    let { status, data, error } = await fetcher(url, { accessToken }).post(req.body);

    if (error) {
      console.error(error);
      return res.status(status).json(error);
    }

    return res.status(status).json({ data });
  }
}
