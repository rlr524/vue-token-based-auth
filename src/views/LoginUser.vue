<template>
  <div>
    <form @submit.prevent="login">
      <label for="email"> Email: </label>
      <input
        v-model="email"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        aria-placeholder="Email"
        autocomplete="email"
      />
      <label for="password"> Password: </label>
      <input
        v-model="password"
        type="password"
        name="password"
        id="password"
        placeholder="Enter Your Password"
        aria-placeholder="Enter Your Password"
        autocomplete="current-password"
      />
      <button type="submit" name="button">Login</button>
    </form>
    <p class="error">{{ error }}</p>
    <router-link to="register">Don't have an account? Register.</router-link>
  </div>
</template>

<script>
export default {
  name: "LoginUser",
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "dashboard" });
        })
        .catch((err) => {
          this.error = err.response.data.error;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>