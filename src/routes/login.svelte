<script>
  import { onMount } from "svelte";
  import query from "../graphql/query";
  import { user } from "../stores/user";

  // Todo: Change this back to an import when there are TS bindings for @sapper/app
  const goto = require("@sapper/app").goto;

  onMount(async () => {
    const response = await query(
      fetch,
      `mutation login($code: String) { login(code: $code) { token } }`,
      { code: new URLSearchParams(window.location.search).get("code") }
    );

    user.set(response.login);
    await goto("/");
  });
</script>

LOGIN
