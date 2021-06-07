<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

class PermissionFilters extends Filters
{
    protected $filters = ['order', 'column', 'from', 'to', 'search'];

    public function search(): Builder
    {
        return $this->builder->where('name', 'like', "%{$this->request->search}%");
    }
}
