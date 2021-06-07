<?php

namespace App\Models;

use App\Filters\PermissionFilters;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Permission as Model;

class Permission extends Model
{
    use HasFactory;

    public function scopeFilter($query, PermissionFilters $filters): Builder
    {
        return $filters->apply($query);
    }
}
