<?php

namespace App\Models;

use App\Filters\ExpenseFilters;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Expense extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function expense_category(): BelongsTo
    {
        return $this->belongsTo(ExpenseCategory::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withTrashed();
    }

    public function getAmountAttribute($value): string
    {
        return number_format($value, 2, '.', ',');
    }

    public function scopeByUser($query, $id): Builder
    {
        return $query->whereUserId($id);
    }

    public function scopeFilter($query, ExpenseFilters $filters): Builder
    {
        return $filters->apply($query);
    }
}
