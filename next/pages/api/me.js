import auth0 from "../../lib/auth0";
import manager from "../../lib/manager";

export default async function me(req, res) {
  /**
   * GET AUTHED USER
   */
  if (req.method === "GET") {
    try {
      await auth0.handleProfile(req, res);
    } catch (error) {
      console.error(error);
      res.status(error.status || 500).end(error.message);
    }
    return;
  }

  /**
   * UPDATE AUTHED USER
   */
  if (req.method === "PATCH") {
    try {
      await manager.updateUserInfo(req, res, req.body);
    } catch (error) {
      console.error(error);
      res.status(error.status || 500).end(error.message);
    }
    return;
  }

  /**
   * REQUEST NOT FOUND
   */
  res.status(404).end();
}
