<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePost;
use App\Http\Requests\UpdatePost;
use App\Http\Resources\PostResource;
use App\Http\Resources\PostCollectionResource;

use App\Post;
use App\User;
use \Auth;

class PostController extends Controller
{
    /**
     * Get all posts.
     *
     * @return App\Http\Resources\PostCollectionResource
     */
    public function index()
    {
        $posts =  Post::orderByDesc('created_at')->get();

        return new PostCollectionResource($posts);
    }

    /**
     * Get post by id.
     *
     * @param  int  $post_id
     * @return App\Http\Resources\PostResource
     */
    public function get(Post $post)
    {
        return new PostResource($post);
    }

    /**
     * Get posts by user.
     *
     * @param  \AppUser  $user
     * @return App\Http\Resources\PostCollectionResource
     */
    public function getByUser(User $user)
    {
        return new PostCollectionResource($user->posts);
    }

    /**
     * Create an post.
     *
     * @param  App\Http\Requests\StorePost  $request
     * @return App\Http\Resources\PostResource
     */
    public function store(StorePost $request)
    {
        $post = Post::create([
            "title" => $request->title,
            "content" => $request->content,
            "user_id" => Auth::user()->auth0_id
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
        if ($post->user->auth0_id !== Auth::user()->auth0_id) {
            return response([ 'message' => 'Unauthenticated.' ], 401);
        }

        $data['title'] = $request->title;
        $data['content'] = $request->content !== null ? $request->content : '';

        $post = tap(Post::findOrFail($post->id))->update($data);

        return new PostResource($post);
    }

    /**
     * Delete an post.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $username = Auth::user()->username;

        if ($post->user->auth0_id !== Auth::user()->auth0_id) {
            return response([ 'message' => 'Unauthenticated.' ], 401);
        }

        $post->delete();

        return response()->json(null, 204);
    }
}
