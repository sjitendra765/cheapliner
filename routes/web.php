<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/



Route::get('/', function () {
    return view('index');
});



Route::get('flightsearch/{from_place}/{to_place}/{flying_class}/{adults}/{children}/{currency}/{date_start}/{date_end}/{sorttype}
{sortorder}/{pagesize}/{pageindex}/
',function () {
    return view('index');
});



