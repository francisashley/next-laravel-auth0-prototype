<?php

namespace App\Services;

use Auth0\SDK\API\Management;
use Auth0\SDK\JWTVerifier;

class Auth0
{
    private static $manager;

    public static function manager()
    {
        if (! self::$manager) {
            self::$manager = new Management(getenv('AUTH0_MANAGER_TOKEN'), getenv('AUTH0_DOMAIN'));
        }

        return self::$manager;
    }

    public static function decodeToken($accessToken)
    {
        $jwtVerifier = new JWTVerifier([
            'authorized_iss' => config('laravel-auth0.authorized_issuers'),
            'valid_audiences' => [config('laravel-auth0.api_identifier')],
            'supported_algs' => config('laravel-auth0.supported_algs'),
        ]);

        return $jwtVerifier->verifyAndDecode($accessToken);
    }

    public static function getUserByUsername($username)
    {
        $users = self::manager()->users->search([
            'q' => $username
        ]);
        $key = array_search($username, array_column($users, 'nickname'));
        $user = $key !== false ? $users[$key] : false;

        if ($user) {
            return json_decode(json_encode((object) $user));
        } else {
            return null;
        }
    }

    public static function getUserByToken($accessToken)
    {
        $client = new \GuzzleHttp\Client();

        $url = 'https://' . env('AUTH0_DOMAIN') . '/userinfo';

        $clientOptions = [
            'headers' => [ 'authorization' => 'Bearer ' . $accessToken ]
        ];

        return json_decode((string) $client->get($url, $clientOptions)->getBody());
    }

    public static function getAllUsers()
    {
        $users = self::manager()->users->search();
        return collect(json_decode(json_encode($users)));
    }

    public static function updateUser($user_id, $data)
    {
        return (object) self::manager()->users->update($user_id, $data);
    }
}