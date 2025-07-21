<?php

namespace App\Models;

use Date;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SessionInHall extends Model
{
    use HasFactory;

    protected $table = 'session_in_halls';

    protected $fillable = [
        'from',
        'to',
        'cinema_hall_id',
        'film_id',
    ];

    protected $casts = [
        'from' => 'datetime',
        'to' => 'datetime',
    ];

    public function film(): BelongsTo
    {
        return $this->belongsTo(Film::class);
    }

    public function cinemaHall(): BelongsTo
    {
        return $this->belongsTo(CinemaHall::class);
    }

    public function getSessionTimeFormattedAttribute()
    {
        if ($this->from && $this->to) {
            return Date::parse($this->from)->format('H:i') . 
                ' - ' . 
                Date::parse($this->to)->format('H:i');
        }
        return '';
    }

    public function getSessionDateFormattedAttribute()
    {
        return $this->from != null ? 
            Date::parse($this->from)->format('d.m.Y') : '';
    }

    public function getSessionTitleFormattedAttribute()
    {
        $cinemaHall = $this->cinemaHall;

        if (!$cinemaHall) {
            return '';
        }

        return 'Сеанс в ' . 
            $this->getSessionTimeFormattedAttribute() . ' ' .
            $this->getSessionDateFormattedAttribute() . ' ' .
            'в зале ' .  $cinemaHall->name . " (id: {$cinemaHall->id})";
    }

    /**
     * Связь с ценами
     */
    public function prices(): HasMany
    {
        return $this->hasMany(Price::class);
    }

    /**
     * Получить все цены для этого сеанса
     */
    public function getAllPrices()
    {
        return $this->prices()
            ->with('cinemaHall')
            ->get();
    }

    /**
     * Получить цену для конкретного типа места
     */
    public function getPriceForSeatType($seatType)
    {
        return $this->prices()
            ->where('seat_type', $seatType)
            ->first();
    }
    
}
