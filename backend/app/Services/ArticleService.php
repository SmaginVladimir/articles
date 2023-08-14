<?php


namespace App\Services;


use App\Http\Resources\ArticleResource;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ArticleService
{

    /**
     * @param int|string $page
     * @return AnonymousResourceCollection
     */
    public function all(int|string $page): AnonymousResourceCollection
    {
        if ($page != 'all') {
            return ArticleResource::collection(Article::orderBy('order')->paginate($page));
        }
        return ArticleResource::collection(Article::orderBy('order')->get());
    }


    /**
     * @param int $id
     * @return ArticleResource|JsonResponse
     */
    public function show(int $id): ArticleResource|JsonResponse
    {
        $article = Article::find($id);
        if ($article) {
            return new ArticleResource($article);
        }
        return response()->json(['message' => 'Not found'], 404);
    }


    /**
     * @param int $id
     * @param int|string $page
     * @return JsonResponse|AnonymousResourceCollection
     */
    public function articlesAllByCategoryId(int $id, int|string $page): JsonResponse|AnonymousResourceCollection
    {
        $category = Category::find($id);
        if ($category) {
            $articles = $category->articles()->orderBy('order');
            if ($page != 'all') {
                return ArticleResource::collection($articles->paginate($page));
            }
            return ArticleResource::collection($articles->get());
        }
        return response()->json(['message' => 'Not found'], 404);
    }


    /**
     * @param string $slug
     * @return ArticleResource|JsonResponse
     */
    public function searchArticleBySlug(string $slug): ArticleResource|JsonResponse
    {
        $article = Article::where('slug', '=', $slug)->first();
        if ($article) {
            return new ArticleResource($article);
        }
        return response()->json(['message' => 'Not found'], 404);
    }
}
