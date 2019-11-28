<?php

namespace App\Repositories;

use App\Article;
use App\Repositories\Interfaces\ArticleRepositoryInterface;

class ArticleRepository implements ArticleRepositoryInterface
{
    /**
     * Get all articles.
     *
     * @return mixed
     */
    public function all()
    {
        return Article::orderByDesc('created_at')->get();
    }

    /**
     * Get article by id.
     *
     * @return mixed
     */
    public function get(int $article_id)
    {
        return Article::find($article_id);
    }

    /**
     * Get articles by user.
     *
     * @return mixed
     */
    public function getByUser(string $username)
    {
        return Article::where('author', '=',$username)->get();
    }

    /**
     * Create an article.
     *
     * @return mixed
     */
    public function store(string $username, array $article)
    {
        return Article::create([
            "title" => $article['title'],
            "content" => $article['content'],
            "author" => $username
        ]);
    }

    /**
     * Update an article.
     *
     * @param string
     * @param array
     */
    public function update(int $article_id, array $article) {

        Article::find($article_id)->update([
            'content' => $article['content']
        ]);

        return Article::find($article_id);
    }
}