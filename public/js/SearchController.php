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
        
		if(!empty($request['stops'])){
        $stops  = $request['stops'];		
		return $this->getFilterItineraries($stops);
        }
        else{
            $input['stops'] ='';
        }
		
		
        $from_place = $request['from_place'];
        $data = $request->only(['from_place']);
        $to_place = $request['to_place'];
        $date_start = $this->convertDate($request['date_start']);
        
        $date_end = $this->convertDate($request['date_end']);
        $pagesize = $request['pagesize'];
        $pageindex = $request['pageindex'];
        $adults = $request['adults'];
        $children = $request['children'];
	$currency = $request['currency'];
        $flying_class = $request['flying_class'];
        $input['to_place']  = $request['to_place'];
        $input['date_start']  = $request['date_start'];
        $input['adults']  = $request['adults'];
        $input['date_end']  = $request['date_end'];
        $input['children']  = $request['children'];
	$input['currency']  = $request['currency'];

    $temp = array();
       
        
        if(!empty($request['sorttype'])){
            $input['sorttype']  = $request['sorttype'];
           $input['sortorder']  = $request['sortorder'];
        }
        else{
            $input['sorttype']  = 'price';
           $input['sortorder']  = 'asc';
        }
        
        
         
        if(!empty($request['outboundDepartStartTime'])){
        $input['outboundDepartStartTime']  = $request['outboundDepartStartTime'];
        }
        else{
            $input['outboundDepartStartTime'] ='00:00';
        }

        if(!empty($request['inboundDepartStartTime'])){
        $input['inboundDepartStartTime']  = $request['inboundDepartStartTime'];
        }
        else{
            $input['inboundDepartStartTime'] ='00:00';
        }
        if(!empty($request['inboundDepartEndTime'])){
        $input['inboundDepartEndTime']  = $request['inboundDepartEndTime'];
        }
        else{
            $input['inboundDepartEndTime'] ='23:59';
        }
        if(!empty($request['outboundDepartEndTime'])){
        $input['outboundDepartEndTime']  = $request['outboundDepartEndTime'];
        }
        else{
            $input['outboundDepartEndTime'] ='23:59';
        }
         $temp =['country' => 'UK','currency' => $currency ,'locale' => 'en-GB','originplace' => $from_place,'destinationplace' => $to_place,'outbounddate' => $date_start,'inbounddate' => $date_end,'adults' => $adults,'children' => $children,'infants' => '0', 'pagesize' => $pagesize, 'pageindex' =>$pageindex ,'sorttype' => $input['sorttype'], 'sortorder' => $input['sortorder'],'stops'=>$input['stops'], 'inbounddepartstarttime' => $input['inboundDepartStartTime'], 'inbounddepartendtime' => $input['inboundDepartEndTime'], 'outbounddepartstarttime' => $input['outboundDepartStartTime'], 'outbounddepartendtime' => $input['outboundDepartEndTime']
            ];
        if(!empty($request['duration'])){
        $input['duration']  = $request['duration'];
        $temp['duration'] = $input['duration'];

        }
        
       
        $pricing = new LivePrice($this->apiKey);
        
        $pricing->setParameters($temp);
        
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
	
	public function getFilterItineraries($data){
		$pricing = new LivePrice($this->apiKey);
        $temp['stops'] = $data;
        $pricing->setParameters($temp);
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
