<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StorePost;
use App\Http\Requests\UpdatePost;
use App\Http\Resources\PostResource;
use App\Http\Resources\PostCollectionResource;
use App\Services\Auth0Service as Auth0;

use App\Post;
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
    public function get(int $post_id)
    {
        $post =  Post::find($post_id);

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
        $posts = Post::where('author', '=', $username)->get();

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
        $post = Post::create([
            "title" => $request->title,
            "content" => $request->content,
            "author" => Auth::user()->username
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
        if ($post->author !== Auth::user()->username) {
            return response([ 'message' => 'Unauthenticated.' ], 401);
        }

        $post = tap(Post::findOrFail($post->id))->update([
            'content' => $request->content
        ]);

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

        if ($post->author !== Auth::user()->username) {
            return response([ 'message' => 'Unauthenticated.' ], 401);
        }

        $post->delete();

        return response()->json(null, 204);
    }
}
