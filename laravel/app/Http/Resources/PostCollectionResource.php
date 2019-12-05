<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PostCollectionResource extends ResourceCollection
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
            'data' => $this->collection->map(function($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'author' => $post->user ? $post->user->username : null,
                    'date' => date('Y/m/d h:i:s', strtotime($post->created_at))
                ];
            }),
            'meta' => [
                'total' => $this->collection->count()
            ]
        ];
    }
}
