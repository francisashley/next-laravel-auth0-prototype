import auth0 from "./auth0";
import nookies from "nookies";

const getToken = async (req, res) => {
  let manager_access_token = nookies.get({ req, res }).manager_access_token;

  if (manager_access_token) {
    return manager_access_token;
  }

  let response = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.AUTH0_MANAGER_CLIENT_ID,
      client_secret: process.env.AUTH0_MANAGER_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: "client_credentials"
    })
  });

  if (response.ok) {
    response = await response.json();
    manager_access_token = response.access_token;
  } else {
    manager_access_token = "";
  }

  nookies.set({ req, res }, "manager_access_token", manager_access_token, {
    maxAge: response.expires_in,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });

  return manager_access_token;
};

async function updateUserInfo(req, res, data) {
  const token = await getToken(req, res);
  const { user } = await auth0.getSession(req);
  const user_id = user.sub;

  const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${user_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token
    },
    body: JSON.stringify(req.body)
  });

  if (response.ok) {
    return res.json({ data: response.json() });
  } else {
    return res.status(response.status).end(response.message);
  }
}

export default {
  updateUserInfo
};
