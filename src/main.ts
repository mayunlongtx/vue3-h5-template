import { createApp } from 'vue';
import router from './router/index';
import './styles/index.scss';
import 'amfe-flexible';
import App from './App.vue';
import { createPinia } from 'pinia';
import { registerStore } from '@/store/index';
import Vant from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
import directives from './directive/index';
import 'uno.css'

// or init with options
// const vConsole = new VConsole({ theme: 'dark' });
const app = createApp(App);
// directives.install(app);
app.use(createPinia());
registerStore();
app.use(router).use(directives).use(Vant)

app.mount('#app');
