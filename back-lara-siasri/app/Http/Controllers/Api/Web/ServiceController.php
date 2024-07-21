<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Http\Resources\ServiceResource;

class ServiceController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        $services = Service::oldest()->get();

        //return with Api Resource
        return new ServiceResource(true, 'List Data Services', $services);
    }
}
