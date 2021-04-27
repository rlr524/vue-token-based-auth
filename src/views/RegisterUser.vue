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
      <router-link to="login">Already have an account? Login.</router-link>
    </form>
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
        });
    },
  },
};
// We use a method named register to dispatch an object to our store for an action named "register"
// Then, we redirect the user to the dashboard route
</script>

<style lang="scss" scoped>
</style>