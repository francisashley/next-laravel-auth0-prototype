<?php

namespace App\Auth;

use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Auth\UserProvider as UserProviderContract;
use Auth0\SDK\JWTVerifier;
use \App\Services\Auth0;

class UserProvider extends EloquentUserProvider implements UserProviderContract
{
    /**
     * Retrieve a user by the given credentials.
     *
     * @param  array  $credentials
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveByCredentials(array $credentials)
    {
        $accessToken = $credentials['api_token'];

        // Make changes
        if (! $accessToken) {
            return;
        }

        $jwtVerifier = new JWTVerifier([
            'authorized_iss' => config('laravel-auth0.authorized_issuers'),
            'valid_audiences' => [config('laravel-auth0.api_identifier')],
            'supported_algs' => config('laravel-auth0.supported_algs'),
        ]);

        try {
            $decodedToken = $jwtVerifier->verifyAndDecode($accessToken);
        } catch (\Exception $e) {
            return;
        }

        $auth0_user_id = $decodedToken->sub;

        $query = $this->createModel()->newQuery();
        $query->where('auth0_id', $auth0_user_id);

        $user = $query->first();

        if (!$user) {
            $auth0user = Auth0::getUserByToken($accessToken);
        }

        if (isset($auth0user)) {
            $user = \App\User::create([
                "auth0_id" => $auth0user->sub,
                "username" => $auth0user->name,
                "picture" => $auth0user->picture
            ]);
        }

        return $user;
    }
}