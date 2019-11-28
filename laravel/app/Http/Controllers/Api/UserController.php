<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\UserRepository;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserCollectionResource;
use App\Http\Requests\UpdateUser;
use \App\Services\Auth0Service as Auth0;

class UserController extends Controller
{
    private $usersRepository;

    public function __construct(UserRepository $userRepository) {
        $this->users = $userRepository;
    }

    /**
     * Get all users.
     *
     * @return App\Http\Resources\UserCollectionResource
     */
    public function index()
    {
        $users = $this->users->all();

        return new UserCollectionResource($users);
    }

    /**
     * Get user by username.
     *
     * @param  string  $username
     * @return App\Http\Resources\UserResource
     */
    public function get(string $username)
    {
        $user = $this->users->get($username);

        return new UserResource($user);
    }

    /**
     * Get user from accessToken.
     *
     * @param  string  $username
     * @return App\Http\Resources\UserCollectionResource
     */
    public function me(Request $request)
    {
        $me = $this->users->me();

        return new UserResource($me);
    }

    /**
     * Update user.
     *
     * @param  string  $username
     * @return App\Http\Resources\UserCollectionResource
     */
    public function update(UpdateUser $request)
    {
        $user_id = Auth0::decodedToken()->sub;

        $me = $this->users->update($user_id, [ 'username' => $request->username ]);

        return new UserResource($me);
    }
}
