<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ArticleController>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */


    public function definition()
    {
        $name = $this->faker->name();
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'image' => $this->getImage(rand(1, 3)),
            'content' => $this->faker->realTextBetween(),
            'active' => $this->faker->boolean(),
            'order' => $this->faker->randomNumber(1, 10)
        ];
    }

    private function getImage($image_number = 1): string
    {
        $path = storage_path() . "/seed_pictures/" . $image_number . ".jpg";
        $image_name = uniqid() . md5($path) . '.jpg';
        $resize = Image::make($path)->fit(300)->encode('jpg');
        Storage::disk('public')->put('pictures/' . $image_name, $resize->__toString());
        return 'pictures/' . $image_name;
    }
}
