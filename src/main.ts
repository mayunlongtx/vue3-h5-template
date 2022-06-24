import { createApp } from 'vue';
import router from './router/index';
import 'vant/lib/index.css';
import './styles/index.scss';
import 'amfe-flexible';
import App from './App.vue';
import { createPinia } from 'pinia';
import { registerStore } from '@/store/index';
import Vant from 'vant';
import 'vant/lib/index.css';
import directives from './directive/index';
import '@/styles/care.scss';
import { isDev, isCare } from './utils/is';
// import VConsole from 'vconsole';
console.log(isCare(), 'isCare');
console.log(isDev(), 'isDev');

// or init with options
// const vConsole = new VConsole({ theme: 'dark' });
const app = createApp(App);
// directives.install(app);
app.use(createPinia());
registerStore();
app.use(router).use(directives).use(Vant);

app.mount('#app');
