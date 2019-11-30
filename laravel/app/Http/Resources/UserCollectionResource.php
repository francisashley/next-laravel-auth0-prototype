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
                    'username' => $user->name,
                    'picture' => $user->picture,
                    'articles_count' => $user->articles_count
                ];
            }),
            'meta' => [
                'total' => $this->collection->count()
            ]
        ];
    }
}
