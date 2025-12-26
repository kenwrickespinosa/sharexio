<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class File extends Model
{
    protected $fillable = [
        'file_name',
        'file_path',
        'mime_type',
        'size',
        'shared_token',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class);
    }

    protected static function booted()
    {
        static::creating(function($file) {
            if (!$file->share_token) {
                $file->share_token = Str::random(12);
            }
        });
    }
}
