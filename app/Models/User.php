<?php

namespace App\Models;

use App\Filters\UserFilters;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes, HasRoles, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'deleted_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = [
        'role',
        'status',
        'role_name'
    ];

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }

    public function scopeFilter($query, UserFilters $filters): Builder
    {
        return $filters->apply($query);
    }

    /*
     * @return string|null
     * */
    public function getRoleNameAttribute()
    {
        return optional($this->roles()->first())->name;
    }

    /*
     * @return string|null
     * */
    public function getRoleAttribute()
    {
        return optional($this->roles()->first())->id;
    }

    public function getStatusAttribute(): string
    {
        return $this->deleted_at === null ? 'active' : 'inactive';
    }

    public function getPermissionsAttribute(): array
    {
        return $this->getPermissionsViaRoles()->pluck('name')->toArray();
    }
}
