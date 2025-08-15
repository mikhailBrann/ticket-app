<?php

declare(strict_types=1);

namespace App\MoonShine\Layouts;

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
        ];
    }

    protected function menu(): array
    {
        return [
            ...parent::menu(),
            // MenuItem::make(
            //     static fn () => __('moonshine::ui.resource.admins_title'),
            //     \App\MoonShine\Resources\MoonShineUserResource::class
            // ),
            // MenuItem::make(
            //     static fn () => __('moonshine::ui.resource.role_title'),
            //     \App\MoonShine\Resources\MoonShineUserRoleResource::class
            // ),

            MenuItem::make('Кинозалы', CinemaHallResource::class),
            MenuItem::make('Сеансы', SessionInHallResource::class),
            MenuItem::make('Фильмы', FilmResource::class),
            MenuItem::make('Bookings', BookingResource::class),
        ];
    }

    /**
     * @param ColorManager $colorManager
     */
    protected function colors(ColorManagerContract $colorManager): void
    {
        parent::colors($colorManager);

        // $colorManager->primary('#00000');
    }

    public function build(): Layout
    {
        return parent::build();
    }
}
