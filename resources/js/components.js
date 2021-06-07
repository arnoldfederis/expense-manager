import Vue from 'vue';

import App from './components/App'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Auth from './components/Auth'
import ThemeButton from './components/ThemeButton'
import ScrollToTopButton from './components/ScrollToTopButton';
import DatePick from 'vue-date-pick';
import TableFilter from './components/TableFilter';
import ExpenseCharge from './components/ExpenseChart';

Vue.component('app', App)
Vue.component('navbar', Navbar)
Vue.component('sidebar', Sidebar)
Vue.component('Auth', Auth)
Vue.component('themeButton', ThemeButton)
Vue.component('scrollToTop', ScrollToTopButton)
Vue.component('datePick', DatePick)
Vue.component('tableFilter', TableFilter)
Vue.component('expenseChart', ExpenseCharge)
