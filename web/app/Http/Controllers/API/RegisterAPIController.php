<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseAPIController as BaseAPIController;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

/*
|--------------------------------------------------------------------------
| Register API Controller
|--------------------------------------------------------------------------
|
| This controller handles creating a new user via API call, rather than
| through form submission.
|
*/

class RegisterAPIController extends BaseAPIController
{
    /**
     * Register a new user with the passed in parameters.
     *
     * @return \Illuimate\Http\Response
     */
    public function register(Request $request)
    {
        // see Laravel docs about confirmed parameter: 
        // confirmed: "The field under validation must have a matching field of 
        // foo_confirmation. For example, if the field under validation is 
        // password, a matching password_confirmation field must be present 
        // in the input"
        $data = $request->all();

        $validator = Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        // If validation fails on any one of the parameters, return error
        // response.
        if ($validator->fails()) {
            return $this->sendError($validator->errors(), 'Validation error');
        }

        // Otherwise, go ahead and create the new user.
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        // Send back the user token and the name, email used to register as
        // confirmation.
        $success = [
            'token' => $user->createToken('UserToken')->accessToken,
            'name' => $user->name,
            'email' => $user->email
        ];

        // Return a successful response.
        return $this->sendResponse($success, 'User created successfully');
    }
}
