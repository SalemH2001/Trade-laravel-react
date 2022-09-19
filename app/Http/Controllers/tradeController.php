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
    public function show(Request $request)
    {
        if($request->deal != null && $request->login != null)
        {
            $query= Trade::where('deal',$request->deal)->get();
        }
        if($request->deal && $request->login == null){
            $query= Trade::where('deal',$request->deal)->get();
        }

        if($request->login && $request->deal == null){
            $query= Trade::where('login',$request->login)->get();
        }

        if(sizeof($query) == 0)
            {
                return response()->json([
                    'message'=>'No Trades Found'
                ],404);
            }else
                return $query;
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
            'deal'=>'integer',  
            'login'=>'integer',
            'action'=>'integer',
            'entry'=>'integer',
            'symbol'=>'string',
            'price'=>'integer',
            'profit'=>'integer',
            'volume'=>'integer',

        ]);
        $request['time']=date('Y-m-d H:i:s');
        $input=$request->all();
        $duplicate=Trade::where('deal',$request->deal)->count();
        if($duplicate != 0){
            return response()->json([
                'message'=>'this deal already there.'
            ],404);
        }else $trade= Trade::create($input);
        $trade->get();
        return new tradeResource($trade);
    }

}