<?php


namespace App\Services;


use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserService
{

    /**
     * @param int|string $page
     * @return AnonymousResourceCollection
     */
    public function all(int|string $page): AnonymousResourceCollection
    {
        if ($page != 'all') {
            return UserResource::collection(User::orderBy('order')->paginate($page));
        }
        return UserResource::collection(User::orderBy('order')->get());
    }


    /**
     * @param int $id
     * @return UserResource|JsonResponse
     */
    public function show(int $id): UserResource|JsonResponse
    {
        $user = User::find($id);
        if ($user) {
            return new UserResource($user);
        }
        return response()->json(['message' => 'Not found'], 404);
    }
}
