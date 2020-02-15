<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;

/*
|--------------------------------------------------------------------------
| Base API Controller
|--------------------------------------------------------------------------
|
| This controller provides two basic methods for wrapping a response from
| an API call and indicating to the client whether it succeeded or not.
|
*/

class BaseAPIController extends Controller
{
    /**
     * Return a response on a successful API call.
     *
     * @return \Illuimate\Http\Response
     */
    public function sendResponse($result, $message)
    {
        $response = [
            'success' => true,
            'data' => $result,
            'message' => $message,
        ];

        // 200 OK
        return response()->json($response, 200);
    }
    /**
     * Return a response on an error in the API call.
     *
     * @return \Illuimate\Http\Response
     */
    public function sendError($result = [], $message, $code = 400)
    {
        $response = [
            'success' => false,
            'message' => $message,
        ];

        if(!empty($result)){
            $response['data'] = $result;
        }

        // Optional error HTTP status code. Default is 400 Bad Request.
        return response()->json($response, $code);
    }
}
