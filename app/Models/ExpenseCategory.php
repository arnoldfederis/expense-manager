<?php

namespace App\Models;

use App\Filters\ExpenseCategoryFilters;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ExpenseCategory extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }

    public function scopeFilter($query, ExpenseCategoryFilters $filters): Builder
    {
        return $filters->apply($query);
    }
}
