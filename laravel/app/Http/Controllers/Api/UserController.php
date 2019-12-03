<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserCollectionResource;
use App\Http\Requests\UpdateUser;
use App\Services\Auth0;

use App\User;
use Auth;

class UserController extends Controller
{
    /**
     * Get all users.
     *
     * @return App\Http\Resources\UserCollectionResource
     */
    public function index()
    {
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
        return new UserResource(Auth::user());
    }

    /**
     * Update user.
     *
     * @param  string  $username
     * @return App\Http\Resources\UserCollectionResource
     */
    public function update(UpdateUser $request)
    {
        $data = [ 'username' => $request->username ];

        $auth0User = Auth0::updateUser(Auth::user()->auth0_id, $data);

        $user = User::where('auth0_id', $auth0User->user_id)->firstOrFail();
        $user->username = $data['username'];
        $user->save();

        return new UserResource($user);
    }
}
