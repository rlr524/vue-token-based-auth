<template>
  <div>
    <form @submit.prevent="register">
      <label for="name"> Name: </label>
      <input
        v-model="name"
        type="text"
        name=""
        id="user-name"
        aria-label="name"
        autocomplete="name"
        value
      />

      <label for="email"> Email </label>
      <input
        v-model="email"
        type="email"
        name=""
        id="user-email"
        aria-label="email"
        autocomplete="email"
        value
      />

      <label for="password"> Password: </label>
      <input
        v-model="password"
        type="password"
        name="password"
        id="user-password"
        aria-label="password"
        autocomplete="current-password"
        value
      />

      <button type="submit" name="button">Register</button>
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