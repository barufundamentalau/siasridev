<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\About;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\AboutResource;
use Illuminate\Support\Facades\Validator;

class AboutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get abouts
        $abouts = About::when(request()->q, function ($abouts) {
            $abouts = $abouts->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(5);

        //return with Api Resource
        return new AboutResource(true, 'List Data Abouts', $abouts);
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
            'title'     => 'required',
            'embed'     => 'required',
            'content'     => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload image
        $image = $request->file('image');
        $image->storeAs('public/abouts', $image->hashName());

        //create about
        $about = About::create([
            'image' => $image->hashName(),
            'title' => $request->title,
            'embed' => $request->embed,
            'content' => $request->content,
        ]);

        if ($about) {
            //return success with Api Resource
            return new AboutResource(true, 'Data About Berhasil Disimpan!', $about);
        }

        //return failed with Api Resource
        return new AboutResource(false, 'Data About Gagal Disimpan!', null);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $about = About::whereId($id)->first();

        if ($about) {
            //return success with Api Resource
            return new AboutResource(true, 'Detail Data About!', $about);
        }

        //return failed with Api Resource
        return new AboutResource(false, 'Detail Data About Tidak Ditemukan!', null);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, About $about)
    {
        $validator = Validator::make($request->all(), [
            'content'     => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //check image update
        if ($request->file('image')) {

            //remove old image
            Storage::disk('local')->delete('public/abouts/' . basename($about->image));

            //upload new image
            $image = $request->file('image');
            $image->storeAs('public/abouts', $image->hashName());

            //update about with new image
            $about->update([
                'image' => $image->hashName(),
                'title' => $request->title,
                'embed' => $request->embed,
                'content' => $request->content,
            ]);
        }

        //update about without image
        $about->update([
            'title' => $request->title,
            'embed' => $request->embed,
            'content' => $request->content,
        ]);

        if ($about) {
            //return success with Api Resource
            return new AboutResource(true, 'Data About Berhasil Diupdate!', $about);
        }

        //return failed with Api Resource
        return new AboutResource(false, 'Data About Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(About $about)
    {
        //remove image
        Storage::disk('local')->delete('public/abouts/' . basename($about->image));

        if ($about->delete()) {
            //return success with Api Resource
            return new AboutResource(true, 'Data About Berhasil Dihapus!', null);
        }

        //return failed with Api Resource
        return new AboutResource(false, 'Data About Gagal Dihapus!', null);
    }
}
