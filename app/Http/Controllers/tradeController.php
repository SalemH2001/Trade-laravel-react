<?php

namespace App\Http\Controllers;

use App\Http\Resources\tradeResource;
use App\Models\Trade;
use Illuminate\Http\Request;

class tradeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        if($request->search){
            $query= Trade::where('deal', 'LIKE', '%'.$request->search.'%')
                    ->orWhere('login', 'LIKE', '%'.$request->search.'%')
                    ->paginate(10);
        }
        if($request->search == null){
            return response()->json([
                'message' => 'Please enter a value',
            ], 400);
        }
        if (sizeof($query) == 0) {
            return response()->json([
                'message' => 'No Trades Found',
            ], 404);
        } else {
            return $query;
        }

    }

    public function show(){
        $Trade= Trade::paginate(10);
        return $Trade;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'deal' => 'integer',
            'login' => 'integer',
            'action' => 'integer',
            'entry' => 'integer',
            'symbol' => 'string',
            'price' => 'integer',
            'profit' => 'integer',
            'volume' => 'integer',

        ]);
        $request['time'] = date('Y-m-d H:i:s');
        $input = $request->all();
        $duplicate = Trade::where('deal', $request->deal)->count();
        if ($duplicate != 0) {
            return response()->json([
                'message' => 'this deal already there.',
            ], 400);
        } else {
            $trade = Trade::create($input);
        }

        return new tradeResource($trade);
    }

}
