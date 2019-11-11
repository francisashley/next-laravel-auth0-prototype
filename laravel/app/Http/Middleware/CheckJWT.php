<?php

namespace App\Http\Middleware;

use Closure;
use Auth0\SDK\JWTVerifier;

class CheckJWT
{
    /**
     * Validate an incoming JWT access token.
     *
     * @param \Illuminate\Http\Request $request - Illuminate HTTP Request object.
     * @param Closure $next - Function to call when middleware is complete.
     *
     * @return mixed
     */
    public function handle($request, Closure $next, $scopeRequired = null) {
        $accessToken = $request->bearerToken();

        if (empty($accessToken)) {
            return response()->json(['message' => 'Bearer token missing'], 401);
        }

        $laravelConfig = config('laravel-auth0');
        $jwtConfig = [
            'authorized_iss' => $laravelConfig['authorized_issuers'],
            'valid_audiences' => [$laravelConfig['api_identifier']],
            'supported_algs' => $laravelConfig['supported_algs'],
        ];

        try {
            $jwtVerifier = new JWTVerifier($jwtConfig);
            $decodedToken = $jwtVerifier->verifyAndDecode($accessToken);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401);
        }

        if ($scopeRequired && !$this->tokenHasScope($decodedToken, $scopeRequired)) {
            return response()->json(['message' => 'Insufficient scope'], 403);
        }

        return $next($request);
    }

    /**
     * Check if a token has a specific scope.
     *
     * @param \stdClass $token - JWT access token to check.
     * @param string $scopeRequired - Scope to check for.
     *
     * @return bool
     */
    protected function tokenHasScope($token, $scopeRequired) {

        if (empty($token->scope)) {
            return false;
        }

        $tokenScopes = explode(' ', $token->scope);
        return in_array($scopeRequired, $tokenScopes);
    }
}
