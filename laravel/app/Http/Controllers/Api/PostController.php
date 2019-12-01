<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StorePost;
use App\Http\Requests\UpdatePost;
use App\Repositories\PostRepository;
use App\Http\Resources\PostResource;
use App\Http\Resources\PostCollectionResource;
use App\Services\Auth0Service as Auth0;

use App\Post;

class PostController extends Controller
{
    private $postRepository;

    public function __construct(PostRepository $postRepository) {
        $this->posts = $postRepository;
    }

    /**
     * Get all posts.
     *
     * @return App\Http\Resources\PostCollectionResource
     */
    public function index()
    {
        $posts = $this->posts->all();

        return new PostCollectionResource($posts);
    }

    /**
     * Get post by id.
     *
     * @param  int  $post_id
     * @return App\Http\Resources\PostResource
     */
    public function get(int $post_id)
    {
        $post = $this->posts->get($post_id);

        return new PostResource($post);
    }

    /**
     * Get posts by user.
     *
     * @param  string  $username
     * @return App\Http\Resources\PostCollectionResource
     */
    public function getByUser(string $username)
    {
        $posts = $this->posts->getByUser($username);

        return new PostCollectionResource($posts);
    }

    /**
     * Create an post.
     *
     * @param  App\Http\Requests\StorePost  $request
     * @return App\Http\Resources\PostResource
     */
    public function store(StorePost $request)
    {
        $username = Auth0::me()->nickname;

        $post = $this->posts->store($username, [
            "title" => $request->title,
            "content" => $request->content
        ]);

        return new PostResource($post);
    }

    /**
     * Update an post.
     *
     * @param  App\Http\Requests\UpdatePost  $request
     * @param  \App\Post  $post
     * @return App\Http\Resources\PostResource
     */
    public function update(UpdatePost $request, Post $post)
    {
        $username = Auth0::me()->nickname;

        if ($post->author === $username) {
            $post = $this->posts->update($post->id, [
                "content" => $request->content
            ]);

            return new PostResource($post);
        }

        return response([ 'message' => 'Unauthenticated.' ], 401);
    }

    /**
     * Delete an post.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $username = Auth0::me()->nickname;

        if ($post->author === $username) {
            $post->delete();

            return response()->json(null, 204);
        }

        return response([ 'message' => 'Unauthenticated.' ], 401);
    }
}
