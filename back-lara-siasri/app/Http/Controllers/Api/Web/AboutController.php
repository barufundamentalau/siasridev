<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Controller;
use App\Models\About;
use App\Http\Resources\AboutResource;

class AboutController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        $abouts = About::oldest()->get();

        //return with Api Resource
        return new AboutResource(true, 'List Data About', $abouts);
    }
}
