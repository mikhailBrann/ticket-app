<?php

namespace App\Http\Controllers;

use App\Handlers\QRCodeHandler;
use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\Booking;

class TicketController extends Controller
{

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticketElem)
    {
        $ticketElem->load(["booking"])->get();
        $booking = $ticketElem->booking->load(["film", "cinemaHall", "sessionInHall"]);
        $film = $booking->film;
        $sessionInHall = $booking->sessionInHall;
        $cinemaHall = $booking->cinemaHall;

        return response()->json([
            "id" => $ticketElem->id,
            "image" => $ticketElem->image,
            "film_title" => $film->title,
            "seats_list" => $booking->seat_id_list,
            "cinema_hall_name" => $cinemaHall->name,
            "film_session_start" =>  $sessionInHall->from,
        ]);
    }
}
