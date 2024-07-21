<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Service;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\ServiceResource;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get services
        $services = Service::when(request()->search, function ($services) {
            $services = $services->where('name', 'like', '%' . request()->search . '%');
        })->latest()->paginate(5);

        //append query string to pagination links
        $services->appends(['search' => request()->search]);

        //return with Api Resource
        return new ServiceResource(true, 'List Data Services', $services);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image'    => 'required|mimes:jpeg,jpg,png|max:2000',
            'name'     => 'required',
            'phone'     => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload image
        $image = $request->file('image');
        $image->storeAs('public/services', $image->hashName());

        //create service
        $service = Service::create([
            'image'     => $image->hashName(),
            'name'      => $request->name,
            'phone'      => $request->phone,
        ]);

        if ($service) {
            //return success with Api Resource
            return new ServiceResource(true, 'Data Service Berhasil Disimpan!', $service);
        }

        //return failed with Api Resource
        return new ServiceResource(false, 'Data Service Gagal Disimpan!', null);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $service = Service::whereId($id)->first();

        if ($service) {
            //return success with Api Resource
            return new ServiceResource(true, 'Detail Data Service!', $service);
        }

        //return failed with Api Resource
        return new ServiceResource(false, 'Detail Data Service Tidak Ditemukan!', null);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Service $service)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required',
            'phone'     => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //check image update
        if ($request->file('image')) {

            //remove old image
            Storage::disk('local')->delete('public/aparaturs/' . basename($service->image));

            //upload new image
            $image = $request->file('image');
            $image->storeAs('public/services', $image->hashName());

            //update service with new image
            $service->update([
                'image' => $image->hashName(),
                'name'  => $request->name,
                'phone'  => $request->phone,
            ]);
        }

        //update service without image
        $service->update([
            'name' => $request->name,
            'phone' => $request->phone,
        ]);

        if ($service) {
            //return success with Api Resource
            return new ServiceResource(true, 'Data Service Berhasil Diupdate!', $service);
        }

        //return failed with Api Resource
        return new ServiceResource(false, 'Data Service Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service)
    {
        //remove image
        Storage::disk('local')->delete('public/services/' . basename($service->image));

        if ($service->delete()) {
            //return success with Api Resource
            return new ServiceResource(true, 'Data Service Berhasil Dihapus!', null);
        }

        //return failed with Api Resource
        return new ServiceResource(false, 'Data Service Gagal Dihapus!', null);
    }
}
