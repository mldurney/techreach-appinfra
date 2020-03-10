<?php
	namespace App\Auth\Requests;
	
	use App\Http\Controllers\API\BaseAPIController as BaseAPIController;
	
	class LoginRequest extends BaseAPIController
	{
		public function authorize()
		{
			return true;
		}

		public function rules()
		{
			return [
				'email'    => 'required|email',
				'password' => 'required'
			];
		}
	}
		
	