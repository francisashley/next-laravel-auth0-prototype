<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollectionResource extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection->map(function($user) {
                return [
                    'username' => $user->username,
                    'picture' => $user->picture,
                    'posts_count' => $user->posts->count()
                ];
            }),
            'meta' => [
                'total' => $this->collection->count()
            ]
        ];
    }
}
