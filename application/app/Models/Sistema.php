<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sistema extends Model
{
    use HasFactory;
    public static function DinheiroInsert($dinheiro)
    {
        $valorForma = str_replace('.', '', $dinheiro);
        return $valorForma = str_replace(',', '.', $valorForma);
    }

    public static function DinheiroFormat($dinheiro)
    {
        return number_format($dinheiro, ',', '.');
    }

    public static function convertFloat($numeroString){
        $numeroString = str_replace('.','',$numeroString);
        $numeroString = str_replace(',','.',$numeroString);
        return floatval($numeroString);
    }
}
