<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Models\UserMeta;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */
    private $usermeta;
    private $user;
    use RegistersUsers;




    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(UserMeta $usermeta,User $user)
    {
        $this->usermeta = $usermeta;
        $this->user = $user;
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        $user =  User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        $usermetas =[];
        $usermetas['user_id']= $user->id;
        $usermetas['middle_name'] = $data['middle_name'];
            $this->usermeta->user_id= $usermetas['user_id'];
            $this->usermeta->middle_name= $usermetas['middle_name'];
            $this->usermeta->save();
            return true;
    }
    public function getUser($id){

        $data = $user->get();
        return $data;
    }
}
