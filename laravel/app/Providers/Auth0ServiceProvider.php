<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Request;
use App\Services\Auth0Service as Auth0;


class Auth0ServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $auth0 = new Auth0($this->app->request->bearerToken());

        $this->app->singleton(Auth0::class, function () {
            return $auth0;
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
