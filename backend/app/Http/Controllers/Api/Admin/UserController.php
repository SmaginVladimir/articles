<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserCreateRequest;
use App\Services\Admin\UserService as AdminUserService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class UserController extends Controller
{

    protected AdminUserService $adminUserService;

    /**
     * ArticleController constructor.
     * @param AdminUserService $adminUserService
     */
    public function __construct(AdminUserService $adminUserService)
    {
        $this->adminUserService = $adminUserService;
    }

    /**
     * @param UserCreateRequest $request
     * @return JsonResponse
     */
    public function create(UserCreateRequest $request): JsonResponse
    {
        return $this->adminUserService->create($request->validated());
    }

    /**
     * @param int $id
     * @param UserCreateRequest $request
     * @return JsonResponse
     */
    public function update(int $id, UserCreateRequest $request): JsonResponse
    {
        return $this->adminUserService->update($id, $request->validated());
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        return $this->adminUserService->delete($id);
    }
}
