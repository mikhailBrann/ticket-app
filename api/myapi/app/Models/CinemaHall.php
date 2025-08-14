<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CinemaHall extends Model
{
    use HasFactory;

    protected $table = 'cinema_halls';

    protected $fillable = [
        'name', 
        'is_active', 
        'rows_number', 
        'seats_in_row'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'rows_number' => 'integer',
        'seats_in_row' => 'integer',
    ];

    public function seats()
    {
        return $this->hasMany(Seat::class);
    }

    /**
     * Создание мест для кинозала
     */
    public function createSeats()
    {
        $seats = [];
        
        for ($row = 1; $row <= $this->rows_number; $row++) {
            for ($seatNumber = 1; $seatNumber <= $this->seats_in_row; $seatNumber++) {
                $seatNumberInHall = $row == 1 ? $seatNumber :
                    (($row - 1) * $this->seats_in_row) + $seatNumber;

                $seats[] = [
                    'cinema_hall_id' => $this->id,
                    'row' => $row,
                    'number' => $seatNumber,
                    'seat_number' => $seatNumberInHall,
                    'type' => $row === 1 ? 'vip' : 'regular',
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        Seat::insert($seats);
    }


    /**
     * Событие после создания CinemaHall
     */
    protected static function booted()
    {
        static::created(function ($cinemaHall) {
            $cinemaHall->createSeats();
        });

        // Опционально: пересоздавать места при обновлении количества рядов или мест
        static::updated(function ($cinemaHall) {
            if ($cinemaHall->wasChanged(['rows_number', 'seats_in_row'])) {
                $cinemaHall->seats()->delete();
                $cinemaHall->createSeats();
            }
        });
    }

    /**
     * Связь с ценами
     */
    public function prices(): HasMany
    {
        return $this->hasMany(Price::class);
    }

    /**
     * Получить цены для конкретного сеанса в этом зале
     */
    public function getPricesForSession($sessionInHallId)
    {
        return $this->prices()
            ->where('session_in_hall_id', $sessionInHallId)
            ->get();
    }
}
