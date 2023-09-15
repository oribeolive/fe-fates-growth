<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Parents extends Model
{
    use HasFactory;
    protected $table = 'parents';

    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class, 'unit_id');
    }

    public function fixedParent(): BelongsTo
    {
        return $this->belongsTo(Unit::class, 'fixed_parent');
    }

    public function possibleParent(): BelongsTo
    {
        return $this->belongsTo(Unit::class, 'possible_parent');
    }
}
