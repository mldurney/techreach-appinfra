<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseAPIController as BaseAPIController;
use App\User;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;


/*
|--------------------------------------------------------------------------
| Forgot Password API Controller
|--------------------------------------------------------------------------
|
| This controller handles sending a password reset link via API call.
|
*/

class ForgotPasswordAPIController extends BaseAPIController
{
    use SendsPasswordResetEmails;

    /**
     * Send a reset link to the given user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendResetLinkEmail(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            ['email' => 'required|email'],
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors(), 'Validation error');
        }

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $response = $this->broker()->sendResetLink(
            $this->credentials($request)
        );

        return $response == Password::RESET_LINK_SENT
                    ? $this->sendResponse($response, 'Password reset link sent.')
                    : $this->sendError($response, 'Error resetting password.');
    }
}
