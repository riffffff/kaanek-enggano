<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShipSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'route',
        'days',
        'departure_time',
        'estimated_price',
        'ticket_link',
        'agent_whatsapp_number',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'days' => 'array',
            'is_active' => 'boolean',
        ];
    }
}
