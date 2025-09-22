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
        'duration'
    ];

    protected $appends = [
        'image_url',
    ];

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? asset('storage/' . $this->image) : null;
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
