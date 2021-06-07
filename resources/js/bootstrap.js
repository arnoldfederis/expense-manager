import Vue from 'vue'
import Axios from 'axios'
import VueRouter from 'vue-router'
import _ from 'lodash'
import Form from './utils/Form'
import Buefy from 'buefy'
import moment from 'moment-timezone'
import VueScrollTo from 'vue-scrollto'
import { get } from './helpers'

const initApp = () => {
  const initVueUse = () => {
    Vue.use(VueRouter);
    Vue.use(VueScrollTo);
    Vue.use(Buefy, {
      defaultIconPack: 'fas',
      defaultSnackbarPosition: 'is-top'
    });
  };

  const initWindows = () => {
    window.Vue = Vue;
    window.axios = Axios;
    window.VueRouter = VueRouter;
    window._ = _;
    window.Form = Form;
    window.moment = moment
    window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    moment.tz.setDefault('Asia/Manila');

    let token = document.head.querySelector('meta[name="csrf-token"]');
    if (token) {
      window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
    } else {
      console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
    }
  };

  const initInterceptors = () => {
    axios.defaults.withCredentials = true;
    axios.interceptors.request.use((config) => {
      let token = get('access_token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    }, (err) => {
      return Promise.reject(err);
    });
  };

  initVueUse();
  initWindows();
  initInterceptors();
};

initApp();
