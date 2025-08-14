<?php

namespace App\Models;

use Date;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Film extends Model
{
    use HasFactory;
    
    protected $table = 'films';

    protected $fillable = [
        'title',
        'description',
        'image',
    ];

    protected $appends = [
        'image_url',
        'duration'
    ];

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    /**
     * Возвращает продолжительность фильма из сеанса в формате H:i:s
     * @return string
     */
    public function getDurationAttribute(): ?string
    {
        $sessionHall = $this->sessionInHalls->first();
 
        if(!$sessionHall) {
            return "";
        }

        $from = Date::parse($sessionHall->from);
        $to = Date::parse($sessionHall->to);
        $diff = $to->diff($from);
        $hours = $diff->h + ($diff->days * 24);
        $minutes = $diff->i;

        return sprintf('%02d:%02d', $hours, $minutes);
    }

    public function sessionInHalls(): HasMany
    {
        return $this->hasMany(SessionInHall::class);
    }

    public function cinemaHalls(): HasManyThrough
    {
        return $this->hasManyThrough(
            CinemaHall::class,
            SessionInHall::class,
            'film_id',
            'id',
            'id',
            'cinema_hall_id'
        );
    }
}
