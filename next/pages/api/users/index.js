import fetcher from "../../../lib/fetcher";

export default async function me(req, res) {
  const url = "http://localhost:8000/api/v1/users";

  /**
   * GET USERS
   */

  let { status, data, error } = await fetcher(url).get();

  if (error) {
    console.error(error);
    return res.status(status).json(error);
  }

  return res.json({ data });
}
