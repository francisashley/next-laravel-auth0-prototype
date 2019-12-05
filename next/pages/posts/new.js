import React, { useState } from "react";
import Layout from "../../components/layout";
import Panel from "../../components/panel";
import withAuth from "../../lib/withAuth";

function CreatePost({ authed, postId }) {
    const [title, setTitle] = useState("Title");
    const [content, setContent] = useState("Content");

    return (
        <Layout authed={authed} title={`Create post`}>
            <Panel title="Create post">
                <form className="py-4">
                    <div class="flex flex-col mb-6">
                        <label className="text-sm font-medium mb-2">Title</label>
                        <input
                            type="text"
                            className="bg-gray-400 p-2 px-3 w-2/3"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div class="flex flex-col mb-6">
                        <label className="text-sm font-medium mb-2">Content</label>
                        <textarea
                            type="text"
                            className="bg-gray-400 p-2 px-3 h-48"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                    </div>
                    <div class="flex">
                        <button className="bg-blue-600 ml-auto text-sm text-white py-1 px-2">
                            Save post
                        </button>
                    </div>
                </form>
            </Panel>
        </Layout>
    );
}

CreatePost.getInitialProps = async ({ authed }) => {
    if (!authed) return { redirect: "/api/login" };

    return {};
};

export default withAuth(CreatePost);
