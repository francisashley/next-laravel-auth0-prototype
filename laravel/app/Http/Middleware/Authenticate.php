<?php

namespace App\Http\Middleware;

use Closure;
use App\Services\Auth0;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{

    /**
     * Validate an incoming JWT access token.
     *
     * @param \Illuminate\Http\Request $request - Illuminate HTTP Request object.
     * @param Closure $next - Function to call when middleware is complete.
     *
     * @return mixed
     */
    public function handle($request, Closure $next, ...$guards) {
        $accessToken = $request->bearerToken();

        if (! $accessToken) {
            return response()->json(['message' => 'Bearer token missing'], 401);
        }

        try {
            $decodedToken = Auth0::decodeToken($accessToken);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401);
        }

        $this->authenticate($request, $guards);

        return $next($request);
    }
}
