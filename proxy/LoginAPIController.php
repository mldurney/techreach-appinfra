<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseAPIController as BaseAPIController;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Auth\LoginProxy;
use App\Auth\Requests\LoginRequest;
use App\Http\Controller;
use AuthenticatesUsers;
	


class LoginAPIController extends BaseAPIController {
	
	protected $redirectTo = '/home';
	
	private $loginProxy;

    public function __construct(LoginProxy $loginProxy)
    {
        $this->loginProxy = $loginProxy;
    }

    public function login(LoginRequest $request)
    {
		$validator = Validator::make($request->all(), [
            'login_email'     => 'required|email|exists:users,mail',
            'login_password'  => ['required', 'string', 'min:8', 'confirmed'],
        ]);
		
		if ( $validator->fails()) {
            return $this->sendError($validator->errors(), 'Incorrect email or password form.');
        } 
		if (!Auth::attempt(['mail' => $request->input('login_email'), 'password' => $request->input('login_password')])) {
            return $this->sendError($validator->errors(), 'Invalid Credentials.');
        } 
		
        else {
			if(!isset($response->access_token)) {
				die('Error fetching access token');
			}
				$token = http($metadata->introspection_endpoint, [
				'token' => $response->access_token,
				'client_id' => $client_id,
				'client_secret' => $client_secret,
			]);

			if($token->active == 1) {
				session_start();
				$_SESSION['username'] = $token->username;
				header('Location: /');
				die();
			}
			$user = Auth::user();
			Auth::login($user);
			Auth::login($user,true); //remember the user.
			Auth::loginUsingId(1); //login user by id column.
		}
    }

    public function refresh(Request $request)
    {
        return $this->response($this->loginProxy->attemptRefresh());
    }

    public function logout()
    {
		unset($_SESSION["username"]);
		unset($_SESSION["password"]);
        $this->loginProxy->logout();
        Auth::logout();
		return $this ->sendResponse($success, 'You have sucessfully logged out');
    }
	


	

		