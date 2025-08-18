<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckBookingAuthorization
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $validateDetectedFlag = false;
        $userAuth = null;

        if(!Auth::check()) {
            $validateDetectedFlag = true;
        } else {
            $userAuth = Auth::user();
        }

        if($userAuth && 
            (!$userAuth->moonshine_users && 
            $userAuth->moonshine_user_role_id != 1)
        ) {
            $validateDetectedFlag = true;
        }

        if($validateDetectedFlag) {
            $request->merge(['is_active' => false]);
        }

        return $next($request);
    }
}
