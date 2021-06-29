<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Categoria
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Categoria newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Categoria newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Categoria query()
 * @mixin \Eloquent
 */
class Categoria extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome', 'ativo'
    ];

    protected $casts = [
        'nome' => 'string',
        'ativo' => 'boolean'
    ];
}
