import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex/store";
import axios from "axios";

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	created() {
		const userString = localStorage.getItem("user");
		if (userString) {
			const userData = JSON.parse(userString);
			this.$store.commit("SET_USER_DATA", userData);
		}
		axios.interceptors.response.use(
			(response) => response,
			(error) => {
				if (error.response.status === 401) {
					this.$store.dispatch("logout");
				}
				// Remember that axios creates a promise and awaits the response of data (e.g. from an api); here we are
				// rejecting the promise, which, after we log the user out, also removes all tokens; this protects our app from a malicious
				// user making up a token to mimic our user without having actually logged in as our user with a password
				Promise.reject(error);
			}
		);
	},
	render: (h) => h(App),
}).$mount("#app");
