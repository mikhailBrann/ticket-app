<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\CinemaHallController;
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FilmController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::get('films', [FilmController::class, 'index']);
    Route::get('hall/{cinemaHall}/session/{sessionInHall}', [CinemaHallController::class, 'show']);
    Route::post('booking', [BookingController::class, 'store'])
        ->middleware('check.booking.authorization');
    Route::get('payment/{booking}', [BookingController::class, 'show']);
    Route::put('payment/{booking}', [BookingController::class, 'update']);
    Route::get('ticket/{ticketElem}', [TicketController::class, 'show']);
});
