<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SessionInHall extends Model
{
    use HasFactory;

    protected $table = 'session_in_hall';

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
}
