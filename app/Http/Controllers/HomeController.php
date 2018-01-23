<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class HomeController extends Controller
{

    public function airportList()
    {                           
        $guzzleClient = new Client();
        $response = $guzzleClient->get('http://partners.api.skyscanner.net/apiservices/geo/v1.0?apikey=se785889316536991843943175619637');
        $body = $response->getBody();
        $body->seek(28);
        $size = $body->getSize();
        $file = $body->read($size); 
        dd($response); 

        return $response;

    }


    

}
