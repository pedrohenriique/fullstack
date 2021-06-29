<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Produto
 *
 * @property-read \App\Models\Categoria|null $Categoria
 * @method static \Illuminate\Database\Eloquent\Builder|Produto newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Produto newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Produto query()
 * @mixin \Eloquent
 */
class Produto extends Model
{
    use HasFactory;

    protected $fillable = [
        'categoria_id',
        'nome',
        'valor',
        'ativo'
    ];

    protected $casts = [
        'categoria_id' => 'int',
        'nome' => 'string',
        'valor' => 'float',
        'ativo' => 'boolean'
    ];

    protected $appends = ['valorText'];


    public function setValorAttribute($value)
    {
        if (gettype($value) == 'string' && strpos($value, ',') !== FALSE) {
            $this->attributes['valor'] = Sistema::convertFloat($value);
        } else {
            $this->attributes['valor'] = ($value);
        }
    }

    public function getValorTextAttribute()
    {
        return number_format($this->valor, 2, ',', '.');
    }

    public function Categoria()
    {
        return $this->hasOne(Categoria::class, 'id', 'categoria_id');
    }
}
