<?php

use App\Http\Controllers\CinemaHallController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FilmController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::get('films', [FilmController::class, 'index']);
    Route::get('hall/{cinemaHall}/session/{sessionInHall}', [CinemaHallController::class, 'show']);
});
