<?php


namespace App\Services\Admin;


use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserService
{

    /**
     * @param array $data
     * @return JsonResponse
     */
    public function create(array $data): JsonResponse
    {
        $data['password'] = bcrypt($data['password']);
        User::create($data);
        return response()->json(['message' => 'Successfully create new user']);
    }

    /**
     * @param int $userId
     * @param array $data
     * @return JsonResponse
     */
    public function update(int $userId, array $data): JsonResponse
    {
        $user = User::find($userId);
        if ($user) {
            $data['password'] = bcrypt($data['password']);
            $user->update($data);
            return response()->json(['message' => 'Successfully update user']);
        }
        return response()->json(['message' => 'Error update user'], 406);
    }

    /**
     * @param int $userId
     * @return JsonResponse
     */
    public function delete(int $userId): JsonResponse
    {
        $user = User::find($userId);
        if ($user) {
            $user->delete();
            return response()->json(['message' => 'Successfully delete user']);
        }
        return response()->json(['message' => 'Error delete user'], 406);
    }
}
