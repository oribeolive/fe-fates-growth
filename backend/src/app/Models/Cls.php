<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cls extends Model
{
    use HasFactory;
    protected $table = 'classes';

    public function upper_classes()
    {
        return $this->belongsToMany(
            Cls::class,
            'cc_paths',
            'lower_class_id', 
            'upper_class_id',
        );
    }
}
