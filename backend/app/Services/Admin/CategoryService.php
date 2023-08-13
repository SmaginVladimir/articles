<?php


namespace App\Services\Admin;


use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryService
{

    /**
     * @param array $data
     * @return JsonResponse
     */
    public function create(array $data): JsonResponse
    {
        Category::create($data);
        return response()->json(['message' => 'Successfully create new category']);
    }

    /**
     * @param int $categoryId
     * @param array $data
     * @return JsonResponse
     */
    public function update(int $categoryId, array $data): JsonResponse
    {
        $category = Category::find($categoryId);
        if ($category) {
            $category->update($data);
            return response()->json(['message' => 'Successfully update category']);
        }
        return response()->json(['message' => 'Error update category'], 406);
    }

    /**
     * @param int $categoryId
     * @return JsonResponse
     */
    public function delete(int $categoryId): JsonResponse
    {
        $category = Category::find($categoryId);
        if ($category) {
            $category->delete();
            return response()->json(['message' => 'Successfully delete category']);
        }
        return response()->json(['message' => 'Error delete category'], 406);
    }
}
