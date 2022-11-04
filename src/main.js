import { createApp } from 'vue';
import VCalendar from 'v-calendar';
import App from './App.vue';
import router from './router';
import store from './store';
import 'v-calendar/dist/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../public/style.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

createApp(App)
  .use(store)
  .use(router)
  .use(Toast)
  .use(VCalendar, {})
  .mount('#app');
