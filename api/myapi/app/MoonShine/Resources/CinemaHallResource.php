<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\CinemaHall;
use App\MoonShine\Pages\CinemaHall\CinemaHallIndexPage;
use App\MoonShine\Pages\CinemaHall\CinemaHallFormPage;
use App\MoonShine\Pages\CinemaHall\CinemaHallDetailPage;

use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Laravel\Pages\Page;

use MoonShine\UI\Components\Boolean;
use MoonShine\UI\Components\Layout\Box;
use MoonShine\UI\Fields\Checkbox;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Number;
use MoonShine\UI\Fields\Text;

/**
 * @extends ModelResource<CinemaHall, CinemaHallIndexPage, CinemaHallFormPage, CinemaHallDetailPage>
 */
class CinemaHallResource extends ModelResource
{
    protected string $model = CinemaHall::class;

    protected string $title = 'CinemaHalls';

    protected function indexFields(): iterable
    {
        return [
            ID::make(),
            Checkbox::make('Активность', 'is_active'),
            Text::make('Название', 'name'),
        ];
    }

    protected function formFields(): iterable
    {
        return [
            Box::make([
                ID::make(),
                Checkbox::make('Активность', 'is_active'),
                Text::make('Название', 'name'),
                Number::make('Рядов в кинотеатре','rows_number')
                    ->required()
                    ->min(1),
                Number::make('Мест в ряду','seats_in_row')
                    ->required()
                    ->min(1),
            ]),
        ];
    }
 
    protected function detailFields(): iterable
    {
        return [
            ID::make(),
            Checkbox::make('Активность', 'is_active'),
            Text::make('Название', 'name'),
        ];
    }
    
    /**
     * @return list<Page>
     */
    protected function pages(): array
    {
        return [
            CinemaHallIndexPage::class,
            CinemaHallFormPage::class,
            CinemaHallDetailPage::class,
        ];
    }

    /**
     * @param CinemaHall $item
     *
     * @return array<string, string[]|string>
     * @see https://laravel.com/docs/validation#available-validation-rules
     */
    protected function rules(mixed $item): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'is_active' => ['required', 'boolean'],
            'rows_number' => ['required', 'integer', 'min:1'],
            'seats_in_row' => ['required', 'integer', 'min:1'],
        ];
    }
}
