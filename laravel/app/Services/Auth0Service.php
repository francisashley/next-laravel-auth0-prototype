<?php

namespace App\Services;

use Auth0\SDK\API\Management;
use Auth0\SDK\JWTVerifier;

class Auth0Service
{
    private static $accessToken;
    private static $decodedToken;
    private static $me;
    private static $manager;

    public function __construct($accessToken)
    {
        if (! $accessToken) {
            return;
        }

        try {
            self::$decodedToken = self::decodeToken($accessToken);
            self::$accessToken = $accessToken;
        } catch (\Exception $error) { }
    }

    /**
     * Get token that was provided with HTTP request.
     *
     * @return string
     */
    public static function token()
    {
        return self::$accessToken;
    }

    /**
     * Get the decoded access token.
     *
     * @return string
     */
    public static function decodedToken()
    {
        return self::$decodedToken;
    }

    /**
     * Check if a token has a specific scope.
     *
     * @param string $accessToken - JWT access token to check.
     *
     * @return array
     */
    public static function decodeToken($accessToken)
    {
        $jwtVerifier = new JWTVerifier([
            'authorized_iss' => config('laravel-auth0.authorized_issuers'),
            'valid_audiences' => [config('laravel-auth0.api_identifier')],
            'supported_algs' => config('laravel-auth0.supported_algs'),
        ]);

        return $jwtVerifier->verifyAndDecode($accessToken);
    }

    /**
     * Check if a token has a specific scope.
     *
     * @param string $token - decoded JWT access token to check.
     * @param string $scopeRequired - Scope to check for.
     *
     * @return bool
     */
    public static function tokenHasScope($token, $scopeRequired)
    {
        if (empty($token->scope)) {
            return false;
        }

        $tokenScopes = explode(' ', $token->scope);

        return in_array($scopeRequired, $tokenScopes);
    }

    /**
     * Get user info associated with access token.
     *
     * @return bool
     */
    public static function me()
    {
        if (self::$me) {
            return self::$me;
        }

        $client = new \GuzzleHttp\Client();

        $url = 'https://' . env('AUTH0_DOMAIN') . '/userinfo';

        $clientOptions = [
            'headers' => [ 'authorization' => 'Bearer ' . self::$accessToken ]
        ];

        self::$me = json_decode((string) $client->get($url, $clientOptions)->getBody());

        return self::$me;
    }

    /**
     * Get auth0 Manager API.
     *
     * @return bool
     */
    public static function manager()
    {
        if (! self::$manager) {
            self::$manager = new Management(getenv('AUTH0_MANAGER_TOKEN'), getenv('AUTH0_DOMAIN'));
        }

        return self::$manager;
    }
}