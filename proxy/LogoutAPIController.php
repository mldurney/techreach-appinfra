<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseAPIController as BaseAPIController;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LogoutAPIController extends BaseAPIController {
	
	public function logout()
    {
		unset($_SESSION["username"]);
		unset($_SESSION["password"]);
        $this->loginProxy->logout();
        Auth::logout();
		return $this ->sendResponse($success, 'You have sucessfully logged out');
    }
	
}
?>
		