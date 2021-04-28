<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/dashboard" v-if="loggedIn">Dashboard</router-link>
    <router-link to="/login" class="button" v-if="!loggedIn">Login</router-link>
    <!-- We don't want to preserve page state on log out, so we don't use a router link here -->
    <button v-else type="button" class="logout-button" @click="logout">
      Logout
    </button>
  </div>
</template>

<script>
import { authComputed } from "@/vuex/helpers.js";
export default {
  name: "AppNav",
  computed: {
    ...authComputed,
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="scss" scoped>
#nav {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0.2em 1em;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
}

.nav-welcome {
  margin-left: auto;
  margin-right: 1rem;
  color: white;
}

a {
  font-weight: bold;
  color: #2c3e50;
  margin: auto 0.8em auto 0.4em;
  text-decoration: none;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
}

.router-link-exact-active {
  color: white;
  border-bottom: 2px solid #fff;
}

button,
.button {
  margin-left: auto;
  background: white;
  text-decoration: none;
  color: #2c3e50;

  &.router-link-active {
    color: #2c3e50;
  }
}

.logout-button {
  cursor: pointer;
}

.nav-welcome + button {
  margin-left: 0;
}
</style>