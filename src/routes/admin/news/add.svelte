<script>
  import AdminNav from "../../../components/asides/AdminNav.svelte";
  import query from "../../../graphql/query";
  import { goto } from "@sapper/app";

  let article = { title: "", content: "", slug: "", status: "Draft" };
  let error;

  async function updateArticle() {
    try {
      article = (
        await query(
          fetch,
          `
            mutation createArticle($article: Article) {
              createArticle(article: $article) {
                _id slug title published content status
              }
            }
          `,
          { article }
        )
      ).createArticle;
      await goto(`admin/news/${article.slug}?success=1`);
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

    <button type="submit">Create Article</button>
  </form>

  {#if error}
    <div class="error-message">{error}</div>
  {/if}
</div>

<div class="aside">
  <AdminNav />
</div>
