<?php

namespace App\Http\Controllers;

use App\Filters\ExpenseFilters;
use App\Http\Requests\ExpenseRequest;
use App\Models\Expense;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    public function index(ExpenseFilters $filters): LengthAwarePaginator
    {
        if (Auth::user()->role_name === 'user') {
            return Expense::filter($filters)
                ->byUser(Auth::id())
                ->with(['expense_category:id,name', 'user:id,name'])
                ->orderByDesc('updated_at')
                ->paginate(request('per_page'));
        }

        return Expense::filter($filters)
            ->with(['expense_category:id,name', 'user:id,name'])
            ->orderByDesc('updated_at')
            ->paginate(request('per_page'));
    }

    public function store(ExpenseRequest $request): Expense
    {
        return Auth::user()->expenses()->create($request->validated());
    }

    public function edit(Expense $expense): Expense
    {
        return $expense->load('expense_category:id,name');
    }

    public function update(ExpenseRequest $request, Expense $expense): bool
    {
        return $expense->update($request->validated());
    }

    public function destroy(Expense $expense): bool
    {
        try {
            return $expense->delete();
        } catch (\Exception $e) {
            return false;
        }
    }
}
