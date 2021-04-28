import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
	},
	mutations: {
		SET_USER_DATA(state, userData) {
			state.user = userData;
			localStorage.setItem("user", JSON.stringify(userData));
			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${userData.token}`;
		},
		CLEAR_USER_DATA() {
			// state.user = null; Can use location.reload() instead which reloads the current page, in this case  it's /
			localStorage.removeItem("user");
			// axios.defaults.headers.common["Authorization"] = null; Can use location.reload() instead which reloads the current page, in this case it's /
			location.reload();
		},
	},
	actions: {
		register({ commit }, auths) {
			return axios
				.post("http://localhost:3000/register", auths)
				.then(({ data }) => {
					commit("SET_USER_DATA", data);
					// console.log("User data is: %o", data);
					// Note if we console.log, we can't use string interpolation ${} here, "data" refers to the name given to the object returned by axios
					// not to a variable that we named data, so in these cases, we need to use console.log's parameters in which we can pass
					// a message string and an object using c-style placeholders (we don't actually need the placeholder but imo it
					// makes the code more readable)
				});
		},
		login({ commit }, auths) {
			return axios
				.post("http://localhost:3000/login", auths)
				.then(({ data }) => {
					commit("SET_USER_DATA", data);
				});
		},
		logout({ commit }) {
			commit("CLEAR_USER_DATA");
		},
	},
	modules: {},
	getters: {
		loggedIn(state) {
			// The !! returns the truthiness or falsiness of the value as a bool, e.g. if state.user has data, so is true, it will return true...
			return !!state.user;
		},
	},
});
