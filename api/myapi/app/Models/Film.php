<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Film extends Model
{
    use HasFactory;
    
    protected $table = 'films';

    protected $fillable = [
        'title',
        'description',
        'image',
    ];

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    public function sessionInHalls(): HasMany
    {
        return $this->hasMany(SessionInHall::class);
    }

    public function cinemaHalls()
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
