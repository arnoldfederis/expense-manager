import './bootstrap';
import './components';
import './filters';
import router from './routes';
import store from './store';
import { permissionMixins } from './mixins/permissionMixins'

Vue.mixin(permissionMixins);

const app = new Vue({
  el: '#app',
  router,
  store
});

export default app
