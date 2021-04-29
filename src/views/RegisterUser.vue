<template>
  <div>
    <form @submit.prevent="register">
      <label for="name"> Name: </label>
      <input
        v-model="name"
        type="text"
        name=""
        id="user-name"
        placeholder="Name"
        aria-placeholder="Name"
        autocomplete="name"
        value
      />

      <label for="email"> Email </label>
      <input
        v-model="email"
        type="email"
        name=""
        id="user-email"
        placeholder="Email"
        aria-placeholder="Email"
        autocomplete="email"
        value
      />

      <label for="password"> Password: </label>
      <input
        v-model="password"
        type="password"
        name="password"
        id="user-password"
        placeholder="Choose a Strong Password"
        aria-placeholder="Choose a Strong Password"
        value
      />

      <button type="submit" name="button">Register</button>
    </form>
    <ul class="error-list">
      <li v-for="(error, index) in errors" :key="index" class="error">
        {{ error }}
      </li>
    </ul>
    <router-link to="login">Already have an account? Login.</router-link>
  </div>
</template>

<script>
export default {
  name: "RegisterUser",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errors: null,
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "dashboard" });
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
        });
    },
  },
};
// We use a method named register to dispatch an object to our store for an action named "register"
// Then, we redirect the user to the dashboard route
</script>

<style lang="scss" scoped>
</style>