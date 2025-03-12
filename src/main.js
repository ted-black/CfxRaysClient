import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import App from './App.vue';

App.devtools = false;

const app = createApp(App);

app.use(createPinia());

app.mount('#cfxApp');
