<script>
  import { goto } from "@sapper/app";
  import query from "../graphql/query";
  import { user } from "../stores/user";

  let name;
  let email;
  let password;
  let confirm_password;

  let error;

  async function handleSubmit() {
    error = null;

    if (password != confirm_password) {
      error = "Passwords do not match";
      return;
    }

    try {
      let response = await query(
        fetch,
        `mutation register($email: String, $password: String, $name: String) { register(email: $email, password: $password, name: $name) { token } }`,
        { email, password, name }
      );

      user.set(response.register.token);
      await goto("/");
    } catch (e) {
      error = e.message;
    }
  }
</script>

<style>
  form {
    box-sizing: border-box;
  }
  label {
    display: block;
  }

  input {
    display: block;
    padding: 10px 15px;
    border: 1px solid #333;
    border-radius: 5px;
    width: 100%;
  }

  button {
    display: block;
    border-radius: 5px;
    border: 1px solid #333;
    margin: 10px auto;
    padding: 10px 15px;
  }

  .error-message {
    background-color: #ffdfdf;
    border: 1px solid #ff8484;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
  }
</style>

<div class="main">
  <form method="post" on:submit|preventDefault={handleSubmit}>

    <label for="name">Name</label>
    <input
      type="name"
      name="name"
      id="name"
      required
      bind:value={name}
      autocomplete="name" />

    <label for="email">E-mail Address</label>
    <input
      type="email"
      name="email"
      id="email"
      required
      bind:value={email}
      autocomplete="email" />

    <label for="password">Password</label>
    <input
      bind:value={password}
      type="password"
      name="password"
      id="password"
      required
      autocomplete="current-password" />

    <label for="confirm-password">Confirm Password</label>
    <input
      bind:value={confirm_password}
      type="password"
      name="confirm-password"
      id="confirm-password"
      required
      autocomplete="current-password" />

    <button type="submit">Register</button>
  </form>

  {#if error}
    <div class="error-message">{error}</div>
  {/if}
</div>
