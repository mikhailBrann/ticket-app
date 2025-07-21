<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Price extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'cinema_hall_id',
        'session_in_hall_id',
        'seat_type',
        'price',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:5',
        'cinema_hall_id' => 'integer',
        'session_in_hall_id' => 'integer',
    ];

    /**
     * Связь с кинозалом
     */
    public function cinemaHall(): BelongsTo
    {
        return $this->belongsTo(CinemaHall::class);
    }

    /**
     * Связь с сеансом в зале
     */
    public function sessionInHall(): BelongsTo
    {
        return $this->belongsTo(SessionInHall::class);
    }

    /**
     * Получить все доступные типы мест из модели Seat
     */
    public static function getAvailableSeatTypes(): array
    {
        return Seat::distinct()
            ->pluck('type')
            ->toArray();
    }

    /**
     * Валидация типа места
     */
    public function validateSeatType(): bool
    {
        $availableTypes = self::getAvailableSeatTypes();
        return in_array($this->seat_type, $availableTypes);
    }

    /**
     * Scope для фильтрации по кинозалу
     */
    public function scopeByCinemaHall($query, $cinemaHallId)
    {
        return $query->where('cinema_hall_id', $cinemaHallId);
    }

    /**
     * Scope для фильтрации по сеансу
     */
    public function scopeBySession($query, $sessionInHallId)
    {
        return $query->where('session_in_hall_id', $sessionInHallId);
    }

    /**
     * Scope для фильтрации по типу места
     */
    public function scopeBySeatType($query, $seatType)
    {
        return $query->where('seat_type', $seatType);
    }

    /**
     * Получить цену для конкретного места в конкретном сеансе
     */
    public static function getPriceForSeat($cinemaHallId, $sessionInHallId, $seatType)
    {
        return self::where('cinema_hall_id', $cinemaHallId)
            ->where('session_in_hall_id', $sessionInHallId)
            ->where('seat_type', $seatType)
            ->first();
    }

    /**
     * Форматированная цена
     */
    public function getFormattedPriceAttribute(): string
    {
        return number_format((float)$this->price, 2) . ' ₽';
    }
}