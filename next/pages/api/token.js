import auth0 from "../../lib/auth0";
import nookies from "nookies";

export default async function me(req, res) {
  const session = await auth0.getSession(req);
  const accessToken = session ? session.accessToken : "";
  const explorerToken = nookies.get({ req, res }).manager_access_token || "";

  return res.json({ accessToken, explorerToken });
}
