<?php

namespace App\Traits;

use App\Events\CreatedByEvent;
use App\Events\DeletedByEvent;
use App\Events\UpdatedByEvent;
use App\Models\Authentication\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait CreatedBy
{
    // public function getActivitylogOptions(): LogOptions
    // {
    //     return LogOptions::defaults()->logAll();
    // }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by')->select('id', 'name');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by')->select('id', 'name');
    }

    public function scopeActive($query): void
    {
        $query->where('status', 1);
    }

    public static function bootCreatedBy(): void
    {
        static::creating(function ($model) {
            event(new CreatedByEvent($model));
        });

        static::updating(function ($model) {
            event(new UpdatedByEvent($model));
        });
        static::deleting(function ($model) {
            event(new DeletedByEvent($model));
        });
    }
}
