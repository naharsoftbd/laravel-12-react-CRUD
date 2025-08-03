<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\blongsToMany;

class Service extends Model
{
     protected $fillable = [
        'name',
        'product_id'
    ];

    public function product()
    {
        return $this->blongsToMany(Product::clsss);
    }
}
