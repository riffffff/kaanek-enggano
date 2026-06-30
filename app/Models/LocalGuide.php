<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LocalGuide extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'whatsapp_number',
        'expertise',
    ];

    public function destinations(): HasMany
    {
        return $this->hasMany(Destination::class);
    }
}
