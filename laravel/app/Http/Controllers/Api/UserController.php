<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserCollectionResource;
use App\Http\Requests\UpdateUser;
use App\Services\Auth0Service as Auth0;

use App\User;

class UserController extends Controller
{
    /**
     * Get all users.
     *
     * @return App\Http\Resources\UserCollectionResource
     */
    public function index()
    {
        $users = Auth0::manager()->users->search();
        $users = collect(json_decode(json_encode($users)));

        return new UserCollectionResource(User::all());
    }

    /**
     * Get user by username.
     *
     * @param  string  $username
     * @return App\Http\Resources\UserResource
     */
    public function get(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Get user from accessToken.
     *
     * @param  string  $username
     * @return App\Http\Resources\UserCollectionResource
     */
    public function me()
    {
        return new UserResource(\Auth::user());
    }

    /**
     * Update user.
     *
     * @param  string  $username
     * @return App\Http\Resources\UserCollectionResource
     */
    public function update(UpdateUser $request)
    {
        $user_id = \Auth::user()->auth0_id;

        $me = (object) Auth0::manager()->users->update($user_id,
            [ 'username' => $request->username ]
        );

        return new UserResource(\Auth::user());
    }
}
