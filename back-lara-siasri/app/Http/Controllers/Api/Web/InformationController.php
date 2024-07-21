<?php

namespace App\Http\Controllers\Api\Web;

use App\Models\Information;
use App\Http\Controllers\Controller;
use App\Http\Resources\InformationResource;

class InformationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get informations
        $informations = Information::latest()->get();

        //return with Api Resource
        return new InformationResource(true, 'List Data Informations', $informations);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        // $information = Information::with('places.information')->where('slug', $slug)->first();
        $information = Information::with('information')->where('slug', $slug)->first();

        if ($information) {
            //return success with Api Resource
            return new InformationResource(true, 'List Data By : ' . $information->name, $information);
        }

        //return failed with Api Resource
        return new InformationResource(false, 'Data Information Tidak Ditemukan!', null);
    }
}
