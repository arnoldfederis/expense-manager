<?php

namespace App\Http\Controllers;

use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ExpenseChartController extends Controller
{
    public function index()
    {
        $query = DB::table('expense_categories as ec')
            ->selectRaw("
                ec.name as name,
                sum(e.amount) as total
            ")
            ->where('e.user_id', Auth::id())
            ->leftJoin('expenses as e', 'e.expense_category_id', '=', 'ec.id')
            ->orderBy('ec.name')
            ->groupBy(['ec.name']);

        $result = [];

        foreach ($this->getQuery($query)->get() as $data) {
            if (empty($result[$data->name])) {
                $result[$data->name] = $data->total;
            }
        }

        return $result;
    }

    public function getQuery(Builder $query): Builder
    {
        if($timeFrom = request('from')) {
            $query->where('e.updated_at', '>=', "{$timeFrom} 00:00:00");
        }

        if($timeTo = request('to')) {
            $query->where('e.updated_at', '<=', "{$timeTo} 23:59:59");
        }

        return $query;
    }
}
