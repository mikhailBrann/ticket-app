<?php

namespace App\Http\Controllers;

use App\Handlers\QRCodeHandler;
use App\Models\Ticket;
use Arr;
use Carbon\Carbon;
use Exception;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $checkBooking = $this->checkBooking($request);

            if($checkBooking != null) {
                return response()->json(
                    [
                        "err" => "seats is already booked",
                        "code_err" => "dublicate",
                        "value" => $checkBooking["seat_id_list"],
                    ], 
                    403
                );
            }

            $result = Booking::create($request->all());

            return response()->json([
                "booking_id" => $result->id,
            ]);
        } catch (Exception $e) {
            return response()->json(
                ["err" => $e->getMessage()], 
                500
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {

        try {
            $booking->load(["film", "cinemaHall", "sessionInHall"]);
            $film = $booking->film;
            $sessionInHall = $booking->sessionInHall;
            $cinemaHall = $booking->cinemaHall;
            $fromDate = Carbon::parse( $sessionInHall->from);
            $nowDateUtc = Carbon::now();      

            if($fromDate->isBefore($nowDateUtc)) {
                return response()->json(
                    [
                        "err" => "session has already been forgiven",
                        "code_err" => "forgiven",
                        "value" => $sessionInHall->from,
                    ], 
                    403
                );
            }

            if($booking->is_active) {
                return response()->json(
                    [
                        "err" => "already booked!",
                        "code_err" => "booked",
                        "value" => $booking->id,
                    ], 
                    403
                );
            }

            return response()->json([
                "id" => $booking->id,
                "cinema_hall_id" => $cinemaHall->id,
                "session_hall_id" => $sessionInHall->id,
                "film_title" => $film->title,
                "seats_list" => $booking->seat_id_list,
                "cinema_hall_name" => $cinemaHall->name,
                "film_session_start" =>  $sessionInHall->from,
                "summ" =>  $booking->summ
            ]);
        } catch (Exception $e) {
            return response()->json(
                ["err" => $e->getMessage()], 
                500
            );
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        if(!$request->get("is_active")) {
            return response()->json(
                [
                    "err" => "invalide activate key",
                    "code_err" => "invalid_key",
                    "value" => null,
                ], 
                403
            );
        }

        if(!$request->get("url_value")) {
            return response()->json(
                [
                    "err" => "invalide url_value key",
                    "code_err" => "invalid_key",
                    "value" => null,
                ], 
                403
            );
        }

        if($booking->is_active) {
            return response()->json(
                [
                    "err" => "already booked!",
                    "code_err" => "booked",
                    "value" => $booking->id,
                ], 
                403
            );
        }

        $ticket = $this->activateBooking(
            $booking, 
            $request->get("url_value")
        );

        if($booking->save()) {
            return response()->json(
                [
                    "success" => true,
                    "id" => $ticket->id
                ], 
                200
            );
        }
    }

    private function activateBooking(Booking $booking, string $codeUrl): Ticket
    {
        $booking->is_active = true;
        $booking->save();

        $checkTicket = $this->checkTiket($booking->id);

        if($checkTicket !== null) {
            return $checkTicket;
        }

        $ticket = Ticket::create([
            "booking_id" => $booking->id,
            "image" => ""
        ]);
        $qrCode = (new QRCodeHandler(
            $codeUrl . $ticket->id
        ))->getCode();

        $ticket->image = $qrCode;
        $ticket->save();
        
        return $ticket;
    }

    private function checkTiket(int $bookingId)
    {
        $result = Ticket::where("booking_id", $bookingId)
            ->first() ?? null;

        return $result;
    }

    private function checkBooking(Request $request)
    {
        $filmId = $request->input("film_id");
        $cinemaHallId = $request->input("cinema_hall_id");
        $sessionInHallId = $request->input("session_in_hall_id");
        $seatIdList = $request->input("seat_id_list");
        
        $booking = Booking::where("film_id", $filmId)
            ->where("cinema_hall_id", $cinemaHallId)
            ->where("session_in_hall_id", $sessionInHallId)
            ->where(function($query) use ($seatIdList) {
                foreach ($seatIdList as $seatId) {
                    $query->orWhereRaw("seat_id_list @> ?", [json_encode([$seatId])]);
                }
            })
            ->first() ?? null;
        
        return $booking;
    }
}
