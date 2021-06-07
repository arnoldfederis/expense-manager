<?php

namespace Database\Factories;

use App\Models\Expense;
use App\Models\ExpenseCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExpenseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Expense::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::factory()->create()->syncRoles('user'),
            'expense_category_id' => ExpenseCategory::factory(),
            'description' => $this->faker->sentence(),
            'amount' => $this->faker->randomFloat(),
            'expense_date' => now()
        ];
    }
}
