<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Jkn;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\JknResource;
use Illuminate\Support\Facades\Validator;

class JknController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get jkns
        $jkns = Jkn::when(request()->search, function ($jkns) {
            $jkns = $jkns->where('title', 'like', '%' . request()->search . '%');
        })->latest()->paginate(5);

        //append query string to pagination links
        $jkns->appends(['search' => request()->search]);

        //return with Api Resource
        return new JknResource(true, 'List Data Jkn Mobile', $jkns);
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
            'title'     => 'required',
            'embed'   => 'required',
            'content'   => 'required',
            'ios'   => 'required',
            'android'   => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //create jkn
        $jkn = Jkn::create([
            'title'     => $request->title,
            'embed'   => $request->embed,
            'content'   => $request->content,
            'ios'   => $request->ios,
            'android'   => $request->android
        ]);

        if ($jkn) {
            //return success with Api Resource
            return new JknResource(true, 'Data Jkn Mobile Berhasil Disimpan!', $jkn);
        }

        //return failed with Api Resource
        return new JknResource(false, 'Data Jkn Mobile Gagal Disimpan!', null);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $jkn = Jkn::whereId($id)->first();

        if ($jkn) {
            //return success with Api Resource
            return new JknResource(true, 'Detail Data Jkn Mobile!', $jkn);
        }

        //return failed with Api Resource
        return new JknResource(false, 'Detail Data Jkn Mobile Tidak Ditemukan!', null);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Jkn $jkn)
    {
        $validator = Validator::make($request->all(), [
            'title'     => 'required',
            'embed'   => 'required',
            'content'   => 'required',
            'ios'   => 'required',
            'android'   => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //update jkn
        $jkn->update([
            'title'     => $request->title,
            'embed'   => $request->embed,
            'content'   => $request->content,
            'ios'   => $request->ios,
            'android'   => $request->android
        ]);

        if ($jkn) {
            //return success with Api Resource
            return new JknResource(true, 'Data Jkn Mobile Berhasil Diupdate!', $jkn);
        }

        //return failed with Api Resource
        return new JknResource(false, 'Data Jkn Mobile Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Jkn $jkn)
    {
        if ($jkn->delete()) {
            //return success with Api Resource
            return new JknResource(true, 'Data Jkn Mobile Berhasil Dihapus!', null);
        }

        //return failed with Api Resource
        return new JknResource(false, 'Data Jkn Mobile Gagal Dihapus!', null);
    }
}
