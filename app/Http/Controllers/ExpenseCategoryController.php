<?php

namespace App\Http\Controllers;

use App\Filters\ExpenseCategoryFilters;
use App\Http\Requests\ExpenseCategoryRequest;
use App\Models\ExpenseCategory;
use Illuminate\Support\Str;

class ExpenseCategoryController extends Controller
{
    public function index(ExpenseCategoryFilters $filters)
    {
        if (request('get_all')) {
            return ExpenseCategory::filter($filters)->get();
        }

        return ExpenseCategory::filter($filters)
            ->orderByDesc('updated_at')
            ->paginate(request('per_page'));
    }

    public function store(ExpenseCategoryRequest $request): ExpenseCategory
    {
        $attributes = $request->validated();
        $attributes['slug'] = Str::slug($attributes['name']);
        return ExpenseCategory::create($attributes);
    }

    public function edit(ExpenseCategory $expenseCategory): ExpenseCategory
    {
        return $expenseCategory;
    }

    public function update(ExpenseCategoryRequest $request, ExpenseCategory $expenseCategory): bool
    {
        $attributes = $request->validated();
        $attributes['slug'] = Str::slug($attributes['name']);
        return $expenseCategory->update($attributes);
    }

    public function destroy(ExpenseCategory $expenseCategory): bool
    {
        try {
            return $expenseCategory->delete();
        } catch (\Exception $e) {
            return false;
        }
    }
}
