<?php

namespace Database\Seeders;

use App\Models\ExpenseCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ExpenseCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $expenseCategories = $this->expenseCategory();

        foreach ($expenseCategories as $expenseCategory) {
            $expenseCategory['slug'] = Str::slug($expenseCategory['name']);
            ExpenseCategory::create($expenseCategory);
        }
    }

    protected function expenseCategory(): array
    {
        return [
            ['name' => 'Food'],
            ['name' => 'Transportation'],
        ];
    }
}
