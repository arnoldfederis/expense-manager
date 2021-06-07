<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

class ExpenseFilters extends Filters
{
    protected $filters = ['search', 'expense_category_id', 'from', 'to'];

    public function search(): Builder
    {
        $searchString = "%{$this->request->search}%";
        return $this->builder
            ->where('description', 'like', $searchString)
            ->whereHas('expense_category')
            ->orWhereHas('expense_category', function ($query) use ($searchString) {
                $query->where('name', 'like', $searchString);
            });
    }

    public function expense_category_id(): Builder
    {
        return $this->builder->whereExpenseCategoryId($this->request->expense_category_id);
    }
}
