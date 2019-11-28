<?php

namespace App\Repositories;

use App\Helpers\Auth0Manager;
use Auth0\SDK\JWTVerifier;

class UsersRepository
{
    // model property on class instances
    protected $model;

    // Constructor to bind model to repo
    public function __construct(string $accessToken)
    {
        $this->accessToken = $accessToken;

        try {
            $this->auth0Manager = new Auth0Manager($accessToken);
        } catch (\Exception $e) {
            throw new \Exception('Could not establish a connection to Auth0Manager in UsersRepository.php');
        }
        try {
          $laravelConfig = config('laravel-auth0');
          $jwtConfig = [
            'authorized_iss' => $laravelConfig['authorized_issuers'],
            'valid_audiences' => [$laravelConfig['api_identifier']],
            'supported_algs' => $laravelConfig['supported_algs'],
          ];

          $jwtVerifier = new JWTVerifier($jwtConfig);
          $this->id = $jwtVerifier->verifyAndDecode($accessToken)->sub;
        } catch (\Exception $e) {
            throw new \Exception('Could not decode token in UsersRepository.php');
        }
    }

    // Get all users
    public function all()
    {
        return $this->auth0Manager->all();
    }

    // Get user by id
    public function get($id)
    {
        return $this->auth0Manager-findOrFail($id);
    }

    public function user()
    {
        $client = new \GuzzleHttp\Client();
        $request = $client->get('https://' . env('AUTH0_DOMAIN') . '/userinfo' , [
            'headers' => [
                'authorization' => 'Bearer ' . $this->accessToken
            ]
        ]);
        $response = (string) $request->getBody();

        return json_decode($response);
    }

    // Update user
    public function update(array $data, $id)
    {
        $record = $this->find($id);
        return $record->update($data);
    }

    // Delete user
    public function delete($id)
    {
        return $this->auth0Manager->destroy($id);
    }
}