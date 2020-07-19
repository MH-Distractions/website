<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<style>
  main {
    padding: 2em;
    box-sizing: border-box;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    flex-basis: auto;
    justify-content: space-around;
    max-width: calc(80ch + 340px);
    margin: 0 auto;
  }
</style>

<Nav {segment} />

<main>
  <div class="content">
    <slot />
  </div>
</main>
