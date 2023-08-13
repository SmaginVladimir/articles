<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ArticleRequest;
use App\Services\Admin\ArticleService as AdminArticleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    protected AdminArticleService $adminArticleService;

    /**
     * ArticleController constructor.
     * @param AdminArticleService $adminArticleService
     */
    public function __construct(AdminArticleService $adminArticleService)
    {
        $this->adminArticleService = $adminArticleService;
    }

    /**
     * @param ArticleRequest $request
     * @return JsonResponse
     */
    public function create(ArticleRequest $request): JsonResponse
    {
        return $this->adminArticleService->create($request->validated());
    }

    /**
     * @param int $id
     * @param ArticleRequest $request
     * @return JsonResponse
     */
    public function update(int $id, ArticleRequest $request): JsonResponse
    {
        return $this->adminArticleService->update($id, $request->validated());
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        return $this->adminArticleService->delete($id);
    }

}
