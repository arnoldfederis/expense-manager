import Index from './views/Index';
import store from './store';
import auth from './middlewares/Auth'
import guest from './middlewares/Guest'

import ExpenseIndex from './views/expenses/ExpenseIndex';
import ExpenseForm from './views/expenses/ExpenseForm';
import ExpenseCategoryIndex from './views/expense-categories/ExpenseCategoryIndex';
import ExpenseCategoryForm from './views/expense-categories/ExpenseCategoryForm';
import SettingIndex from './views/settings/SettingIndex';
import UserIndex from './views/settings/users/UserIndex';
import UserForm from './views/settings/users/UserForm';
import PermissionIndex from './views/settings/permissions/PermissionIndex';
import PermissionForm from './views/settings/permissions/PermissionForm';
import RoleIndex from './views/settings/roles/RoleIndex';
import RoleForm from './views/settings/roles/RoleForm';
import Auth from './components/Auth';
import Signup from './components/Signup';
import ChangePasswordForm from './views/settings/change-password/ChangePasswordForm';

let routes = [
  {
    path: '/',
    component: Index,
    name: 'index',
    meta: { title: 'Home', middleware: auth }
  },
  {
    path: '/login',
    component: Auth,
    name: 'login',
    meta: { title: 'Login', middleware: guest }
  },
  {
    path: '/signup',
    component: Signup,
    name: 'signup',
    meta: { title: 'Signup', middleware: guest }
  },
  {
    path: '/expenses',
    component: ExpenseIndex,
    name: 'expenseIndex',
    meta: { title: 'Expenses', middleware: auth, permission: 'view_expense' }
  },
  {
    path: '/expenses/create',
    component: ExpenseForm,
    name: 'createExpense',
    props: { action: 'create' },
    meta: { title: 'Create Expense', middleware: auth, permission: 'add_expense' }
  },
  {
    path: '/expenses/:id/edit',
    component: ExpenseForm,
    name: 'editExpense',
    props: { action: 'edit' },
    meta: { title: 'Edit Expense', middleware: auth, permission: 'edit_expense' }
  },
  {
    path: '/expense-categories',
    component: ExpenseCategoryIndex,
    name: 'expenseCategoryIndex',
    meta: { title: 'Expense Categories', middleware: auth, permission: 'view_expense_category' }
  },
  {
    path: '/expense-categories/create',
    component: ExpenseCategoryForm,
    name: 'createExpenseCategory',
    props: { action: 'create' },
    meta: { title: 'Create Expense Category', middleware: auth, permission: 'add_expense_category' }
  },
  {
    path: '/expense-categories/:id/edit',
    component: ExpenseCategoryForm,
    name: 'editExpenseCategory',
    props: { action: 'edit' },
    meta: { title: 'Edit Expense Category', middleware: auth, permission: 'edit_expense_category' }
  },
  {
    path: '/settings',
    component: SettingIndex,
    name: 'settingIndex',
    meta: { title: 'Settings', middleware: auth, permission: 'view_setting' }
  },
  {
    path: '/settings/users',
    component: UserIndex,
    name: 'userIndex',
    meta: { title: 'Users', middleware: auth, permission: 'view_user' }
  },
  {
    path: '/settings/users/create',
    component: UserForm,
    name: 'createUser',
    props: { action: 'create' },
    meta: { title: 'Create User', middleware: auth, permission: 'add_user' }
  },
  {
    path: '/settings/users/:id/edit',
    component: UserForm,
    name: 'editUser',
    props: { action: 'edit' },
    meta: { title: 'Edit User', middleware: auth, permission: 'edit_user' }
  },
  {
    path: '/settings/permissions',
    component: PermissionIndex,
    name: 'permissionIndex',
    meta: { title: 'Permissions', middleware: auth, permission: 'view_permission' }
  },
  {
    path: '/settings/permissions/create',
    component: PermissionForm,
    name: 'createPermission',
    props: { action: 'create' },
    meta: { title: 'Create Permission', middleware: auth, permission: 'add_permission' }
  },
  {
    path: '/settings/permissions/:id/edit',
    component: PermissionForm,
    name: 'editPermission',
    props: { action: 'edit' },
    meta: { title: 'Edit Permission', middleware: auth, permission: 'edit_permission' }
  },
  {
    path: '/settings/roles',
    component: RoleIndex,
    name: 'roleIndex',
    meta: { title: 'Roles', middleware: auth, permission: 'view_role' }
  },
  {
    path: '/settings/roles/create',
    component: RoleForm,
    name: 'createRole',
    props: { action: 'create' },
    meta: { title: 'Create Role', middleware: auth, permission: 'add_role' }
  },
  {
    path: '/settings/roles/:id/edit',
    component: RoleForm,
    name: 'editRole',
    props: { action: 'edit' },
    meta: { title: 'Edit Role', middleware: auth, permission: 'edit_role' }
  },
  {
    path: '/settings/change-password',
    component: ChangePasswordForm,
    name: 'changePassword',
    meta: { title: 'Change Password', middleware: auth, permission: 'edit_password' }
  },
];

let router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'is-active',
});

const nextFactory = (context, middleware, index) => {
  const subsequentMiddleware = middleware[index];

  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
};

router.beforeEach((to, from, next) => {
  let currentTitle = to.meta.title || null;
  if (currentTitle) {
    document.title = currentTitle + ' | ' + 'Expense Manager';
  } else {
    document.title = 'Expense Manager';
  }

  store.commit('app/setIsLoading', true)

  if (!to.meta.middleware) {
    return next();
  }

  const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
  const context = { from, next, router, to };
  const nextMiddleware = nextFactory(context, middleware, 1);

  return _.first(middleware)({ ...context, next: nextMiddleware });
});

export default router;
