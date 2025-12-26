<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Folder extends Model
{
    protected $fillable = [
        'folder_name',
        'allow_others_upload',
        'visibility',
        'share_token',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function files(): HasMany
    {
        return $this->hasMany(File::class);
    }

    protected static function booted()
    {
        static::creating(function ($folder) {
            if (!$folder->share_token) {
                $folder->share_token = Str::random(12);
            }
        });
    }
}
