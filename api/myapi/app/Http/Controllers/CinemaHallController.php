<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\CinemaHall;
use App\Models\Film;
use App\Models\SessionInHall;
use Illuminate\Http\Request;

class CinemaHallController extends Controller
{
    public function show(CinemaHall $cinemaHall, SessionInHall $sessionInHall)
    {
        $sessionInHallResult = $sessionInHall->load('film:id,title');
        $cinemaHallResult = CinemaHall::select("id", "name")
            ->with([
                'seats',  
                'prices' => function($query) use($sessionInHallResult) {
                    $query->where('session_in_hall_id', $sessionInHallResult->id)
                        ->distinct();
                }
            ])
            ->where('id', $cinemaHall->id)
            ->first();
        $isBookingseatIdLists = Booking::where('is_active', true)
            ->where('session_in_hall_id', $sessionInHall->id)
            ->pluck('seat_id_list');
        $allBookingSeatIds = $isBookingseatIdLists->flatten()->all() ?? [];
        

        return response()->json([
            "cinemaHall" => $cinemaHallResult,
            "sessionInHall" => $sessionInHallResult,
            "bookedSeatsList" => $allBookingSeatIds
        ]);
    }
}
