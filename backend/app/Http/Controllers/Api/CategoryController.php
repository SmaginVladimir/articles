<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CategoryController extends Controller
{
    protected CategoryService $categoryService;

    /**
     * CategoryController constructor.
     * @param CategoryService $categoryService
     */
    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }


    /**
     * @param int|string $page
     * @return AnonymousResourceCollection
     */
    public function index(int|string $page): AnonymousResourceCollection
    {
        return $this->categoryService->all($page);
    }


    /**
     * @param int $id
     * @return CategoryResource|JsonResponse
     */
    public function show(int $id): CategoryResource|JsonResponse
    {
        return $this->categoryService->show($id);
    }
}
