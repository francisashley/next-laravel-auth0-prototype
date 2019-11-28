<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreArticle;
use App\Http\Requests\UpdateArticle;
use App\Repositories\ArticleRepository;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\ArticleCollectionResource;

use App\Article;

class ArticleController extends Controller
{
    private $articleRepository;

    public function __construct(ArticleRepository $articleRepository) {
        $this->articles = $articleRepository;
    }

    /**
     * Get all articles.
     *
     * @return App\Http\Resources\ArticleCollectionResource
     */
    public function index()
    {
        $articles = $this->articles->all();

        return new ArticleCollectionResource($articles);
    }

    /**
     * Get article by id.
     *
     * @param  int  $article_id
     * @return App\Http\Resources\ArticleResource
     */
    public function get(int $article_id)
    {
        $article = $this->articles->get($article_id);

        return new ArticleResource($article);
    }

    /**
     * Get articles by user.
     *
     * @param  string  $username
     * @return App\Http\Resources\ArticleCollectionResource
     */
    public function getByUser(string $username)
    {
        $articles = $this->articles->getByUser($username);

        return new ArticleResource($articles);
    }

    /**
     * Create an article.
     *
     * @param  App\Http\Requests\StoreArticle  $request
     * @return App\Http\Resources\ArticleResource
     */
    public function store(StoreArticle $request)
    {
        $article = $this->articles->store('cornsilk', [
            "title" => $request->title,
            "content" => $request->content
        ]);

        return new ArticleResource($article);
    }

    /**
     * Update an article.
     *
     * @param  App\Http\Requests\UpdateArticle  $request
     * @param  string  $article_id
     * @return App\Http\Resources\ArticleResource
     */
    public function update(UpdateArticle $request, string $article_id)
    {
        $article = $this->articles->update($article_id, [
            "content" => $request->content
        ]);

        return new ArticleResource($article);
    }

    /**
     * Delete an article.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
      $article->delete();

      return response()->json(null, 204);
    }
}
