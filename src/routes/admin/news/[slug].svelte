<script context="module">
  import query from "../../../graphql/query";

  export async function preload({ params }) {
    return await query(
      this.fetch,
      `
      query news($slug: String) {
        article (slug: $slug) {_id slug title published content status}
      }
      `,
      { slug: params.slug }
    );
  }
</script>

<script>
  import AdminNav from "../../../components/asides/AdminNav.svelte";
  import { goto } from "@sapper/app";
  export let article;
  let error;
  let success = false;
  if (typeof window !== "undefined") {
    if (window.location.search) {
      success = !!window.location.search.match(/success=/);
      goto(`admin/news/${article.slug}`);
    }
  }

  async function updateArticle() {
    success = false;
    const id = article._id;
    delete article._id;
    delete article.published;

    try {
      article = (
        await query(
          fetch,
          `
        mutation updateArticle($id: ID, $article: Article) {
          updateArticle(id: $id, article: $article) {
            _id slug title published content status
          }
        }
      `,
          { id, article }
        )
      ).updateArticle;
      console.log(article);
      await goto(`admin/news/${article.slug}`);
      success = true;
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

  input,
  textarea,
  select {
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

  .success-message {
    background-color: #dfffdf;
    border: 1px solid #84ff84;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
  }
</style>

<div class="main">
  <form method="post" on:submit|preventDefault={updateArticle}>
    <label for="title">Title</label>
    <input type="text" id="title" name="title" bind:value={article.title} />

    <label for="slug">Slug</label>
    <input type="text" id="slug" name="slug" bind:value={article.slug} />

    <label for="title">Status</label>
    <select id="title" name="title" bind:value={article.status}>
      <option>Draft</option>
      <option>Published</option>
      <option>Archived</option>
    </select>

    <label for="content">Content</label>
    <textarea id="content" name="content" bind:value={article.content} />

    <button type="submit">Update Article</button>
  </form>

  {#if error}
    <div class="error-message">{error}</div>
  {:else if success}
    <div class="success-message">Article updated</div>
  {/if}
</div>

<div class="aside">
  <AdminNav />
</div>
