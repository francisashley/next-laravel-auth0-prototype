<?php

namespace App\Repositories\Interfaces;

use App\Post;

interface PostRepositoryInterface
{
    /**
     * Get all posts.
     *
     * @return mixed
     */
    public function all();

    /**
     * Get post by id.
     *
     * @param int
     */
    public function get(int $post_id);

    /**
     * Get posts by user.
     *
     * @param string
     */
    public function getByUser(string $username);

    /**
     * Create an post.
     *
     * @param string
     * @param array
     */
    public function store(string $username, array $post);

    /**
     * Update an post.
     *
     * @param string
     * @param array
     */
    public function update(int $post_id, array $post);
}