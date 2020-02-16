<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseAPIController as BaseAPIController;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/*
|--------------------------------------------------------------------------
| Products API Controller
|--------------------------------------------------------------------------
|
| This controller contains the functions for the products CRUD API.
|
*/

class ProductsAPIController extends BaseAPIController
{
    /**
     * Display a listing of all products.
     *
     * @return  \Illuimate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        return $this->sendResponse($products->toArray(), 'List all products successful');
    }

    /**
     * Create a new product.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return  \Illuimate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'name' => 'required',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors(), 'Validation error');
        }

        $product = Product::create($data);

        return $this->sendResponse($product->toArray(), 'Product created');
    }

    /**
     * Read a specific product.
     *
     * @param  int  $id
     * @return  \Illuimate\Http\Response
     */
    public function show($id)
    {
        $product = Product::find($id);

        if (is_null($product)) {
            return $this->sendError([], 'Product not found', 404);
        }

        return $this->sendResponse($product->toArray(), 'Product retrieved');
    }

    /**
     * Update the specific product.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (is_null($product)) {
            return $this->sendError([], 'Product not found', 404);
        }

        $data = $request->all();

        $validator = Validator::make($data, [
            'name' => 'required',
            'description' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors(), 'Validation error');  
        }

        $product->name = $data['name'];
        $product->description = $data['description'];
        $product->save();

        return $this->sendResponse($product->toArray(), 'Product updated successfully');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request, $id)
    {
        $product = Product::find($id);

        if (is_null($product)) {
            return $this->sendError([], 'Product not found', 404);
        }

        $product->delete();

        return $this->sendResponse($product->toArray(), 'Product deleted');
    }
}
