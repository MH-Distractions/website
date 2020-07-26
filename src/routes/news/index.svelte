<script context="module">
  import query from "../../graphql/query";

  export async function preload() {
    return await query(
      this.fetch,
      `
      query news {
        latest: news(limit: 1) {
          title
          published
          content
        }
        list: news {
          _id
          title
          published
          slug
        }
      }
    `
    );
  }
</script>

<script>
  import Slug from "./[slug].svelte";

  export let latest;
  export let list;
</script>

<Slug article={latest[0]} {list} />
