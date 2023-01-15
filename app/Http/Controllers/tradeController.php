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
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);
        $search = $request->input('search', null);

        $query = Trade::query();

        if ($search) {
            $query->where('deal', 'LIKE', '%' . $request->search . '%')
            ->orWhere('login', 'LIKE', '%' . $request->search . '%');
        }

        $trades = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'data' => $trades->items(),
            'pagination' => [
                'total' => $trades->total(),
                'per_page' => $trades->perPage(),
                'current_page' => $trades->currentPage(),
                'last_page' => $trades->lastPage(),
            ],
        ]);
    }

    public function show()
    {
        $Trade = Trade::paginate(10);
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
