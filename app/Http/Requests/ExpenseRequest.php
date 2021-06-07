<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ExpenseRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'expense_category_id' => 'required',
            'description' => [
                'required',
                Rule::unique('expenses')->ignore($this->expense)
            ],
            'amount' => 'required|numeric',
            'expense_date' => 'required|date',
        ];
    }
}
