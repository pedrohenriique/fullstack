<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Pedido
 *
 * @property-read \App\Models\Cliente|null $Cliente
 * @property-read \App\Models\Produto|null $Produto
 * @method static \Illuminate\Database\Eloquent\Builder|Pedido newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pedido newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pedido query()
 * @mixin \Eloquent
 */
class Pedido extends Model
{
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'produto_id',
        'quantidade',
        'valor_total',
        'status',
    ];

    protected $casts = [
        'cliente_id' => 'int',
        'produto_id' => 'int',
        'quantidade' => 'int',
        'valor_total' => 'float',
        'status' => 'string',
    ];

    protected $appends = ['valorText'];


    public function setValorTotalAttribute($value)
    {
        if (gettype($value) == 'string' && strpos($value, ',') !== FALSE) {
            $this->attributes['valor_total'] = Sistema::convertFloat($value);
        } else {
            $this->attributes['valor_total'] = ($value);
        }
    }

    public function getValorTextAttribute()
    {
        return number_format($this->valor_total, 2, ',', '.');
    }

    public function Cliente()
    {
        return $this->hasOne(Cliente::class, 'id', 'cliente_id');
    }

    public function Produto()
    {
        return $this->hasOne(Produto::class, 'id', 'produto_id');
    }
}
