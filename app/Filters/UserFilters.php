<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class UserFilters extends Filters
{
    protected $filters = ['search', 'from', 'to', 'status', 'authenticated_user'];

    public function search(): Builder
    {
        $searchString = "%{$this->request->search}%";
        return $this->builder
            ->where('name', 'like', $searchString)
            ->orWhere('email', 'like', $searchString);
    }

    public function authenticated_user(): Builder
    {
        return $this->builder->where('id', '!=', Auth::id());
    }

    public function status(): Builder
    {
        if ($this->request->status === 'active') {
            return $this->builder->whereNull('deleted_at');
        } else {
            return $this->builder->whereNotNull('deleted_at');
        }
    }
}
