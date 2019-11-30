<?php

namespace App\Http\Middleware;

use Closure;
use Auth0\SDK\JWTVerifier;
use App\Services\Auth0Service as Auth0;

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

        if (! $accessToken) {
            return response()->json(['message' => 'Bearer token missing'], 401);
        }

        try {
            $decodedToken = Auth0::decodeToken($accessToken);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401);
        }

        if ($scopeRequired && !Auth0::tokenHasScope($decodedToken, $scopeRequired)) {
            return response()->json(['message' => 'Insufficient scope'], 403);
        }

        return $next($request);
    }
}
