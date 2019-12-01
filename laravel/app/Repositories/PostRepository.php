<?php

namespace App\Repositories;

use App\Post;
use App\Repositories\Interfaces\PostRepositoryInterface;

class PostRepository implements PostRepositoryInterface
{
    /**
     * Get all posts.
     *
     * @return mixed
     */
    public function all()
    {
        return Post::orderByDesc('created_at')->get();
    }

    /**
     * Get post by id.
     *
     * @return mixed
     */
    public function get(int $post_id)
    {
        return Post::find($post_id);
    }

    /**
     * Get posts by user.
     *
     * @return mixed
     */
    public function getByUser(string $username)
    {
        return Post::where('author', '=',$username)->get();
    }

    /**
     * Create an post.
     *
     * @return mixed
     */
    public function store(string $username, array $post)
    {
        return Post::create([
            "title" => $post['title'],
            "content" => $post['content'],
            "author" => $username
        ]);
    }

    /**
     * Update an post.
     *
     * @param string
     * @param array
     */
    public function update(int $post_id, array $post) {

        Post::find($post_id)->update([
            'content' => $post['content']
        ]);

        return Post::find($post_id);
    }
}