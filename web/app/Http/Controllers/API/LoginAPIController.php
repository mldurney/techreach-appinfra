<?php

namespace App\Http\Controllers\API;

use DB;
// use Auth;
// use Cookie;
// use Illuminate\Http\Request;

use App\Http\Controllers\API\BaseAPIController as BaseAPIController;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;

/*
|--------------------------------------------------------------------------
| Login API Controller
|--------------------------------------------------------------------------
|
| This controller handles logging in and out a user through the API.
|
*/

class LoginAPIController extends BaseAPIController
{
    /**
     * Login a user via API.
     *
     * @return \Illuimate\Http\Response
     */
    public function login(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'email' => ['required', 'string', 'email', 'max:255', 'exists:users'],
            'password' => ['required', 'string'],
        ]);

        // If validation fails on any one of the parameters, return error
        // response.
        if ($validator->fails()) {
            return $this->sendError($validator->errors(), 'Validation error');
        }

        // Pass to oauth proxy
        $request->replace([
            'grant_type' => 'password',
            'username' => $data['email'],
            'password' => $data['password']
        ]);

        return $this->proxy($request);
    }

    /**
     * Refresh access token via API.
     *
     * @return \Illuimate\Http\Response
     */
    public function refresh(Request $request)
    {   
        $data = $request->all();

        $validator = Validator::make($data, [
            'refresh_token' => ['required'],
        ]);

        // If validation fails on any one of the parameters, return error
        // response.
        if ($validator->fails()) {
            return $this->sendError($validator->errors(), 'Validation error');
        }

        $request->replace([
            'grant_type' => 'refresh_token',
            'refresh_token' => $data['refresh_token']
        ]);

        return $this->proxy($request);
    }

    /**
     * OAuth proxy
     *
     * @return \Illuimate\Http\Response
     */
    public function proxy(Request $request)
    {
        // $http = new Client();
        $client = DB::table('oauth_clients')->where('name', 'LIKE', '%Password Grant Client')->first();

        // if cannot connect to DB, return error
        if ($client === null) {
            return $this->sendError([], 'Server error');
        }

        // make the request to the oauth endpoint with our constructed request
        $request->merge([
            'client_id' => $client->id,
            'client_secret' => $client->secret,
            'scope' => '*'
        ]);

        // dispatch to the oauth route
        $oauthRequest = Request::create('/oauth/token','post');
        return Route::dispatch($oauthRequest);
    }

    /**
     * Logout
     *
     * @return \Illuimate\Http\Response
     */
    public function logout(Request $request)
    {
        $accessToken = Auth::user()->token();
        DB::table('oauth_refresh_tokens')->where(
            'access_token_id', 
            $accessToken->id
        )->update(
            ['revoked' => true]
        );
        $accessToken->revoke();
        return $this->sendResponse([], 'Logged out successfully');
    }
}
