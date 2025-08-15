<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\Booking;
use App\MoonShine\Pages\Booking\BookingIndexPage;
use App\MoonShine\Pages\Booking\BookingFormPage;
use App\MoonShine\Pages\Booking\BookingDetailPage;

use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Laravel\Pages\Page;

/**
 * @extends ModelResource<Booking, BookingIndexPage, BookingFormPage, BookingDetailPage>
 */
class BookingResource extends ModelResource
{
    protected string $model = Booking::class;

    protected string $title = 'Bookings';
    
    /**
     * @return list<Page>
     */
    protected function pages(): array
    {
        return [
            BookingIndexPage::class,
            BookingFormPage::class,
            BookingDetailPage::class,
        ];
    }

    /**
     * @param Booking $item
     *
     * @return array<string, string[]|string>
     * @see https://laravel.com/docs/validation#available-validation-rules
     */
    protected function rules(mixed $item): array
    {
        return [];
    }
}
