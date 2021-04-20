import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {
		register({ commit }, credentials) {
			return axios
				.post("http://localhost:3000/register", credentials)
				.then(({ data }) => {
					console.log("User data is: %o", data);
					// Note we can't use string interpolation ${} here, "data" refers to the name given to the object returned by axios
					// not to a variable that we named data, so in these cases, we need to use console.log's parameters in which we can pass
					// a message string and an object using c-style placeholders (we don't actually need the placeholder but imo it
					// makes the code more readable)
				});
		},
	},
	modules: {},
});
