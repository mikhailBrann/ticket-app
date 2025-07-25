<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\Models\SessionInHall;
use Illuminate\Database\Eloquent\Model;
use App\Models\Film;
use App\MoonShine\Pages\Film\FilmIndexPage;
use App\MoonShine\Pages\Film\FilmFormPage;
use App\MoonShine\Pages\Film\FilmDetailPage;

use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Laravel\Pages\Page;
use MoonShine\UI\Fields\File;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Image;
use MoonShine\UI\Fields\Number;
use MoonShine\UI\Fields\Select;
use MoonShine\UI\Fields\Text;
use MoonShine\UI\Components\Layout\Box;

/**
 * @extends ModelResource<Film, FilmIndexPage, FilmFormPage, FilmDetailPage>
 */
class FilmResource extends ModelResource
{
    protected string $model = Film::class;

    protected string $title = 'Films';
    

    protected function indexFields(): iterable
    {
        return [
            ID::make(),
            Text::make('Название фильма', 'title'),
            Image::make('Постер', 'image')
        ];
    }

    protected function formFields(): iterable
    {
        $options = SessionInHall::all()
            ->mapWithKeys(
                fn($session) =>
                    [$session->id => $session->session_title_formatted]
        )->toArray();

        return [
            Box::make([
                ID::make(),
                Text::make('Название фильма', 'title')
                    ->required(),
                Image::make('Постер', 'image')
                    ->disk('public'),
                Select::make('Сеанс', 'session_in_halls')
                    ->required()
                    ->options($options),
            ]),
        ];
    }
    
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
