import fetch from "isomorphic-unfetch";

export default async function me(req, res) {
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
}
