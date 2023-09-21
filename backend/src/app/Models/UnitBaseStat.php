<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UnitBaseStat extends Model
{
    use HasFactory;
    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }
}
