<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\Film;
use App\MoonShine\Pages\Film\FilmIndexPage;
use App\MoonShine\Pages\Film\FilmFormPage;
use App\MoonShine\Pages\Film\FilmDetailPage;

use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Laravel\Pages\Page;

/**
 * @extends ModelResource<Film, FilmIndexPage, FilmFormPage, FilmDetailPage>
 */
class FilmResource extends ModelResource
{
    protected string $model = Film::class;

    protected string $title = 'Films';
    
    /**
     * @return list<Page>
     */
    protected function pages(): array
    {
        return [
            FilmIndexPage::class,
            FilmFormPage::class,
            FilmDetailPage::class,
        ];
    }

    /**
     * @param Film $item
     *
     * @return array<string, string[]|string>
     * @see https://laravel.com/docs/validation#available-validation-rules
     */
    protected function rules(mixed $item): array
    {
        return [];
    }
}
