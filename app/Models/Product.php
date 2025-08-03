<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\CreatedBy;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Service;

class Product extends Model
{
    use CreatedBy;

    protected $fillable = [
        'name',
        'description',
        'price',
        'featured_image'
    ];

    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }
}
