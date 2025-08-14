<?php

namespace App\Http\Controllers;

use App\Models\CinemaHall;
use App\Models\Film;
use App\Models\SessionInHall;
use Illuminate\Http\Request;

class CinemaHallController extends Controller
{
    public function show(CinemaHall $cinemaHall, SessionInHall $sessionInHall)
    {
        $sessionInHallResult = $sessionInHall::with('film:id,title' )->first();
        $cinemaHallResult = $cinemaHall->select("id", "name")
            ->with([
                'seats',  
                'prices' => function($query) use($sessionInHallResult) {
                    $query->where('session_in_hall_id', $sessionInHallResult->id)
                        ->distinct();
                }
            ])
            ->first();
        

        return response()->json([
            "cinemaHall" => $cinemaHallResult,
            "sessionInHall" => $sessionInHallResult,
        ]);
    }
}
