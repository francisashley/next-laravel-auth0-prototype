<?php

namespace App\Auth;

use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Auth\UserProvider as UserProviderContract;
use Auth0\SDK\JWTVerifier;

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
            $client = new \GuzzleHttp\Client();

            $url = 'https://' . env('AUTH0_DOMAIN') . '/userinfo';

            $clientOptions = [
                'headers' => [ 'authorization' => 'Bearer ' . $accessToken ]
            ];

            $user = json_decode((string) $client->get($url, $clientOptions)->getBody());

            $user = \App\User::create([
                "auth0_id" => $user->sub,
                "username" => $user->name,
                "picture" => $user->picture
            ]);
        }

        return $user;
    }
}