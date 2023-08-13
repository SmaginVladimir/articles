<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Services\Admin\CategoryService as AdminCategoryService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;


class CategoryController extends Controller
{

    protected AdminCategoryService $adminCategoryService;

    /**
     * ArticleController constructor.
     * @param AdminCategoryService $adminCategoryService
     */
    public function __construct(AdminCategoryService $adminCategoryService)
    {
        $this->adminCategoryService = $adminCategoryService;
    }

    /**
     * @param CategoryRequest $request
     * @return JsonResponse
     */
    public function create(CategoryRequest $request): JsonResponse
    {
        return $this->adminCategoryService->create($request->validated());
    }

    /**
     * @param int $id
     * @param CategoryRequest $request
     * @return JsonResponse
     */
    public function update(int $id, CategoryRequest $request): JsonResponse
    {
        return $this->adminCategoryService->update($id, $request->validated());
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        return $this->adminCategoryService->delete($id);
    }
}
