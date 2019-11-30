<?php

namespace App\Repositories;

use Auth0\SDK\JWTVerifier;
use App\Services\Auth0Service as Auth0;
use Illuminate\Http\Request;

Use App\Article;

class UserRepository
{
    // Get all users
    public function all()
    {
        $users = Auth0::manager()->users->search();
        $users = json_decode(json_encode($users));

        $users = collect($users)->map(function($user) {
            $user->articles_count = Article::where(['author' => $user->nickname])->count();
            return $user;
        });

        return collect($users);
    }

    // Get user by id
    public function get($username)
    {
        $users = Auth0::manager()->users->search([
            'q' => $username
        ]);
        $key = array_search($username, array_column($users, 'nickname'));
        $user = $key !== false ? $users[$key] : false;

        if ($user) {
            $user = (object) $user;
            $user->articles_count = Article::where(['author' => $user->nickname])->count();
            return $user;
        } else {
            return null;
        }
    }

    public function me()
    {
        $me = Auth0::me();
        $me->articles_count = Article::where(['author' => $me->nickname])->count();
        return $me;
    }

    // Update user
    public function update(string $user_id, array $data)
    {
        $user = (object) Auth0::manager()->users->update($user_id, $data);
        $user->articles_count = Article::where(['author' => $user->nickname])->count();
        return $user;
    }

    // Delete user
    public function delete($id)
    {
        return $this->auth0Manager->destroy($id);
    }
}