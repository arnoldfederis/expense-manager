<?php

namespace App\Models;

use App\Filters\RoleFilters;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as Model;

class Role extends Model
{
    use HasFactory;

    public function scopeFilter($query, RoleFilters $filters): Builder
    {
        return $filters->apply($query);
    }
}
