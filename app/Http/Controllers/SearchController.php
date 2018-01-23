<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Carbon\Carbon;


class SearchController extends Controller
{

	
    public function flightSearch(Request $request)
    {  
		$from_place = $request['from-place'];
		$to_place = $request['to-place'];
		$date_start = $request['date-start'];
		$date_end = $request['date-end'];
		$flying_class = $request['flying-class'];
		$adults = $request['adults'];
		$children = $request['children'];


	/*	$pricing = new LivePricing($apiKey = 'se785889316536991843943175619637', $country = 'DE', $currency = 'EUR', $locale = 'de-DE');
		$pricing->setParameters([
    		'adults' => 1,
		    'destinationplace' => 'IST',
		    'originplace' => 'LHR',
		    //'outbounddate' => $this->convertDate($date_start),
		    'outbounddate' => '12.11.2017',
		    //'inbounddate' => $this->convertDate($date_end)
		    'inbounddate' => '24.11.2017'
		]);
			$flights = $pricing->parseFlights($onlyCheapestAgentPerItinerary = true);
			dd($flights);*/
		
	}



	public function convertDate($value)
	{
		$date = Carbon::parse($value)->format('Y-m-d');
		return $date;
	}
	
}
