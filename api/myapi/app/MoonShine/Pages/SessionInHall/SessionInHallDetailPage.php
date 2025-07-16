<?php

declare(strict_types=1);

namespace App\MoonShine\Pages\SessionInHall;

use App\MoonShine\Layouts\Parts\CardLayout;
use App\Models\SessionInHall;
use App\MoonShine\Resources\FilmResource;
use Date;
use Exception;
use Illuminate\Support\Facades\Storage;
use MoonShine\Facades\MoonShine;
use MoonShine\Laravel\Pages\Crud\DetailPage;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\UI\Components\Card;
use MoonShine\UI\Components\Heading;
use MoonShine\UI\Components\Layout\Box;
use MoonShine\UI\Components\Layout\Div;
use Throwable;


/**
 * @extends DetailPage<ModelResource>
 */
class SessionInHallDetailPage extends DetailPage
{
    /**
     * @return list<ComponentContract|FieldContract>
     */
    protected function fields(): iterable
    {
        return [];
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
        $sessionHall = $this->getResource()->getItem();
        $filmBlock = function() use ($sessionHall)  {
            if($sessionHall->film == null) {
                return;
            }

            
            $posterUrl = Storage::disk('public')
                ->url($sessionHall->film->image);
            $resourceLink = "/admin/resource/film-resource/film-detail-page/{$sessionHall->film->id}";

            return Div::make([
                CardLayout::createCardHeading("Фильм"),
                Card::make(
                    $sessionHall->film->title,
                    $posterUrl,
                    $resourceLink
                    
                )
            ]);
        };
        $dateFormat = 'H:i d.m.Y';
        $fromFormatted = Date::parse($sessionHall->from)
            ->format($dateFormat);
        $toFormatted = Date::parse($sessionHall->to)
            ->format($dateFormat);

        return [
            Heading::make('Информация о сеансе'),
            Box::make([
                CardLayout::createInfoCard('ID сеанса', $sessionHall->id),
                CardLayout::createInfoCard('Создан', $sessionHall->created_at),
                CardLayout::createInfoCard('Изменен', $sessionHall->updated_at),
                $filmBlock(),
                CardLayout::createInfoCard('Кинозал', $sessionHall->cinemaHall->name),
                CardLayout::createInfoCard('Начало сеанса', $fromFormatted),
                CardLayout::createInfoCard('Окончание сеанса', $toFormatted),
            ])
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
