<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Controller;
use App\Models\Jkn;
use App\Http\Resources\JknResource;

class JknController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        $jkns = Jkn::oldest()->get();

        //return with Api Resource
        return new JknResource(true, 'List Data JKN Mobile', $jkns);
    }
}
