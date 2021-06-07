<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

abstract class Filters
{
    /**
     * @var Request
     */
    protected $request;

    /**
     * The Eloquent builder.
     *
     * @var Builder
     */
    protected $builder;

    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [];

    /**
     * Create a new ThreadFilters instance.
     *
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Apply the filters.
     *
     * @param Builder $builder
     * @return Builder
     */
    public function apply(Builder $builder): Builder
    {
        $this->builder = $builder;
        foreach ($this->getFilters() as $filter => $value) {
            if (method_exists($this, $filter)) {
                $this->$filter($value);
            }
        }
        return $this->builder;
    }

    /**
     * Fetch all relevant filters from the request.
     *
     * @return array
     */
    public function getFilters(): array
    {
        return $this->request->only($this->filters);
    }

    protected function order(): Builder
    {
        return $this->orderBy();
    }

    protected function column(): Builder
    {
        return $this->orderBy();
    }

    public function orderBy(): Builder
    {
        if ($this->request->has('order') && $this->request->has('column')) {
            return $this->builder->orderBy($this->request->column, $this->request->order);
        }
    }

    protected function from(): Builder
    {
        return $this->getByDate();
    }

    protected function to(): Builder
    {
        return $this->getByDate();
    }

    public function getByDate(): Builder
    {
        if ($this->request->has('from') && $this->request->has('to')) {
            return $this->builder->whereBetween('updated_at', [Carbon::parse("{$this->request->from} 00:00:00"), Carbon::parse("{$this->request->to} 23:59:59")]);
        }
    }
}
