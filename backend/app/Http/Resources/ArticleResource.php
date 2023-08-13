<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'category' => new CategoryResource($this->category),
            'image' => asset('/storage/' . $this->image),
            'content' => $this->content,
            'order' => $this->order,
            'active' => (boolean)$this->active,
            'create' => date($this->created_at),
            'update' => date($this->updated_at)
        ];
    }
}
