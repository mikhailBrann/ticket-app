<?php

declare(strict_types=1);

namespace App\MoonShine\Pages\Booking;

use App\Models\Booking;
use Illuminate\Support\Facades\Log;
use MoonShine\Contracts\UI\ActionButtonContract;
use MoonShine\Laravel\Pages\Crud\IndexPage;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\UI\Components\ActionButton;
use MoonShine\UI\Components\Boolean;
use MoonShine\UI\Fields\Switcher;
use Throwable;

use MoonShine\UI\Fields\File;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Image;
use MoonShine\UI\Fields\Json;
use MoonShine\UI\Fields\Number;
use MoonShine\UI\Fields\Select;
use MoonShine\UI\Fields\Text;
use MoonShine\UI\Components\Layout\Box;
use MoonShine\UI\Fields\Textarea;


/**
 * @extends IndexPage<ModelResource>
 */
class BookingIndexPage extends IndexPage
{
    /**
     * @return list<ComponentContract|FieldContract>
     */
    protected function fields(): iterable
    {  
        return [
            ID::make(),
            Switcher::make('Статус бронированния', 'is_active'),
            Text::make('ID фильма', 'film_id'),
            Text::make('ID кинотеатра', 'cinema_hall_id'),
            Text::make('ID сеанса', 'session_in_hall_id'),
            Json::make('Номера забронированных мест','seat_id_list')->onlyValue(''),
            Number::make('Сумма бронированния', 'summ'),
        ];
    }

    /**
     * @return list<ComponentContract>
     * @throws Throwable
     */
    protected function topLayer(): array
    {
        return [
            ...parent::topLayer()
        ];
    }

    /**
     * @return list<ComponentContract>
     * @throws Throwable
     */
    protected function mainLayer(): array
    {
        return [
            ...parent::mainLayer()
        ];
    }

    /**
     * @return list<ComponentContract>
     * @throws Throwable
     */
    protected function bottomLayer(): array
    {
        return [
            ...parent::bottomLayer()
        ];
    }
}
