<?php

declare(strict_types=1);

namespace App\MoonShine\Layouts;

use MoonShine\AssetManager\Css;
use MoonShine\Laravel\Layouts\CompactLayout;
use MoonShine\ColorManager\ColorManager;
use MoonShine\Contracts\ColorManager\ColorManagerContract;
use MoonShine\MenuManager\MenuItem;
use MoonShine\Laravel\Components\Layout\{Locales, Notifications, Profile, Search};
use MoonShine\UI\Components\{Breadcrumbs,
    Components,
    Layout\Flash,
    Layout\Div,
    Layout\Body,
    Layout\Burger,
    Layout\Content,
    Layout\Footer,
    Layout\Head,
    Layout\Favicon,
    Layout\Assets,
    Layout\Meta,
    Layout\Header,
    Layout\Html,
    Layout\Layout,
    Layout\Logo,
    Layout\Menu,
    Layout\Sidebar,
    Layout\ThemeSwitcher,
    Layout\TopBar,
    Layout\Wrapper,
    When};
use App\MoonShine\Resources\CinemaHallResource;
use App\MoonShine\Resources\FilmResource;
use App\MoonShine\Resources\SessionInHallResource;
use App\MoonShine\Resources\BookingResource;

final class MoonShineLayout extends CompactLayout
{
    protected function assets(): array
    {
        return [
            ...parent::assets(),
            Css::make('/vendor/moonshine/assets/custom.css')->defer()
        ];
    }

    protected function menu(): array
    {
        return [
            ...parent::menu(),

            MenuItem::make('Кинозалы', CinemaHallResource::class),
            MenuItem::make('Сеансы', SessionInHallResource::class),
            MenuItem::make('Фильмы', FilmResource::class),
            MenuItem::make('Бронированние', BookingResource::class),
        ];
    }

    /**
     * @param ColorManager $colorManager
     */
    protected function colors(ColorManagerContract $colorManager): void
    {
        parent::colors($colorManager);
    }

    public function build(): Layout
    {
        return parent::build();
    }
}
