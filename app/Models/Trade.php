<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trade extends Model
{
    use HasFactory;
    protected $table = "mt5_deals";
    public $timestamps = false;
    public $incrementing = false;
    protected $fillable = ['deal', 'login', 'action', 'entry', 'time', 'symbol', 'price', 'profit', 'volume'];
    protected $attributes = [
        'deal' => 0,
        'login' => 0,
        'action' => 0,
        'entry' => 0,
        'symbol' => '',
        'price' => 0,
        'profit' => 0,
        'volume' => 0,
    ];

}
