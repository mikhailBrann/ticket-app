<?php

declare(strict_types=1);

namespace App\MoonShine\Pages\SessionInHall;

use App\Models\Price;
use App\Models\Seat;
use App\MoonShine\Resources\SessionInHallResource;
use Exception;
use MoonShine\Laravel\Pages\Crud\FormPage;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Resources\ModelResource;
use Throwable;


use MoonShine\Laravel\Pages\Page;
use MoonShine\UI\Components\Layout\Box;
use MoonShine\UI\Components\Layout\Divider;
use MoonShine\UI\Fields\Checkbox;
use MoonShine\UI\Fields\Date;
use MoonShine\UI\Fields\DateRange;
use MoonShine\UI\Fields\ID;
use MoonShine\UI\Fields\Number;
use MoonShine\UI\Fields\Select;
use MoonShine\UI\Fields\Text;

use App\Models\CinemaHall;
use App\Models\Film;
use DateTime;
use Illuminate\Database\Eloquent\Model;
use App\Models\SessionInHall;


/**
 * @extends FormPage<ModelResource>
 */
class SessionInHallFormPage extends FormPage
{
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

    /**
     * @return list<ComponentContract|FieldContract>
     */
    protected function fields(): iterable
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
            Divider::make(),
            Box::make(
                'Настройка цен по типам мест', 
                $this->getPriceFields()
            ),

        ];
    }


    

    /**
     * Получить поля для настройки цен
     */
    private static function getPriceFields(): array
    {
        $seatTypes = SessionInHallResource::getAvailableSeatTypes();
        $priceFields = [];

        foreach ($seatTypes as $seatType) {
            $sessionPriceTemp = session()
                ->get("session_prices_temp");

            $makedField = Number::make(
                'Цена для ' . $seatType, 
                'price_' . $seatType
            )
            ->min(0)
            ->step(0.01)
            //->placeholder('Введите цену для типа мест: ' . $seatType)
            ->hint('Цена в рублях для мест типа "' . $seatType . '"');

            if(is_array($sessionPriceTemp) && 
                !empty($sessionPriceTemp[$seatType])
            ) {
                $makedField->placeholder($sessionPriceTemp[$seatType]);
            }

            $priceFields[] = $makedField;
        }

        if (empty($priceFields)) {
            $priceFields[] = Text::make('Информация', 'price_info')
                ->default('Типы мест не найдены. Сначала создайте места в кинозалах.')
                ->readonly();
        }

        return $priceFields;
    }
}
