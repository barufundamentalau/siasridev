<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Direct;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\DirectResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

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
        $directs = Direct::latest()->paginate(5);

        //return with Api Resource
        return new DirectResource(true, 'List Data Directs', $directs);
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
            'title'    => 'required',
            'url'  => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload image
        $image = $request->file('image');
        $image->storeAs('public/directs', $image->hashName());

        //create direct
        $direct = Direct::create([
            'image' => $image->hashName(),
            'user_id'   => auth()->guard('api')->user()->id,
            'title' => $request->title,
            'url' => $request->url,
        ]);

        if ($direct) {
            //return success with Api Resource
            return new DirectResource(true, 'Data Direct Berhasil Disimpan!', $direct);
        }

        //return failed with Api Resource
        return new DirectResource(false, 'Data Direct Gagal Disimpan!', null);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Direct $direct)
    {
        //remove image
        Storage::disk('local')->delete('public/directs/' . basename($direct->image));

        if ($direct->delete()) {
            //return success with Api Resource
            return new DirectResource(true, 'Data Direct Berhasil Dihapus!', null);
        }

        //return failed with Api Resource
        return new DirectResource(false, 'Data Direct Gagal Dihapus!', null);
    }
}
