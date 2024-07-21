<?php

namespace App\Http\Controllers\Api\Web;

use App\Models\Direct;
use App\Http\Controllers\Controller;
use App\Http\Resources\DirectResource;

class DirectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get directs
        $directs = Direct::latest()->get();

        //return with Api Resource
        return new DirectResource(true, 'List Data Directs', $directs);
    }
}
