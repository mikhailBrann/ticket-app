<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\Models\CinemaHall;
use App\Models\Film;
use App\Models\Price;
use App\Models\Seat;
use DateTime;
use Exception;
use Illuminate\Database\Eloquent\Model;
use App\Models\SessionInHall;
use App\MoonShine\Pages\SessionInHall\SessionInHallIndexPage;
use App\MoonShine\Pages\SessionInHall\SessionInHallFormPage;
use App\MoonShine\Pages\SessionInHall\SessionInHallDetailPage;

use MoonShine\Laravel\Resources\ModelResource;
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
use function PHPUnit\Framework\throwException;

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
     * Оброботчик до создания ресурса
     */
    protected function beforeCreating(mixed $item): mixed
    {
        self::cleanRequestFromRrices();

        return $item;
    }

    /**
     * Оброботчик после создания ресурса
     */
    protected function afterCreated(mixed $item): mixed
    {
        $cinemaHallId = (int) $item->cinema_hall_id;

        self::updatePriceFromSession(
            $item->id, 
            $cinemaHallId
        );

        return $item;
    }

    /**
     * Оброботчик до обновления ресурса
     */
    protected function beforeUpdating(mixed $item): mixed
    {
        self::cleanRequestFromRrices();

        return $item;
    }

    /**
     * Оброботчик после обновления ресурса
     */
    protected function afterUpdated(mixed $item): mixed
    {
        $cinemaHallId = (int) $item->cinema_hall_id;

        self::updatePriceFromSession(
            $item->id, 
            $cinemaHallId
        );
        
        return $item;
    }


    /**
     * Получить доступные типы мест
     */
    public static function getAvailableSeatTypes(): array
    {
        return Seat::distinct()
            ->whereNotNull('type')
            ->pluck('type')
            ->filter()
            ->unique()
            ->values()
            ->toArray();
    }

    /**
     * Чистим запрос от цен и времмено сохраняем в сессию
     */
    private static function cleanRequestFromRrices():void
    {
        $request = request();
        $priceFields = [];

        foreach (self::getAvailableSeatTypes() as $seatType) {
            $priceField = 'price_' . $seatType;

            if (!$request->has($priceField)) {
                continue;
            }
            
            $priceFields[$seatType] = $request->request->get($priceField);
            $request->request->remove($priceField);
        }

        if(session()->exists("session_prices_temp")) {
            session()->forget("session_prices_temp");
        }

        session()->put("session_prices_temp", $priceFields);
    }

    /**
     * Обновляем цены и удаляем их из сессии
     */
    private static function updatePriceFromSession(int $sessionHallId, $cinemaHallId):void
    {
        $sessionCurrentPrice = session()
            ->pull("session_prices_temp", null);
        $result = [];

        foreach ($sessionCurrentPrice as $seatType => $price) {
            $priceIsExist = Price::where("session_in_hall_id", $sessionHallId)
                ->where("seat_type", $seatType)
                ->first();

            if($priceIsExist) {
                $priceIsExist->price = $price;
                $priceIsExist->save();

                $result[] = $priceIsExist;
                continue;
            }

            $result[] = Price::create([
                'cinema_hall_id' => $cinemaHallId,
                'session_in_hall_id' => $sessionHallId,
                'seat_type' => $seatType,
                'price' => (float) $price,
            ]);
        }
        
        file_put_contents("./test3.txt", print_r($result, true));
    }
}
