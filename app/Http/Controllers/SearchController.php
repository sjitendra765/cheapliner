<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Carbon\Carbon;
use App\TravelService\Flights\LivePrice;


class SearchController extends Controller
{

    private $client;
    private $apiKey = "se785889316536991843943175619637";

    
    public function flightSearch(Request $request)
    {
        
        $from_place = $request['from_place'];
        $data = $request->only(['from_place']);
        $to_place = $request['to_place'];
        $date_start = $this->convertDate($request['date_start']);
        
        $date_end = $this->convertDate($request['date_end']);
    
        $adults = $request['adults'];
        $children = $request['children'];
        $flying_class = $request['flying_class'];
        $input['to_place']  = $request['to_place'];
        $input['date_start']  = $request['date_start'];
        $input['adults']  = $request['adults'];
        $input['date_end']  = $request['date_end'];
        $input['children']  = $request['children'];
        
        if(!empty($request['sorttype'])){
            $input['sorttype']  = $request['sorttype'];
           $input['sortorder']  = $request['sortorder'];
        }
        else{
            $input['sorttype']  = 'price';
           $input['sortorder']  = 'asc';
        }
        if(!empty($request['stops'])){
        $input['stops']  = $request['stops'];
        }
        else{
            $input['stops'] ='';
        }
       
        $pricing = new LivePrice($this->apiKey);
        $pricing->setParameters(['country' => 'UK','currency' => 'EUR','locale' => 'en-GB','originplace' => $from_place,'destinationplace' => $to_place,'outbounddate' => $date_start,'inbounddate' => $date_end,'adults' => $adults,'children' => $children,'infants' => '0', 'pagesize' => 70, 'pageindex' =>0 ,'sorttype' => $input['sorttype'], 'sortorder' => $input['sortorder'],'stops'=>$input['stops']
            ]);
        
        info('Hi');
        $data = $pricing->get();
        
        while($pricing->getResponseStatus() == 304){
            info('I am sleeping.');
            sleep(4);
            $data = $pricing->get();
            info('I am awake.');
        }
        
        info("Data Status: ".$pricing->getResponseStatus());
        // info('Data: '. $data->Itineraries);
        // $status = $pricing->getResponseStatus();
  
        $flights  = $pricing->getFlights();
        
        info("Flight Status: ".$pricing->getResponseStatus());
        // info('flights: '. $flights);
        
        // $status = $pricing->getResponseStatus();
        
        return $flights;
    }

    public function autoSuggest($data){
        
         //$this->client = new Client([]);
        $this->client = new Client(['headers' => ['Accept' => 'application/json']]);
        $varApiKey = 'apiKey=se785889316536991843943175619637';
        // $data = "nep";
        // $data = $request['query'];
        
         $url = "http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/GB/GBP/en-GB?query=".$data."&".$varApiKey ;


                $res = $this->client->get($url , [
                ]);

                $s = ($res->getBody());

                return $s;

    }


    public function convertDate($value)
    {
        $date = Carbon::parse($value)->format('Y-m-d');
        return $date;
    }
    
}