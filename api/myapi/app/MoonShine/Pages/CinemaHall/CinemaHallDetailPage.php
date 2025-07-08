<?php

declare(strict_types=1);

namespace App\MoonShine\Pages\CinemaHall;

use App\Models\CinemaHall;
use Illuminate\Database\Eloquent\Collection;
use MoonShine\Laravel\Pages\Crud\DetailPage;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\UI\Components\ActionButton;
use MoonShine\UI\Components\FlexibleRender;
use MoonShine\UI\Components\Heading;
use MoonShine\UI\Components\Layout\Box;
use MoonShine\UI\Components\Layout\Column;
use MoonShine\UI\Components\Layout\Div;
use MoonShine\UI\Components\Layout\Flex;
use MoonShine\UI\Components\Layout\Grid;
use MoonShine\UI\Components\Layout\Header;
use MoonShine\UI\Components\Link;
use MoonShine\UI\Components\MoonShineComponent;
use Throwable;


/**
 * @extends DetailPage<ModelResource>
 */
class CinemaHallDetailPage extends DetailPage
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
    protected function bottomLayer(): array
    {

        return [
            ...parent::bottomLayer()
        ];
    }

    /**
     * Рендер слоя кинозала
     * @return list<ComponentContract>
     */
    protected function mainLayer(): array
    {
        /** @var CinemaHall $hall */
        $hall = $this->getResource()->getItem();
        $buttonText = $hall->is_active ? 'Деактивировать зал' : 'Активировать зал';

        $toggleButton = ActionButton::make(
            $buttonText, 
            "/admin/resource/cinema-hall-resource/cinema-hall-index-page")
            ->onClick(function() use ($hall) {
                $hall->is_active = !$hall->is_active;
                $hall->save();
            }
        );

        return [
            Heading::make('Информация о кинозале'),
            // Основная информация о кинозале
            Box::make( [
          
                Grid::make([
                    Column::make([
                        $toggleButton,
                        $this->createInfoCard('ID', $hall->id),
                        $this->createInfoCard('Название', $hall->name),
                        $this->createInfoCard('Количество рядов', $hall->rows_number),
                        $this->createInfoCard('Мест в ряду', $hall->seats_in_row),
                    ])->columnSpan(2),
                    // Схема зала
                    Column::make([
                        Heading::make('Схема зала'),
                        $this->renderCinemaHallSchema($hall)
                    ])->columnSpan(8),
                ])
            ]),   
        ];
    }

    /**
     * Обертка списка своств кинозала
     * @return MoonShineComponent
     */

    private function createInfoCard(string $label, $value): MoonShineComponent
    {
        return Div::make([
            Heading::make("$label: ")
                ->class('text-sm font-medium text-gray-500 mb-1'),
            FlexibleRender::make( (string)$value)
                ->class('text-lg font-semibold text-gray-900'),
        ])->class('bg-white p-4 rounded-lg border border-gray-200 mb-3');
    }


    private function renderCinemaHallSchema(CinemaHall $cinemaHall): MoonShineComponent
    {
        $movieScreen = [
            'content' => 'ЭКРАН',
            'style' => [
                'background: black',
                'box-sizinng: border-box',
                'padding: 10px',
                'color: white',
                'font-weight: 700',
            ]
        ];
        $seats = $cinemaHall->seats()
            ->orderBy('row')
            ->orderBy('number')
            ->get()
            ->groupBy('row');

        $renderredSeats = function (Collection $rowsCollection) use ($cinemaHall) {
            $columns = [];
            foreach ($rowsCollection as $row => $rowSeats) {
                $rowTitle = Heading::make("Ряд $row");
                $renderedSeatsElems = [];

                foreach ($rowSeats as $seat) {
                    $seatType = $seat->type === 'vip' ? '👑' : '🪑';
                    $renderedSeatsElems[] = Div::make([
                        FlexibleRender::make($seatType)
                    ])->setAttribute('title', "Ряд: $seat->row, Место: $seat->number");
                }

                // Объединяем заголовок и сиденья
                $lineItems = array_merge([$rowTitle], $renderedSeatsElems);

                // Оборачиваем в Flex для горизонтального расположения
                $columns[] = Flex::make($lineItems)
                        ->justifyAlign('between')
                        ->itemsAlign('start');
            }
            return Column::make($columns)->columnSpan(12);
        };

        return Box::make([
            Heading::make('Схема зала'),
                Grid::make([
                    Column::make([
                        Flex::make([
                            FlexibleRender::make($movieScreen['content']),
                        ])
                        ->justifyAlign('center')
                        ->style($movieScreen['style'])
                    ])->columnSpan(12),
                    $renderredSeats($seats),
                ])
        ]);
    }


    
    




    
}
