<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ArticleCollectionResource extends ResourceCollection
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
            'data' => $this->collection->map(function($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'author' => $article->author,
                    'date' => date('Y/m/d h:i:s', strtotime($article->created_at))
                ];
            }),
            'meta' => [
                'total' => $this->collection->count()
            ]
        ];
    }
}
