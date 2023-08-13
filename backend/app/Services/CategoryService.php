<?php


namespace App\Services;


use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CategoryService
{

    /**
     * @param int|string $page
     * @return AnonymousResourceCollection
     */
    public function all(int|string $page): AnonymousResourceCollection
    {
        if ($page != 'all'){
            return CategoryResource::collection(Category::orderBy('order')->paginate($page));
        }
        return CategoryResource::collection(Category::orderBy('order')->get());
    }


    /**
     * @param int $id
     * @return CategoryResource|JsonResponse
     */
    public function show(int $id): CategoryResource|JsonResponse
    {
        $category = Category::find($id);
        if ($category) {
            return new CategoryResource($category);
        }
        return response()->json(['message' => 'Not found'], 404);
    }
}
