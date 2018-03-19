<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\User;

class UserMeta extends Model
{
    protected $fillable = ['user_id','middle_name'];

    public function user(){
        return $this->belongsTo(User::class,'id','user_id');
    }



 }
