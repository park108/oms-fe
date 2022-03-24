import { createApp } from 'vue'
import { createStore } from 'vuex';
import App from './App.vue'
import router from './router'


const store = createStore({
	state() {
		return {
			corp: null,
			list: [],
		}
	}
});

const app = createApp(App).use(router);

app.mount("#app");
app.use(store);