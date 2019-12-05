import fetch from "isomorphic-unfetch";

export default async function user(req, res) {
    try {
        let response = await fetch("http://localhost:8000/api/v1/users/" + req.query.id);

        if (!response.ok && response.status !== 404) {
            throw statusText;
        }

        if (!response.ok) {
            res.json({ data: null });
        }

        let user = await response.json();
        res.json({ data: user.data });
    } catch (error) {
        res.end(error);
    }
}
