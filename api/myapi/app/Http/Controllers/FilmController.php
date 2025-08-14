<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class FilmController extends Controller
{
    public function index(Request $request)
    {
        $changeDate = $request->query('changeDate');
        $filterDate = null;

        if ($changeDate) {
            $filterDate = Carbon::parse($changeDate)
                ->startOfDay();
        }

        $params = [
            'sessionInHalls' => function($query) use ($filterDate) {
                if ($filterDate) {
                    $query->whereDate('from', $filterDate->toDateString());
                }

                $query->select(
                    'id', 
                    'cinema_hall_id', 
                    'film_id', 
                    'from', 
                    'to'
                )->distinct();
            },
            'cinemaHalls' => function($query) {
                $query->select('cinema_halls.id', 'name')
                    ->where('is_active', true)
                    ->distinct();
            }
        ];

        try {
            $films = Film::select('id', 'title', 'description', 'image')
                ->with($params)
                ->get();

            $filmsFiltered = $films->filter(function ($film) {
                return $film->sessionInHalls->isNotEmpty();
            })->values();

            return response()->json($filmsFiltered);
        } catch (Exception $e) {
            return response()->json(
                ["err" => $e->getMessage()], 
                500
            );
        }
    }
}
