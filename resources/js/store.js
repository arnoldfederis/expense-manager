import Vuex from 'vuex'
import app from './store/App'
import auth from './store/Auth'
import signup from './store/Signup'
import expense from './store/Expense'
import expenseChart from './store/ExpenseChart'
import expenseCategory from './store/ExpenseCategory'
import user from './store/User'
import permission from './store/Permission'
import role from './store/Role'
import userPassword from './store/UserPassword'

export default new Vuex.Store({
  modules: {
    app,
    auth,
    signup,
    expense,
    expenseCategory,
    expenseChart,
    user,
    permission,
    role,
    userPassword
  }
})
