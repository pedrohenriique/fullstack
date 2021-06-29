<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Habilidade
 *
 * @property int $id
 * @property string $nome
 * @property string $descricao
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Papel[] $papeis
 * @property-read int|null $papeis_count
 * @method static \Illuminate\Database\Eloquent\Builder|Habilidade newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Habilidade newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Habilidade query()
 * @method static \Illuminate\Database\Eloquent\Builder|Habilidade whereDescricao($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Habilidade whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Habilidade whereNome($value)
 * @mixin \Eloquent
 */
class Habilidade extends Model
{
    use HasFactory;

    protected $table = 'habilidades';
    protected $fillable = [
        'nome', 'descricao'
    ];

    public $timestamps = false;

    public function papeis()
    {
        return $this->belongsToMany(Papel::class, 'papeis_habilidades');
    }
}
