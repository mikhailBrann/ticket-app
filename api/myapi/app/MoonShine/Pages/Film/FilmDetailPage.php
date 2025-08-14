<?php

declare(strict_types=1);

namespace App\MoonShine\Pages\Film;

use App\MoonShine\Layouts\Parts\CardLayout;
use \App\Models\Film;
use Illuminate\Support\Facades\Storage;
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
class FilmDetailPage extends DetailPage
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
        $film = $this->getResource()->getItem();
        $poster = function() use($film) {
            if($film->image == null) {
                return;
            }

            $posterUrl = Storage::disk('public')
                ->url($film->image);

            return Div::make([
                CardLayout::createCardHeading('Постер'), 
                Card::make(
                    "",
                    $posterUrl
                )
            ]);
        };

        return [
            Heading::make('Информация о фильме'),
            Box::make([
                CardLayout::createInfoCard('ID фильма', $film->id),
                CardLayout::createInfoCard('Создан', $film->created_at),
                CardLayout::createInfoCard('Изменен', $film->updated_at),
                CardLayout::createInfoCard('Название', $film->title),
                CardLayout::createInfoCard('Описание', $film->description),
                $poster(),
                CardLayout::createInfoCard('Продолжительность', '~' . $film->duration),
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
