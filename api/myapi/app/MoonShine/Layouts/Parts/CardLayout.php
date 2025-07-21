<?php

declare(strict_types=1);

namespace App\MoonShine\Layouts\Parts;

use MoonShine\UI\Components\FlexibleRender;
use MoonShine\UI\Components\Heading;
use MoonShine\UI\Components\Layout\Div;
use MoonShine\UI\Components\MoonShineComponent;

class CardLayout {
    /**
     * Обертка списка свойств
     * @return MoonShineComponent
     */

    public static function createInfoCard(string $label, $value): MoonShineComponent
    {
        return Div::make([
            self::createCardHeading($label),
            FlexibleRender::make( (string)$value)
                ->class('text-lg font-semibold text-gray-900'),
        ])->class('bg-white p-4 rounded-lg border border-gray-200 mb-3');
    }

    public static function createCardHeading(string $label): MoonShineComponent
    {
        return Heading::make("$label: ")
            ->class('text-sm font-medium text-gray-500 mb-1');
    }
}