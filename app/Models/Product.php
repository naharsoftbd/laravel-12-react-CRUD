<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\CreatedBy;

class Product extends Model
{
    use CreatedBy;

    protected $fillable = [
        'name',
        'description',
        'price',
        'featured_image'
    ];
}
