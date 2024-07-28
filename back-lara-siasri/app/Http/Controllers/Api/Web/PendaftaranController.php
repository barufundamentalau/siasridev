<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\PendaftaranResource;
use Illuminate\Http\Request;
use GuzzleHttp\Client;


class PendaftaranController extends Controller
{
    /**
     * getPasien
     *
     * @param  mixed $request
     * @return void
     */
    public function getPasien(Request $request)
    {

        // Membuat instance Guzzle client
        $client = new Client();

        $url = 'http://36.67.82.229:806/apps/RegOnline/api/pasien/';
        $response = $client->post($url, [
            'multipart' => [
                [
                    'name' => 'norm',
                    'contents' => $request->input('norm')
                ],
                [
                    'name' => 'tglLahir',
                    'contents' => $request->input('tglLahir')
                ]
            ]
        ]);
        if (isset($response)) {
            $url2 = 'http://36.67.82.229:806/apps/RegOnline/api/carabayar/';
            $response2 = $client->get($url2, [
                'headers' => [
                    'Accept' => 'application/json',
                    'Content-Type' => 'multipart/form-data',
                ]
            ]);
        }
        // $response = $client->post($url, [
        //     'headers' => [
        //         'Content-Type' => 'multipart/form-data',
        //     ]
        // ]);

        //return with Api Resource
        return new PendaftaranResource(true, 'List Data Pasien', [
            'dataPasien' => json_decode($response->getBody()->getContents()),
            'penjamin' => json_decode($response2->getBody()->getContents())

        ]);
    }

    /**
     * getCarabayarData
     *
     * @return void
     */
    public function getCarabayarData()
    {

        // Membuat instance Guzzle client
        $client = new Client();

        $url = 'http://36.67.82.229:806/apps/RegOnline/api/carabayar/';
        $response = $client->get($url, [
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'multipart/form-data',
            ]
        ]);

