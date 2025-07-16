<?php

namespace App\Models;

use Date;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SessionInHall extends Model
{
    use HasFactory;

    protected $table = 'session_in_halls';

    protected $fillable = [
        'session_time',
        'film_id',
        'cinema_hall_id',
    ];

    protected $casts = [
        'session_time' => 'datetime',
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
}
