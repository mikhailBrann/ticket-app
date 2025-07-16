<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\Models\CinemaHall;
use App\Models\Film;
use DateTime;
use Illuminate\Database\Eloquent\Model;
use App\Models\SessionInHall;
use App\MoonShine\Pages\SessionInHall\SessionInHallIndexPage;
use App\MoonShine\Pages\SessionInHall\SessionInHallFormPage;
use App\MoonShine\Pages\SessionInHall\SessionInHallDetailPage;

use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Laravel\Pages\Page;
use MoonShine\UI\Components\Layout\Box;
use MoonShine\UI\Fields\Checkbox;
use MoonShine\UI\Fields\Date;
use MoonShine\UI\Fields\DateRange;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Number;
use MoonShine\UI\Fields\Select;
use MoonShine\UI\Fields\Text;

/**
 * @extends ModelResource<SessionInHall, SessionInHallIndexPage, SessionInHallFormPage, SessionInHallDetailPage>
 */
class SessionInHallResource extends ModelResource
{
    protected string $model = SessionInHall::class;

    protected string $title = 'SessionInHalls';

    protected function indexFields(): iterable
    {
        return [
            ID::make(),
            Text::make('Дата сеанса', 'session_date_formatted'), 
            Text::make('Время сеанса', 'session_time_formatted'),
            Text::make('Фильм', 'film.title'),
            Text::make('Кинозал', 'cinemaHall.name'),
        ];
    }

    protected function formFields(): iterable
    {
        return [
            Box::make([
                ID::make(),
                Date::make('Начало сеанса','from')
                    ->required()
                    ->withTime()
                    ->format('Y-m-d H:i:s'),
                Date::make('Окончание сеанса','to')
                    ->required()
                    ->withTime()
                    ->format('Y-m-d H:i:s'),
                Select::make('Кинозал', 'cinema_hall_id')
                    ->required()
                    ->options(
                        CinemaHall::query()
                            ->where('is_active', true)
                            ->pluck('name', 'id')
                            ->toArray()
                    ),
                Select::make('Фильм', 'film_id')
                    ->options(
                        Film::query()
                        ->pluck('title', 'id')
                        ->toArray()
                    )
            ]),
        ];
    }
    
    /**
     * @return list<Page>
     */
    protected function pages(): array
    {
        return [
            SessionInHallIndexPage::class,
            SessionInHallFormPage::class,
            SessionInHallDetailPage::class,
        ];
    }

    /**
     * @param SessionInHall $item
     *
     * @return array<string, string[]|string>
     * @see https://laravel.com/docs/validation#available-validation-rules
     */
    protected function rules(mixed $item): array
    {
        return [];
    }
}
