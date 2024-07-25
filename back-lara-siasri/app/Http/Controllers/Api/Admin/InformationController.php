<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Information;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\InformationResource;
use Illuminate\Support\Facades\Validator;

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
        $informations = Information::when(request()->q, function ($informations) {
            $informations = $informations->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(5);

        //return with Api Resource
        return new InformationResource(true, 'List Data Informations', $informations);
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
            'image'    => 'required|image|mimes:jpeg,jpg,png|max:2000',
            'name'     => 'required|unique:information',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload image
        $image = $request->file('image');
        $image->storeAs('public/informations', $image->hashName());

        //create information
        $information = Information::create([
            'image' => $image->hashName(),
            'name' => $request->name,
            'slug' => Str::slug($request->name, '-'),
        ]);

        if ($information) {
            //return success with Api Resource
            return new InformationResource(true, 'Data Information Berhasil Disimpan!', $information);
        }

        //return failed with Api Resource
        return new InformationResource(false, 'Data Information Gagal Disimpan!', null);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $information = Information::whereId($id)->first();

        if ($information) {
            //return success with Api Resource
            return new InformationResource(true, 'Detail Data Information!', $information);
        }

        //return failed with Api Resource
        return new InformationResource(false, 'Detail Data Information Tidak Ditemukan!', null);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Information $information)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|unique:informations,name,' . $information->id,
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //check image update
        if ($request->file('image')) {

            //remove old image
            Storage::disk('local')->delete('public/informations/' . basename($information->image));

            //upload new image
            $image = $request->file('image');
            $image->storeAs('public/informations', $image->hashName());

            //update information with new image
            $information->update([
                'image' => $image->hashName(),
                'name' => $request->name,
                'slug' => Str::slug($request->name, '-'),
            ]);
        }

        //update information without image
        $information->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name, '-'),
        ]);

        if ($information) {
            //return success with Api Resource
            return new InformationResource(true, 'Data Information Berhasil Diupdate!', $information);
        }

        //return failed with Api Resource
        return new InformationResource(false, 'Data Information Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Information $information)
    {
        //remove image
        Storage::disk('local')->delete('public/informations/' . basename($information->image));

        if ($information->delete()) {
            //return success with Api Resource
            return new InformationResource(true, 'Data Information Berhasil Dihapus!', null);
        }

        //return failed with Api Resource
        return new InformationResource(false, 'Data Information Gagal Dihapus!', null);
    }
}
