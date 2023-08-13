<?php


namespace App\Services\Admin;


use App\Models\Article;
use Illuminate\Http\JsonResponse;

class ArticleService
{

    /**
     * @param array $data
     * @return JsonResponse
     */
    public function create(array $data): JsonResponse
    {
        $picture = data_get($data, 'image');
        if ($picture) {
            $path = $picture->store('pictures', 'public');
            $data['image'] = $path;
        }
        Article::create($data);
        return response()->json(['message' => 'Successfully create new article']);
    }

    /**
     * @param int $articleId
     * @param array $data
     * @return JsonResponse
     */
    public function update(int $articleId, array $data): JsonResponse
    {
        $article = Article::find($articleId);
        if ($article) {
            $picture = data_get($data, 'image');
            if ($picture && $picture != $article->image) {
                $path = $picture->store('pictures', 'public');
                $data['image'] = $path;
            }
            $article->update($data);
            return response()->json(['message' => 'Successfully update article']);
        }
        return response()->json(['message' => 'Error update article'], 406);
    }

    /**
     * @param int $articleId
     * @return JsonResponse
     */
    public function delete(int $articleId): JsonResponse
    {
        $article = Article::find($articleId);
        if ($article) {
            $article->delete();
            return response()->json(['message' => 'Successfully delete article']);
        }
        return response()->json(['message' => 'Error delete article'], 406);
    }
}
