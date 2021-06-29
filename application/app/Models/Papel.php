<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Papel
 *
 * @property int $id
 * @property string $nome
 * @property string $descricao
 * @property bool $ativo
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Habilidade[] $habilidades
 * @property-read int|null $habilidades_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|Papel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Papel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Papel query()
 * @method static \Illuminate\Database\Eloquent\Builder|Papel whereAtivo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Papel whereDescricao($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Papel whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Papel whereNome($value)
 * @mixin \Eloquent
 */
class Papel extends Model
{
    use HasFactory;

    protected $table = 'papeis';
    protected $fillable = [
        'nome', 'email', 'descricao', 'ativo'
    ];
    protected $casts = [
        'id' => 'int',
        'nome' => 'string',
        'descricao' => 'string',
        'ativo' => 'boolean',
    ];

    public $timestamps = false;

    public function habilidades()
    {
        return $this->belongsToMany(Habilidade::class, 'papeis_habilidades');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'usuarios_papeis');
    }
}
