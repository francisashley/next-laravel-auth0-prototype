import auth0 from "../../lib/auth0";
import nookies from "nookies";

export default async function me(req, res) {
  const { accessToken, ...a } = await auth0.getSession(req);
  let managerToken = nookies.get({ req, res }).manager_access_token;

  return res.json({ accessToken, managerToken });
}
