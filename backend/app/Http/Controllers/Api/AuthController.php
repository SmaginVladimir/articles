<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserCreateRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{

    protected AuthService $authService;

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct(AuthService $authService)
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'refresh']]);
        $this->middleware('checkUserRole:ADMIN', ['except' => ['login', 'refresh', 'logout']]);
        $this->authService = $authService;
    }


    /**
     * @param UserCreateRequest $request
     * @return JsonResponse
     */
    public function register(UserCreateRequest $request): JsonResponse
    {
        return $this->authService->register($request->input('name'), $request->input('email'), $request->input('password'));
    }


    /**
     * @param UserLoginRequest $request
     * @return JsonResponse
     */
    public function login(UserLoginRequest $request): JsonResponse
    {
        return $this->authService->login($request->input('email'), $request->input('password'));
    }


    /**
     * @return JsonResponse
     */
    public function getUsers(): JsonResponse
    {
        return $this->authService->getUsers();
    }


    /**
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        return $this->authService->logout();
    }


    /**
     * @return JsonResponse
     */
    public function refresh(): JsonResponse
    {
        return $this->authService->refresh();
    }

}
