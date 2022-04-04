import { createApp } from 'vue'
import { createStore } from 'vuex';
import App from './App.vue'
import router from './router'


const store = createStore({
	state() {
		return {
			user: null,
			corp: null,
			list: [],
			org: null,
			orgUri: '',
		}
	}
});

const app = createApp(App).use(router);

const setHeight = () => {
	document.getElementById("app").style.minHeight = window.innerHeight + "px"
}

app.mount("#app");
app.use(store);
setHeight();
window.addEventListener("resize", setHeight);