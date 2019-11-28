<?php

namespace App\Repositories\Interfaces;

use App\Article;

interface ArticleRepositoryInterface
{
    /**
     * Get all articles.
     *
     * @return mixed
     */
    public function all();

    /**
     * Get article by id.
     *
     * @param int
     */
    public function get(int $article_id);

    /**
     * Get articles by user.
     *
     * @param string
     */
    public function getByUser(string $username);

    /**
     * Create an article.
     *
     * @param string
     * @param array
     */
    public function store(string $username, array $article);

    /**
     * Update an article.
     *
     * @param string
     * @param array
     */
    public function update(int $article_id, array $article);
}