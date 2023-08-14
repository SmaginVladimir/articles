<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Services\ArticleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ArticleController extends Controller
{

    protected ArticleService $articleService;

    /**
     * ArticleController constructor.
     * @param ArticleService $articleService
     */
    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    /**
     * @param int|string $page
     * @return AnonymousResourceCollection
     */
    public function index(int|string $page): AnonymousResourceCollection
    {
        return $this->articleService->all($page);
    }


    /**
     * @param int $id
     * @return ArticleResource|JsonResponse
     */
    public function show(int $id): ArticleResource|JsonResponse
    {
        return $this->articleService->show($id);
    }


    /**
     * @param int $id
     * @param int|string $page
     * @return JsonResponse|AnonymousResourceCollection
     */
    public function articlesAllByCategoryId(int $id, int|string $page): JsonResponse|AnonymousResourceCollection
    {
        return $this->articleService->articlesAllByCategoryId($id, $page);
    }


    /**
     * @param string $slug
     * @return ArticleResource|JsonResponse
     */
    public function searchArticleBySlug(string $slug): ArticleResource|JsonResponse
    {
        return $this->articleService->searchArticleBySlug($slug);
    }
}