        //return with Api Resource
        return new PendaftaranResource(true, 'List Data Cara Bayar Data', json_decode($response->getBody()->getContents()));
    }

    /**
     * getKlinikTujuan
     *
     * @return void
     */
    public function getKlinikTujuan()
    {

        // Membuat instance Guzzle client
        $client = new Client();

        // $url = 'http://36.67.82.229:806/apps/RegOnline/api/kliniktujuan/';
        $url = 'http://36.67.82.229:806/apps/RegOnline/api/kliniktujuan/';
        $response = $client->get($url, [
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'multipart/form-data',
            ]
        ]);

        //return with Api Resource
        return new PendaftaranResource(true, 'List Data Klinik Tujuan', json_decode($response->getBody()->getContents()));
    }

    /**
     * getJadwalDokter
     *
     * @return void
     */
    public function getJadwalDokter()
    {

        // Membuat instance Guzzle client
        $client = new Client();

        $url = 'https://simrs.kotamobagu.go.id/apps/RegOnline/api/jadwaldokter/';

        $response = $client->get($url, [
            'headers' => [
                'Accept' => 'application/json',
            ]
        ]);

        //return with Api Resource
        return new PendaftaranResource(true, 'List Data Jadwal', json_decode($response->getBody()->getContents()));
    }


    /**
     * getListPengunjung
     *
     * @param  mixed $request
     * @return void
     */
    public function getListPengunjung()
    {
        // Membuat instance Guzzle client
        $client = new Client();

        $url = 'http://36.67.82.229:806/webservice/dashboard/layanan/pengunjung';

        $response = $client->get($url, [
            'headers' => [
                'Accept' => 'application/json',
            ]
        ]);

        //return with Api Resource
        return new PendaftaranResource(true, 'List Data Pengunjung', json_decode($response->getBody()->getContents()));
    }


    public function getListKunjungan()
    {
        // Membuat instance Guzzle client
        $client = new Client();

        $url = 'https://simrs.kotamobagu.go.id/webservice/dashboard/layanan/kunjungan';

        $response = $client->get($url, [
            'headers' => [
                'Accept' => 'application/json',
            ]
        ]);

        //return with Api Resource
        return new PendaftaranResource(true, 'List Data Kunjungan', json_decode($response->getBody()->getContents()));
    }

    /**
     * getTokenBpjs
     *
     * @return void
     */
    public function getBpjsToken()
    {

        // Membuat instance Guzzle client
        $client = new Client();

        $url = 'http://36.67.82.229:806/webservice/registrasionline/bpjs/getToken';

        $response = $client->get($url, [
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'multipart/form-data',
            ]
        ]);

        //return with Api Resource
        return new PendaftaranResource(true, 'List Get Token', json_decode($response->getBody()->getContents()));
    }


    /**
     * getBayarToken
     *
     * @return void
     */
    public function getBayarToken()
    {

        // Membuat instance Guzzle client
        $client = new Client();

        $url = 'http://36.67.82.229:806/webservice/registrasionline/carabayar';

        $response = $client->get($url, [
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/x-www-form-urlencoded',
                'x-token' => 'ODg4OCYxNzIxMjA5ODYwJjUxYTdhMjMzZmEyYWIyYzQ4ZDRkNjhhZWI0NmYwZmZkJjE4MDlhNWZlNjIzZGYzMWIxMzcyYTA2ZmNiYWMwMDA0',
                'query' => [
                    '_dc' => '1721210237745',
                    'STATUS' => '1',
                ],
            ]
        ]);

        //return with Api Resource
        return new PendaftaranResource(true, 'List Data Bayar Token', json_decode($response->getBody()->getContents()));
    }

    /**
     * getListRujukanKartu
     *
     * @param  mixed $request
     * @return void
     */
    public function getListRujukanKartu(Request $request)
    {

        // Membuat instance Guzzle client
        $client = new Client();

        $url = 'http://36.67.82.229:806/webservice/registrasionline/plugins/getListRujukanKartu';

        $response = $client->get($url, [
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/x-www-form-urlencoded',
                'x-token' => 'ODg4OCYxNzIxMjA5ODYwJjUxYTdhMjMzZmEyYWIyYzQ4ZDRkNjhhZWI0NmYwZmZkJjE4MDlhNWZlNjIzZGYzMWIxMzcyYTA2ZmNiYWMwMDA0',
                // 'query' => [
                //     '_dc' => '1721210237745',
                //     'STATUS' => '1',
                // ],
                'query' => $request->query(), // Mengambil semua query parameters dari request
            ]
        ]);

        //return with Api Resource
        return new PendaftaranResource(true, 'List Data Kartu Rujukan', json_decode($response->getBody()->getContents()));
    }


    /**
     * getListSuratKontrol
     *
     * @param  mixed $request
     * @return void
     */
    public function getListSuratKontrol(Request $request)
    {

        // Membuat instance Guzzle client
        $client = new Client();

        $url = 'http://36.67.82.229:806/webservice/registrasionline/plugins/getListSuratKontrol';

        $response = $client->get($url, [
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/x-www-form-urlencoded',
                'x-token' => 'ODg4OCYxNzIxMjA5ODYwJjUxYTdhMjMzZmEyYWIyYzQ4ZDRkNjhhZWI0NmYwZmZkJjE4MDlhNWZlNjIzZGYzMWIxMzcyYTA2ZmNiYWMwMDA0',
                // 'query' => [
                //     '_dc' => '1721210237745',
                //     'STATUS' => '1',
                // ],
                'query' => $request->query(), // Mengambil semua query parameters dari request
            ]
        ]);

        //return with Api Resource
        return new PendaftaranResource(true, 'List Data Kartu Rujukan', json_decode($response->getBody()->getContents()));
    }


    public function getDiagnosa()
    {

        // Membuat instance Guzzle client
        $client = new Client();

        $url = 'http://36.67.82.229:806/webservice/dashboard/kasus/diagnosa/rj?';
        $response = $client->get($url, [
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ],
            'query' => [
                '_dc' => '1721657333427',
                // 'tglAwal' => $tglAwal,
                // 'tglAkhir' => $tglAkhir,
                // 'type' => '1',
                // 'page' => '1',
                // 'start' => '0',
                // 'limit' => '25',
            ]
        ]);

        //return with Api Resource
        return new
            PendaftaranResource(
                true,
                'List Data Diagnosa',
                json_decode($response->getBody()->getContents())
            );
    }
}
