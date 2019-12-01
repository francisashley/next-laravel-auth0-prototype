import fetch from "isomorphic-unfetch";

export default async function me(req, res) {
    try {
        let post = await fetch("http://localhost:8000/api/v1/posts/" + req.query.id)
            .then(response => response.json())
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
        res.json({ data: post });
    } catch (error) {
        res.end(error);
    }
}
