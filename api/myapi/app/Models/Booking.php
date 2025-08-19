<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;

    protected $table = 'booking';

    protected $fillable = [
        'is_active',
        'film_id',
        'seat_id_list',
        'cinema_hall_id',
        'session_in_hall_id',
        'summ'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'seat_id_list' => 'array',
        'summ' => 'decimal:2',
    ];

    /**
     * Правила валидации для модели Booking
     */
    public static function rules()
    {
        return [
            'is_active' => 'nullable|boolean',
            'film_id' => 'required|exists:films,id',
            'seat_id_list' => 'required|array',
            'seat_id_list.*' => 'integer|exists:seats,id',
            'cinema_hall_id' => 'required|exists:cinema_halls,id',
            'session_in_hall_id' => 'required|integer',
            'summ' => 'required|numeric|min:0',
        ];
    }

    public function film(): BelongsTo
    {
        return $this->belongsTo(Film::class);
    }

    public function cinemaHall(): BelongsTo
    {
        return $this->belongsTo(CinemaHall::class);
    }

    public function sessionInHall(): BelongsTo
    {
        return $this->belongsTo(SessionInHall::class);
    }

    public function seats()
    {
        return Seat::whereIn('id', $this->seat_id_list)->get();
    }
}
