<?php


namespace App\Services;


use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthService
{


    /**
     * @param string $name
     * @param string $email
     * @param string $password
     * @return JsonResponse
     */
    public function register(string $name, string $email, string $password): JsonResponse
    {
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => bcrypt($password)
        ]);
        $token = auth()->tokenById($user->id);
        return $this->respondWithToken($token);
    }


    /**
     * @param string $email
     * @param string $password
     * @return JsonResponse
     */
    public function login(string $email, string $password): JsonResponse
    {
        if (!$token = auth()->attempt(['email' => $email, 'password' => $password])) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }


    /**
     * @return JsonResponse
     */
    public function getUsers(): JsonResponse
    {
        return response()->json(['user' => new UserResource(auth()->user())]);
    }


    /**
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }


    /**
     * @return JsonResponse
     */
    public function refresh(): JsonResponse
    {
        try {
            $new_token = auth()->refresh();
            return $this->respondWithToken($new_token);
        } catch (JWTException $exception) {
            return response()->json(['error' => 'You have already refreshed the token'], 403);
        }
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return JsonResponse
     */
    private function respondWithToken($token): JsonResponse
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

}
