<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//group route with prefix "admin"
Route::prefix('admin')->group(function () {

    //route login
    Route::post('/login', App\Http\Controllers\Api\Admin\LoginController::class, ['as' => 'admin']);

    //group route with middleware "auth:api"
    Route::group(['middleware' => 'auth:api'], function () {

        //route user logged in
        Route::get('/user', function (Request $request) {
            return $request->user();
        })->name('user');

        //route logout
        Route::post('/logout', App\Http\Controllers\Api\Admin\LogoutController::class, ['as' => 'admin']);

        //dashboard
        Route::get('/dashboard', App\Http\Controllers\Api\Admin\DashboardController::class, ['as' => 'admin']);

        //categories resource
        Route::apiResource('/categories', App\Http\Controllers\Api\Admin\CategoryController::class, ['except' => ['create', 'edit'], 'as' => 'admin']);

        //places resource
        Route::apiResource('/places', App\Http\Controllers\Api\Admin\PlaceController::class, ['except' => ['create', 'edit'], 'as' => 'admin']);

        //sliders resource
        Route::apiResource('/sliders', App\Http\Controllers\Api\Admin\SliderController::class, ['except' => ['create', 'show', 'edit', 'update'], 'as' => 'admin']);

        //directs resource
        Route::apiResource('/directs', App\Http\Controllers\Api\Admin\DirectController::class, ['except' => ['create', 'show', 'edit', 'update'], 'as' => 'admin']);

        //services resource
        Route::apiResource('/services', App\Http\Controllers\Api\Admin\ServiceController::class, ['except' => ['create', 'show', 'edit', 'update'], 'as' => 'admin']);

        //jkns resource
        Route::apiResource('/jkns', App\Http\Controllers\Api\Admin\JknController::class, ['except' => ['create', 'show', 'edit', 'update'], 'as' => 'admin']);

        //informations resource
        Route::apiResource('/informations', App\Http\Controllers\Api\Admin\InformationController::class, ['except' => ['create', 'edit'], 'as' => 'admin']);

        //users resource
        Route::apiResource('/users', App\Http\Controllers\Api\Admin\UserController::class, ['except' => ['create', 'edit'], 'as' => 'admin']);
    });
});

//group route with prefix "web"
Route::prefix('web')->group(function () {

    //route categories index
    Route::get('/categories', [App\Http\Controllers\Api\Web\CategoryController::class, 'index', ['as' => 'web']]);

    //route categories show
    Route::get('/categories/{slug?}', [App\Http\Controllers\Api\Web\CategoryController::class, 'show', ['as' => 'web']]);

    //route places index
    Route::get('/places', [App\Http\Controllers\Api\Web\PlaceController::class, 'index', ['as' => 'web']]);

    //route places show
    Route::get('/places/{slug?}', [App\Http\Controllers\Api\Web\PlaceController::class, 'show', ['as' => 'web']]);

    //route all places index
    Route::get('/all_places', [App\Http\Controllers\Api\Web\PlaceController::class, 'all_places', ['as' => 'web']]);

    //route sliders
    Route::get('/sliders', [App\Http\Controllers\Api\Web\SliderController::class, 'index', ['as' => 'web']]);

    //route directs
    Route::get('/directs', [App\Http\Controllers\Api\Web\DirectController::class, 'index', ['as' => 'web']]);

    //route services
    Route::get('/services', [App\Http\Controllers\Api\Web\ServiceController::class, 'index', ['as' => 'web']]);

    //route jkns
    Route::get('/jkns', [App\Http\Controllers\Api\Web\JknController::class, 'index', ['as' => 'web']]);

    //route informations index
    Route::get('/informations', [App\Http\Controllers\Api\Web\InformationController::class, 'index', ['as' => 'web']]);

    //route informations show
    Route::get(
        '/informations/{slug?}',
        [App\Http\Controllers\Api\Web\InformationController::class, 'show', ['as' => 'web']]
    );

    //route simrs postPasien
    Route::post('/pasien', [App\Http\Controllers\Api\Web\PendaftaranController::class, 'getPasien', ['as' => 'web']]);

    //route simrs getPasien
    Route::get('/getpasien', [App\Http\Controllers\Api\Web\PendaftaranController::class, 'getPasien', ['as' => 'web']]);

    //route simrs getCaraBayar
    Route::get('/carabayar', [App\Http\Controllers\Api\Web\PendaftaranController::class, 'getCarabayarData', ['as' => 'web']]);

    //route simrs getKlinikTujuan
    Route::get('/kliniktujuan', [App\Http\Controllers\Api\Web\PendaftaranController::class, 'getKlinikTujuan', ['as' => 'web']]);

    //route simrs getJadwalDokter
    Route::get('/jadwaldokter', [App\Http\Controllers\Api\Web\PendaftaranController::class, 'getJadwalDokter', ['as' => 'web']]);

    //route simrs getBpjsToken
    Route::get('/bpjs', [App\Http\Controllers\Api\Web\PendaftaranController::class, 'getBpjsToken', ['as' => 'web']]);

    //route simrs getBayarToken
    Route::get('/bayar', [App\Http\Controllers\Api\Web\PendaftaranController::class, 'getBayarToken', ['as' => 'web']]);

    //route simrs getListRujukanKartu
    Route::get('/listrujukan', [App\Http\Controllers\Api\Web\PendaftaranController::class, 'getListRujukanKartu', ['as' => 'web']]);

    //route simrs getListSuratKontrol
    Route::get('/suratkontrol', [App\Http\Controllers\Api\Web\PendaftaranController::class, 'getListSuratKontrol', ['as' => 'web']]);
});
